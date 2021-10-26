import './Css/index.css';
import profilePic from '../../assests/images/men-avatar.jpg';
import coverPic from '../../assests/images/bg.jpg';
import {ToggleColorMode,Post,Footer} from '../../components';
import { useEffect, useState } from 'react';
import pic1 from '../../assests/images/1.jpg';
import { auth,signOut,db,doc,getDoc } from "../../config/Firebase";
function Profile(){
    const [name,setName] = useState("Loading...");
    const [mode, setMode] = useState('light');
    const user = auth.currentUser;
    function UserSignOut(){
        signOut(auth).then(() => {
            localStorage.clear();
            }).catch((error) => {
            alert("Error in Sign out. "+error);
            });
    }
    useEffect(()=>{
        if (user !== null) {
            let userData;
            const uid = user.uid;
            const docRef = doc(db, "users", uid);
            getDoc(docRef).then((res)=>{
                if (res.exists()) {
                    userData = res.data();
                    setName(userData.firstName + " " + userData.lastName);
                } else {
                alert("No such document!");
                }
            }).catch((err)=>{
                alert("err ===>"+err);
            });
        }
    },[user])
    return (
        <div className={mode==='light'?"Light Profile":"Dark Profile"} >
            <ToggleColorMode auth={user} mode={mode} setMode={setMode} title="Chat" logout={UserSignOut} />
            <div className="header">
                <img src={coverPic} alt="Cover" className="bgPic" />
                <img src={profilePic} alt="Profile" className="profilePic" />
                <div className="name-div">
                    <h1 className="name">{name}</h1>
                    <h4 className="description">Web Developer</h4>
                    
                </div>
            </div>
            <Footer logout={()=>UserSignOut()} />
        </div>
    );
}
export default Profile;