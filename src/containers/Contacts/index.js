import Container from 'react-bootstrap/Container';
import {ToggleColorMode,Footer} from '../../components';
import {useParams} from 'react-router-dom';
import { useState,useEffect } from 'react';

import { db,query,collection,where,onSnapshot,auth,signOut} from "../../config/Firebase";
import './Css/index.css';

function Contacts(){
    const { uid } = useParams()
    let user = auth.currentUser;
    const [mode, setMode] = useState('light');
    const [allUsers, setAllUsers] = useState([]);
    const getAllUsers = () => {
        const docRef = query(collection(db, "users"), where("uid", '!=', uid));
        let arr = [];
        setAllUsers([]);
        onSnapshot(docRef,(querySnapshot)=>{
            querySnapshot.forEach((doc) => {
                arr.push(doc.data())
            });
        setAllUsers(arr)
        })
    }
    useEffect(()=>{
        getAllUsers();
    },[])
    function UserSignOut(){
        signOut(auth).then(() => {
            localStorage.clear();
            }).catch((error) => {
            alert("Error in Sign out. " + error);
            });
    }
    return (
    <Container fluid className={mode==='light'?"Light Contacts":"Dark Contacts"}>
        <ToggleColorMode auth={user} mode={mode} setMode={setMode} title="Contacts" logout={UserSignOut} />
        <div className="Contacts-content">
            <h1>Users List</h1>
            {allUsers.map((v,i)=>{
                return (
                <div key={i} className="user_card">
                    <div className="user_card_pic">
                        <img src="https://wl-brightside.cf.tsp.li/resize/728x/jpg/f6e/ef6/b5b68253409b796f61f6ecd1f1.jpg" alt={v.fullName} />
                    </div>
                    <div className="user_data">
                        <h6>{v.firstName + " " + v.lastName}</h6>
                    </div>
                </div>)
                })  
            }
        </div>
        <Footer logout={()=>UserSignOut()} />
    </Container>
    );
}
export default Contacts;