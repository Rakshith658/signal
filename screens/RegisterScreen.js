import React,{useState,useLayoutEffect} from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { Button,Input,Image} from 'react-native-elements'
import { KeyboardAvoidingView } from 'react-native'
import { auth } from '../firebase'

const RegisterScreen = ({navigation}) => {

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle:"back to login"
        })
    }, [navigation])

    const Register = () => {
        auth.createUserWithEmailAndPassword(email,password)
        .then(authUser=>{
            authUser.user.updateProfile({
                displayName:name,
                photoURL:imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            })
        })
        .catch(error => alert(error))    
    }

    return (
        <KeyboardAvoidingView button="padding" style={styles.container}>
            <StatusBar backgroundColor={"#2C6BED"} />
            {/* <Image source={{
                uri:"https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
            }}
            style={{width:200,height:200}}
            /> */}
            <Text style={{marginBottom:25,fontSize:25}}>Create Signal Account</Text>
            <View style={styles.inputcontainer}>
                <Input 
                    placeholder="Full Name" 
                    autoFocus={true} 
                    type="text" 
                    value={name} 
                    onChangeText={text => setname(text)}
                />
                <Input 
                    placeholder="Email" 
                    // autoFocus={true} 
                    type="email" 
                    value={email} 
                    onChangeText={text => setemail(text)}
                />
                <Input 
                    placeholder="Password"  
                    type="password" 
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(password)=>setpassword(password)}
                />
                <Input 
                    placeholder="ImageUrl"  
                    type="text" 
                    // secureTextEntry={true}
                    value={imageUrl}
                    onChangeText={(text)=>setImageUrl(text)}
                    onSubmitEditing={Register}
                />
                
            </View>
            {/* <Button containerStyle={styles.button} onPress={signIn} title="Login"/> */}
            <Button onPress={Register} containerStyle={styles.button} title="Register" type="outline"/>
            <View style={{height:100}}/>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        // alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        padding:10,
    },
    inputcontainer:{
        width:300
    },
    button:{
        width:200,
        marginTop:10,
    },
})
