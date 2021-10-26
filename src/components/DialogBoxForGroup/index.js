import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useParams } from 'react-router-dom';
import DialogTitle from '@mui/material/DialogTitle';
import { db, doc,updateDoc, collection, setDoc } from '../../config/Firebase'


export default function FormDialogForGroup({users,title}) {
  const [open, setOpen] = React.useState(false);
  // const [allUsers,setAllUsers] = React.useState(users);
  const [selected, setSelected] = React.useState([]);
  const [groupName, setGroupName] = React.useState("");
  const [groupDescription, setGroupDescription] = React.useState("");
  const { uid } = useParams()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    users.push(...selected);
    setSelected([]);
    setOpen(false);
  };
  const CreateGroup = async () => {
    if(groupName !== null && groupName !== "" && groupDescription !== null && groupDescription !== ""){
      const newGroupRef = doc(collection(db, "groups"));
      let usersUid = [];
      selected.map((v,i)=>{
        usersUid.push(v.uid);
        return null;
      })
      let obj = {}
      obj[newGroupRef.id] = 0;
      let arr = [uid,...usersUid];
      arr.map(async(v,i)=>{
        const userRef = doc(db, "users",v);
        await updateDoc(userRef, obj);
      })
      await setDoc(newGroupRef, {
          groupId:newGroupRef.id,
          groupName,
          groupDescription,
          members:[uid,...usersUid],
          lastMessage:""
      });
      handleClose();
    }
    else{
      alert("Invalid Input!")
    }
  }
  const Select = (i) => {
    let user = users.splice(i,1);
    setSelected([...selected,...user])
  }
  const Remove = (i) => {
    let arr = [...selected];
    let user = arr.splice(i,1);
    users.push(...user);
    setSelected(arr);
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} className="dialog-btn">
          {title}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="group-name"
            label="Group Name:"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setGroupName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="group-desc"
            label="Group Description:"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=>setGroupDescription(e.target.value)}
          />
          <div className="selected-users">
            <h4>Selected Users</h4>
            {
            selected.map((v,i)=>{
              return (
                <div key={i} className="user-div" >
                  {v.firstName}
                  <button onClick={()=>Remove(i)} className="remove">remove</button>
                </div>
              );
            })
            }
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
          <Button onClick={CreateGroup}>Create Group</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
