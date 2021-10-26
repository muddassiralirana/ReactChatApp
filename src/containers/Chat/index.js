import Container from 'react-bootstrap/Container';
import { ToggleColorMode,VerticalTabs } from '../../components';
import { useState,useEffect,useMemo, useCallback} from 'react';
import {useParams} from 'react-router-dom';
import './Css/index.css';
import img from '../../assests/images/1.jpg';
import MenuAppBar from '../../components/AppBar';
import FormDialogForGroup from '../../components/DialogBoxForGroup'
import FormDialogForChat from '../../components/DialogBoxForChat'
import { BiSearchAlt, BiPhoneCall } from 'react-icons/bi';
import { RiRefreshLine, RiContactsBookLine, RiArchiveDrawerLine } from 'react-icons/ri';
import { FiUsers, FiSend } from 'react-icons/fi';
import {TiUserAdd} from 'react-icons/ti'
import { MdVideoCall } from 'react-icons/md';
import { FaRegSmile } from 'react-icons/fa';
import { db, doc,getDoc,signOut,auth, getDocs, collection, query, where,increment, onSnapshot, addDoc, orderBy,updateDoc } from '../../config/Firebase'

function Chat(){
    const [mode, setMode] = useState('light');
    const { uid } = useParams()
    // const [get, setGet] = useState(false);
    const [users, setUsers] = useState([]);
    const [CurrentUser, setCurrentUser] = useState({});
    const [allChats, setAllChats] = useState([]);
    const [allGroups, setAllGroups] = useState([]);
    const [showGroups,setShowGroups] = useState(false);
    const [currentChat, setCurrentChat] = useState({});
    const [message, setMessage] = useState("")
    const [allMessages, setAllMessage] = useState([])
    const [loading,setLoading] = useState(true);
    const user = auth.currentUser;
    const getCurrentUser = useCallback( async () => {
        const docRef = query(collection(db, "users"), where("uid", '==', uid));
        onSnapshot(docRef,(querySnapshot)=>{
            querySnapshot.forEach((doc) => {
                setCurrentUser(doc.data())
            });
        })
    })
    const getAllChats = useCallback( async () => {
        const q = query(collection(db, "chats"), where("members", "array-contains", uid));
        onSnapshot(q,(querySnapshot)=>{
            const chats = [];
            querySnapshot.forEach((doc) => {
                chats.push(doc.data())
        })
        setAllChats(chats);
    });
    })
    const getAllUsers = useCallback( async () => {
        const docRef = query(collection(db, "users"), where("uid", '!=', uid));
        onSnapshot(docRef,(querySnapshot)=>{
            let arr = [];
            querySnapshot.forEach((doc) => {
                arr.push(doc.data())
            });
            setUsers(arr)
        })
    })
    const getAllGroups = useCallback(async () => {
        const q = query(collection(db, "groups"), where("members", "array-contains", uid));
        onSnapshot(q, (querySnapshot) => {
            const groups = [];
            querySnapshot.forEach((doc) => {
                groups.push(doc.data())
            })
        setAllGroups([...groups]);
        })
    })
    const getAllMessages = useCallback( async () => {
            if(currentChat.chat_id){
            let chat_id = currentChat.chat_id;
            const q = query(collection(db, "messages"), where("chat_id", "==", chat_id), orderBy('timestamp', 'desc')
            );
            onSnapshot(q, (querySnapshot) => {
                const arr = [];
                querySnapshot.forEach((doc) => {
                    arr.push(doc.data());
                });
                setAllMessage([...arr])
            });
        }
        else if(currentChat.groupId){
            const q = query(collection(db, "messages"), where("groupId", "==", currentChat.groupId), orderBy('timestamp', 'desc')
            );
            onSnapshot(q, (querySnapshot) => {
                const arr = [];
                querySnapshot.forEach((doc) => {
                    arr.push(doc.data());
                });
                setAllMessage([...arr])
            });
        }
    })
    useEffect(()=>{
        getCurrentUser(); 
        getAllUsers();
        getAllChats();
        getAllGroups();
        setLoading(false);
    },[])
    useEffect(() => {
        setAllMessage([])
        getAllMessages()
    }, [currentChat])
    const ChangeChat = (chatObject) => {
        setCurrentChat(chatObject);
        setCounter();
    }
    const setCounter = async () => {
        if(currentChat.chat_id){
            let chat_id = currentChat.chat_id;
            let obj = {};
            const chatInfoRef = doc(db, "users", uid);
            obj[chat_id] = 0;
            await updateDoc(chatInfoRef, obj);
        }
        else if(currentChat.groupId){
            const chatInfoRef = doc(db, "users", uid );
            let obj = {};
            obj[currentChat.groupId] = 0;
            await updateDoc(chatInfoRef, obj);
        }
        getCurrentUser();
    }
    const send_message = async (event) => {
            if(currentChat.chat_id){
                let chat_id = currentChat.chat_id;
                let userId;
                currentChat.members.map((v,i)=>{
                    if(v !== uid){
                        userId = v;
                        return null;
                    }
                })
                const chatInfoRef = doc(db, "users", userId);
                let collectionRef = collection(db, 'messages')
                await addDoc(collectionRef, { message, uid, chat_id:currentChat.chat_id, timestamp: new Date() })
                    .then(() => {
                        setMessage("")
                    })
                    let obj = {};
                    obj[chat_id] = increment(1);
                await updateDoc(chatInfoRef, obj);
                const chatRef = doc(db, "chats", chat_id);
                await updateDoc(chatRef,{lastMessage:message});
                // await setDoc(chatInfoRef, {
                //     chat_id: chat_id,
                //     counter: 1,
                //     lastMessage: message
                //     });                      
            }
            else if(currentChat.groupId){
                let collectionRef = collection(db, 'messages')
                let name = CurrentUser.firstName + " " + CurrentUser.lastName;
                await addDoc(collectionRef, { message, uid,name:name, groupId:currentChat.groupId, timestamp: new Date() })
                    .then(() => {
                        setMessage("")
                    })
                currentChat.members.map(async (v,i)=>{
                    if(v !== uid){
                        const chatInfoRef = doc(db, "users", v );
                        let obj = {};
                        obj[currentChat.groupId] = increment(1);
                        await updateDoc(chatInfoRef, obj);
                    }
                })
                const groupRef = doc(db, "groups", currentChat.groupId );
                await updateDoc(groupRef, {
                    lastMessage: message
                });
            }  
    }
    const groupDialog = useMemo(()=>{
        return (
            <FormDialogForGroup title="Add Group" users={users} />
        )
    },[users])
    function UserSignOut(){
        signOut(auth).then(() => {
            localStorage.clear();
            }).catch((error) => {
            alert("Error in Sign out. " + error);
            });
    }
    return (
    <Container fluid className={mode==='light'?"Light Chat":"Dark Chat"}>
        <ToggleColorMode auth={user} mode={mode} setMode={setMode} title="Chat" logout={UserSignOut} />
        <div className="Chat-Main-Div">
            <div className={mode === 'light'?"Chat-Side-Div":"Chat-Side-Div Chat-Side-Div-Dark"} >
            <div className="search_box">
                <div className="search_bar">
                    <BiSearchAlt color="#fff" size={24} />
                    <input type="text" placeholder="search" />
                </div>
            </div>
            <div className="icons">
                <span className="icon-span" onClick={()=>setShowGroups(false)} >
                    <RiRefreshLine color="#fff" size={24} />
                </span>
                <span className="icon-span" onClick={()=>setShowGroups(true)} >
                    <FiUsers color="#fff" size={24} />
                </span>
                <span className="icon-span">
                    <RiContactsBookLine color="#fff" size={24} />
                </span>
                <span className="icon-span">
                    <RiArchiveDrawerLine color="#fff" size={24} />
                </span>
            </div>
            <div className="users_list">
                {   loading?"Loading":
                    (showGroups?
                    (   
                        <div>
                            {groupDialog}
                            {allGroups.map((v, i) => {
                            return (
                                <div onClick={() => ChangeChat(allGroups[i])} key={i} className="user_card">
                                    <div className="user_card_pic">
                                        <img src="https://wl-brightside.cf.tsp.li/resize/728x/jpg/f6e/ef6/b5b68253409b796f61f6ecd1f1.jpg" alt="" />
                                    </div>
                                    <div className="user_data">
                                        <h6>{v.groupName}</h6>
                                        <span>
                                        {v.lastMessage}
                                        </span>
                                    </div>
                                    <div className="my_badge">
                                        <span> {CurrentUser[v.groupId]}</span>
                                    </div>
                                </div>
                                )
                            })
                            }
                            </div>
                    )
                    :
                    (
                    <div>
                        <FormDialogForChat title="Add Chat" users={users} />
                        {allChats.map((v, i) => {
                        return (<div onClick={() =>ChangeChat(allChats[i])} key={i} className="user_card">
                                <div className="user_card_pic">
                                    <img src="https://wl-brightside.cf.tsp.li/resize/728x/jpg/f6e/ef6/b5b68253409b796f61f6ecd1f1.jpg" alt="" />
                                </div>
                                <div className="user_data">
                                    {v.membersData.map((value,i)=>{
                                        let uname = CurrentUser.firstName + " " + CurrentUser.lastName;
                                        if(value !== uname ){
                                            return (<h6>{value}</h6>)
                                        }
                                    })}
                                    <span>
                                        {v.lastMessage}
                                    </span>
                                </div>
                                <div className="my_badge">
                                    <span>
                                        {CurrentUser[v.chat_id]}
                                    </span>
                            </div></div>)
                    })}
                    </div>)
                )
                }
            </div>
            </div>
            <div className="Chat-Box-Div">
            {Object.keys(currentChat).length ?
                <div>
                    <div className="chat-header">
                        <div className="online_dot"></div>
                        <div className="username">
                            {currentChat.membersData?currentChat.membersData.map((v,i)=>{
                                let uname = CurrentUser.firstName + " " + CurrentUser.lastName;
                                            if(v !== uname ){
                                                return (<h4>{v}</h4>)
                                            }
                                        })
                                        :<h4>{currentChat.groupName}</h4>
                                    }
                        </div>
                        <div className="chat_icons">
                            <div className="icon_box">
                                <TiUserAdd size={24} color="#fff" />
                            </div>
                            <div className="icon_box">
                                <BiPhoneCall size={24} color="#fff" />
                            </div>
                            <div className="icon_box">
                                <MdVideoCall size={24} color="#fff" />
                            </div>
                        </div>
                    </div>
                    <div className={mode === 'light'?"Chat-Div":"Chat-Div Chat-Div-Dark"}>
                    {allMessages.map((v, i) => {
                        return (
                            v.uid === uid ?
                                <div className="message_left message_right" key={i}>
                                    <div className="user_message">
                                        {v.message}
                                        <div className="message_arrow_right"></div>
                                    </div>
                                    <div className="message_right_image">
                                        <img src="https://wl-brightside.cf.tsp.li/resize/728x/jpg/f6e/ef6/b5b68253409b796f61f6ecd1f1.jpg" alt="" />
                                    </div>
                                </div>
                                :
                                <div className="message_left" key={i}>
                                    <div>
                                        <img src="https://wl-brightside.cf.tsp.li/resize/728x/jpg/f6e/ef6/b5b68253409b796f61f6ecd1f1.jpg" alt="" />
                                    </div>
                                    <div className="user_message">
                                        <p className="sender-name">
                                            {v.name}
                                        </p>
                                        <p className="message-text">
                                            {v.message}
                                        </p>
                                        <div className="message_arrow"></div>
                                    </div>
                                </div>
                        )
                    }).reverse()}
                    </div>
                    <div className={mode === 'light'?"Input-Div":"Input-Div Input-Div-Dark"}>
                        <input type="text" className="input" value={message} onChange={(e)=>setMessage(e.target.value)} />
                        <button className="Send" onClick={()=>send_message()}>Send</button>
                    </div>
                </div>
            :null}
            </div>
        </div>
    </Container>
    );
}
export default Chat;