import React,{useLayoutEffect,useState,useRef}from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View,SafeAreaView,ScrollView,FlatList } from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign,FontAwesome,Ionicons} from '@expo/vector-icons'
import { StatusBar } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
import { TextInput } from 'react-native'
import { Keyboard } from 'react-native'
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import * as firebase from 'firebase';
import { db,auth} from './../firebase'


const ChatScreen = ({navigation , route}) => {


    const [input, setinput] = useState('')
    const [messages, setmessages] = useState([])


    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Chat",
            headerStyle:{backgroundColor:"#2C6BED"},
            headerTitleStyle:{color:'white'},
            headerTintColor:"white",
            headerTitleAlign:'left',
            headerBackTitleVisiable:false,
            headerTitle:()=>(
                <View style={{
                    flexDirection:"row",
                    alignItems:'center'
                }}>
                    <Avatar rounded source={{uri :messages[0]?.data.photoURL,}}/>
                    <Text 
                    style={{color:"#fff",marginLeft:10,fontWeight:"bold"}}
                    >{route.params.chatName}</Text>
                </View>
            ),
            headerLeft:()=>(
                <TouchableOpacity 
                    style={{marginLeft:10}}
                    onPress={navigation.goBack}
                >
                    <AntDesign name="arrowleft" size={24} color="white"/>
                </TouchableOpacity>
            ),
            headerRight :()=>(
                <View style={{flexDirection:"row",justifyContent:"space-between",marginRight:20,width:80}}>
                    <TouchableOpacity>
                        <Ionicons name="videocam-outline" size={26} color="#fff"/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call-outline" size={24} color="#fff"/>
                    </TouchableOpacity>
                </View>
            ),
        })   
    }, [navigation,messages])

    const sendMessage = () => {
        Keyboard.dismiss()

        db.collection('chats')
            .doc(route.params.id)
            .collection('messages')
            .add({
                timestamp : firebase.default.firestore.FieldValue.serverTimestamp(),
                message:input,
                displayName:auth.currentUser.displayName,
                email:auth.currentUser.email,
                photoURL:auth.currentUser.photoURL,
            })

        setinput('')
    }

    const scrollViewRef = useRef();

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats')
            .doc(route.params.id)
            .collection('messages')
            .orderBy('timestamp')
            .onSnapshot((snapshot) => 
                setmessages(
                    snapshot.docs.map((doc) => ({
                        id : doc.id,
                        data : doc.data(),
                    }))
                )
            )
        return unsubscribe;
    }, [route])
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={"#2C6BED"}  />
            <KeyboardAvoidingView
                // keyboardVerticalOffset={90}
                style={styles.containe}
                // behavior={Platform.OS === 'ios' ? 'padding':"height"}
            >
                <>
                    <ScrollView 
                        contentContainerStyle={{paddingTop:15,}}
                         ref={scrollViewRef}
                        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                    >
                        {messages.map(({id,data})=>(
                            data.email === auth.currentUser.email ?(
                                <View key={id} style={styles.reciver}>
                                    <Avatar
                                        source={{uri:data.photoURL}}
                                        rounded
                                        size={30}
                                        containerStyle={{
                                            position:'absolute',
                                            bottom:-15,
                                            right:-5
                                        }}
                                    />
                                    <Text style={styles.recivertext}>{data.message}</Text>
                                </View>
                            ):(
                                <View key={id} style={styles.sender}>
                                    <Avatar
                                        source={{uri:data.photoURL}}
                                        rounded
                                        size={30}
                                        containerStyle={{
                                            position:'absolute',
                                            bottom:-15,
                                            left:-5
                                        }} 
                                    />
                                    <Text style={styles.sendtext}>{data.message}</Text>
                                    <Text style={styles.sendName}>{data.displayName}</Text>
                                </View>
                            )
                        ))}
                    </ScrollView>
                    {/* <FlatList
                        data={messages}
                        renderItem={({item})=>(
                            item.email === auth.currentUser.email ?(
                                <View key={id} style={styles.reciver}>
                                    <Avatar />
                                    <Text style={styles.recivertext}>{item.messages}</Text>
                                </View>
                            ):(
                                <View style={styles.sender}>
                                    <Avatar />
                                    <Text style={styles.sendtext}>{item.messages}</Text>
                                </View>
                            )
                        )} 
                    /> */}
                    <View style={styles.footer}>
                        <TextInput 
                            value={input} 
                            placeholder="Type message......" 
                            style={styles.textinput}
                            onChangeText={(text)=>setinput(text)}
                        />
                        <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                            <Ionicons name="send" size={24} color="#2B68E6"/>
                        </TouchableOpacity>
                    </View>
                </>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"
    },
    containe:{
        flex:1,
    },
    footer:{
        flexDirection:'row',
        alignItems:"center",
        width:'100%',
        padding:20,
        marginBottom:0,
    },
    textinput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        // borderColor:"transparent",
        backgroundColor:"#ECECEC",
        // borderWidth:1,
        padding:10,
        color:"grey",
        borderRadius:30
    },
    recivetext:{
        color:'black',
        fontWeight:"600",
        marginRight:10
    },
    sendtext:{
        color:'white',
        fontWeight:"600",
        marginLeft:10,
        marginBottom:15
    },
    reciver:{
        padding:15,
        backgroundColor:"#ECECEC",
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative",
    },
    sender:{
        padding:15,
        backgroundColor:"#2C6BED",
        alignSelf:"flex-start",
        borderRadius:20,
        marginLeft:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative",
    },
    sendName:{
        left:10,
        paddingRight:10,
        fontSize:10,
        color:"white",
    },
})
