import React,{useState,useEffect,useLayoutEffect} from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import { Button,Input,Image} from 'react-native-elements'
import { KeyboardAvoidingView } from 'react-native'
import { auth } from '../firebase'

const LoginScreen = ({navigation}) => {

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [isloding, setisloding] = useState(true)
    useEffect(() => {
        const unsubscribe =auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                navigation.replace("Home")
            }else{
                setisloding(false)
            }
        })

        return unsubscribe;
    }, [])

    let titles;
    if(isloding){
        titles="Signal"
    }else{
        titles="Login"
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            title:titles
        })
    }, [navigation])

    const signIn = () => {
        auth.signInWithEmailAndPassword(email,password)
        .catch((error)=>{alert(error)})
    }
    if(isloding){
        return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            {/* <ActivityIndicator size='large'/> */}
            <ActivityIndicator size='large'  color="#2C6BED"/>
            <Text style={{marginTop:20}}>Loading....</Text>
        </View>
        );
    }
    return (
        <KeyboardAvoidingView button="padding" style={styles.container}>
            <StatusBar backgroundColor={"#2C6BED"} />
            <Image source={{
                uri:"https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
            }}
            style={{width:200,height:200}}
            />
            <View style={styles.inputcontainer}>
                <Input 
                    placeholder="Email" 
                    autoFocus={true} 
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
                    onSubmitEditing={signIn}
                />
            </View>
            <Button containerStyle={styles.button} onPress={signIn} title="Login"/>
            <Button onPress={()=>navigation.navigate("Register")} containerStyle={styles.button} title="Register" type="outline"/>
            <View style={{height:100}}/>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

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
