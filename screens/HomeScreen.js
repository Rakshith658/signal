import React,{useLayoutEffect,useState,useEffect} from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native'
import { StyleSheet, Text, View,ScrollView,TouchableOpacity } from 'react-native'
import Customlistitem from '../Components/Customlistitem'
import { auth ,db} from './../firebase'
import { ListItem,Avatar } from 'react-native-elements'
import { AntDesign,SimpleLineIcons} from '@expo/vector-icons'
// import { StatusBar } from 'expo-status-bar'

const HomeScreen = ({navigation}) => {

    const [chats, setchats] = useState([])

    const sigoutUser = () => {
        auth.signOut().then(()=>{
            navigation.replace("Login")
        })
    }

    useEffect(() => {
        const unsubscribe = db.collection("chats").onSnapshot((snapshot)=>
            setchats(
                snapshot.docs.map(doc=>({
                    id:doc.id,
                    data:doc.data()
                }))
            )
        )
        return unsubscribe;
    }, [])


    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Signal",
            headerStyle:{backgroundColor:"#2C6BED"},
            headerTitleStyle:{color:'#fff'},
            headerTintColor:"#fff",
            headerTitleAlign:'center',
            headerLeft:()=>(
            <View style={{marginLeft:20}}>
                <TouchableOpacity activeOpacity={0.5} onPress={sigoutUser}>
                    <Avatar 
                        rounded 
                        source={{ uri : auth?.currentUser?.photoURL}}
                    />
                </TouchableOpacity>
            </View>
            ),
            headerRight:()=>(
                <View style={{marginRight:20,flexDirection:'row',justifyContent:'space-between',width:80}}>
                    <TouchableOpacity>
                        <AntDesign name="camerao" size={25} color={'#fff'}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate("AddChat")}>
                        <SimpleLineIcons name="pencil" size={25} color={'#fff'}/>
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    const enterChat = ( id, chatName) => {
        navigation.navigate('Chat',{
            id,
            chatName,
        })
    }
    return (
        <SafeAreaView>
            <StatusBar backgroundColor={"#2C6BED"}  />
            <ScrollView style={styles.container}>
                {chats.map(({id ,data:{chatName}})=>(
                    <Customlistitem key={id} id={id} chatName={chatName} enterChat={enterChat}/>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        height:'100%'
    }
})
