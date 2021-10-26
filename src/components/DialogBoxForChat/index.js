import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useParams } from 'react-router-dom';
import DialogTitle from '@mui/material/DialogTitle';
import { db, auth,doc,updateDoc, setDoc } from '../../config/Firebase'


export default function FormDialogForChat({users,title}) {
  const CurrentUser = auth.currentUser;
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const { uid } = useParams();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSelected(null);
    setOpen(false);
  };
  const CreateChat = async () => {
    let chat_id = "";

    if (uid < selected.uid) {
        chat_id = uid + selected.uid
    } else {
        chat_id = selected.uid + uid
    }
    let obj = {}
    obj[chat_id] = 0;
    [CurrentUser,selected].map(async(v,i)=>{
      const userRef = doc(db, "users",v.uid);
      await updateDoc(userRef, obj);
    })
    const newChatRef = doc(db, "chats",chat_id);
    await setDoc(newChatRef, {
        chat_id:chat_id,
        members:[CurrentUser.uid,selected.uid],
        membersData:[CurrentUser.displayName,selected.firstName + " " + selected.lastName],
        lastMessage:""
    });
    handleClose();
  }
  const Select = (i) => {
    setSelected(users[i])
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} className="dialog-btn">
          {title}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Chat</DialogTitle>
        <DialogContent>
          <div className="selected-users">
            <h4>Selected User</h4>
            <div className="user-chat-div" >
                {selected?.firstName}
            </div>
          </div>
          <div className="User-List">
            <h4>Users List</h4>
            {
              users.map((v,i)=>{
                return (
                  <div className="user-div" onClick={()=>Select(i)} key={i}>
                    {v.firstName + " " + v.lastName}
                  </div>
                );
              })
            }
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={CreateChat}>Create Chat</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}