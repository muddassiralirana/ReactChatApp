import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './Css/index.css';
import lock from '../../assests/images/1.jpg';
import {Button} from '../index';
let chats = [
    {sender:"abc1",reciever:"xyz2",msg:"Hello"},
    {sender:"xyz2",reciever:"abc1",msg:"Hi "},
    {sender:"abc1",reciever:"xyz2",msg:"Wellcome"},
    {sender:"abc1",reciever:"xyz2",msg:"Pakistan"},
    {sender:"xyz2",reciever:"abc1",msg:"World"},
    {sender:"abc1",reciever:"xyz2",msg:"Khizar"},
    {sender:"abc1",reciever:"xyz2",msg:" to"},
    {sender:"abc1",reciever:"xyz2",msg:"Sindh"},
    {sender:"xyz2",reciever:"abc1",msg:"Hello Quetta"},
    {sender:"xyz2",reciever:"abc1",msg:"Hi London"},
    {sender:"abc2",reciever:"xyz2",msg:"Wellcome to Lahore"},
    {sender:"abc1",reciever:"xyz2",msg:"Pakistan "},
    {sender:"xyz2",reciever:"abc1",msg:"Hello World"},
    {sender:"xyz1",reciever:"xyz2",msg:"Hi Khizar"},
    {sender:"abc3",reciever:"xyz1",msg:"Wellcome to"},
    {sender:"abc3",reciever:"xyz2",msg:"Pakistan"}
];
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({className}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={className}
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
      <Tabs
        className="tabs"
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="New Item One" {...a11yProps(0)} className="tab" />
        <Tab label="Item Two" {...a11yProps(1)} className="tab" />
        <Tab label="Item Three" {...a11yProps(2)} className="tab" />
        <Tab label="Item Four" {...a11yProps(3)} className="tab" />
        <Tab label="Item Five" {...a11yProps(4)} className="tab" />
        <Tab label="Item Six" {...a11yProps(5)} className="tab" />
        <Tab label="Item Seven" {...a11yProps(6)} className="tab" />
        <Tab label="Item Eight" {...a11yProps(7)} className="tab" />
        <Tab label="Item Nine" {...a11yProps(8)} className="tab" />
        <Tab label="Item Ten" {...a11yProps(9)} className="tab" />
        <Tab label="Item Eleven" {...a11yProps(10)} className="tab" />
      </Tabs>
      <TabPanel value={value} index={0} className="tab-panel">
        <span className="heading">Item One</span>
        <span className="msgs">
        {chats.map((value,index)=>(
                value.sender==="abc1"&&value.reciever==="xyz2"?
                (<span className='current-user-msg' key={index}>
                    <img src={lock} alt="img" className="msg-icon" align="right" />
                    <span className="current-sub-div">
                        {value.msg}
                    </span>
                </span>)        
                :
                (value.sender==="xyz2"&&value.reciever==="abc1"?
                (<span className='other-user-msg' key={index}>
                    <img src={lock} alt="img" className="msg-icon" align="left" />
                    <span className="other-sub-div">
                        {value.msg}
                    </span>
                </span>):null)
        ))
        }
        </span>
        <span className="input-div">
            <input type="text" className="input-field" />
            <Button className="send-btn">Send</Button>
        </span>
      </TabPanel>
      <TabPanel value={value} index={1} className="tab-panel">
      <span className="heading">Item One</span>
        <span className="msgs">
        {chats.map((value,index)=>(
                value.sender==="abc1"&&value.reciever==="xyz2"?
                (<span className='current-user-msg' key={index}>
                    <img src={lock} alt="img" className="msg-icon" align="right" />
                    <span className="current-sub-div">
                        {value.msg}
                    </span>
                </span>)        
                :
                (value.sender==="xyz2"&&value.reciever==="abc1"?
                (<span className='other-user-msg' key={index}>
                    <img src={lock} alt="img" className="msg-icon" align="left" />
                    <span className="other-sub-div">
                        {value.msg}
                    </span>
                </span>):null)
        ))
        }
        </span>
        <span className="input-div">
            <input type="text" className="input-field" />
            <Button className="send-btn">Send</Button>
        </span>
      </TabPanel>
      <TabPanel value={value} index={2} className="tab-panel">
      <span className="heading">Item One</span>
        <span className="msgs">
        {chats.map((value,index)=>(
                value.sender==="abc1"&&value.reciever==="xyz2"?
                (<span className='current-user-msg' key={index}>
                    <img src={lock} alt="img" className="msg-icon" align="right" />
                    <span className="current-sub-div">
                        {value.msg}
                    </span>
                </span>)        
                :
                (value.sender==="xyz2"&&value.reciever==="abc1"?
                (<span className='other-user-msg' key={index}>
                    <img src={lock} alt="img" className="msg-icon" align="left" />
                    <span className="other-sub-div">
                        {value.msg}
                    </span>
                </span>):null)
        ))
        }
        </span>
        <span className="input-div">
            <input type="text" className="input-field" />
            <Button className="send-btn">Send</Button>
        </span>
      </TabPanel>
      <TabPanel value={value} index={3} className="tab-panel">
      <span className="heading">Item One</span>
        <span className="msgs">
        {chats.map((value,index)=>(
                value.sender==="abc1"&&value.reciever==="xyz2"?
                (<span className='current-user-msg' key={index}>
                    <img src={lock} alt="img" className="msg-icon" align="right" />
                    <span className="current-sub-div">
                        {value.msg}
                    </span>
                </span>)        
                :
                (value.sender==="xyz2"&&value.reciever==="abc1"?
                (<span className='other-user-msg' key={index}>
                    <img src={lock} alt="img" className="msg-icon" align="left" />
                    <span className="other-sub-div">
                        {value.msg}
                    </span>
                </span>):null)
        ))
        }
        </span>
        <span className="input-div">
            <input type="text" className="input-field" />
            <Button className="send-btn">Send</Button>
        </span>
      </TabPanel>
      <TabPanel value={value} index={4} className="tab-panel">
      <div className="heading">Item One</div>
      <div className="msgs">
        {chats.map((value,index)=>(
                value.sender==="abc1"&&value.reciever==="xyz2"?
                (<div className='current-user-msg' key={index}>
                    <img src={lock} alt className="msg-icon" align="right" />
                    <div className="current-sub-div">
                        {value.msg}
                    </div>
                </div>)        
                :
                (value.sender==="xyz2"&&value.reciever==="abc1"?
                (<div className='other-user-msg' key={index}>
                    <img src={lock} alt className="msg-icon" align="left" />
                    <div className="other-sub-div">
                        {value.msg}
                    </div>
                </div>):null)
        ))
        }
        </div>
        <div className="input-div">
            <input type="text" className="input-field" />
            <Button className="send-btn">Send</Button>
        </div>
      </TabPanel>
      <TabPanel value={value} index={5} className="tab-panel">
      <div className="heading">Item One</div>
      <div className="msgs">
        {chats.map((value,index)=>(
                value.sender==="abc1"&&value.reciever==="xyz2"?
                (<div className='current-user-msg' key={index}>
                    <img src={lock} alt className="msg-icon" align="right" />
                    <div className="current-sub-div">
                        {value.msg}
                    </div>
                </div>)        
                :
                (value.sender==="xyz2"&&value.reciever==="abc1"?
                (<div className='other-user-msg' key={index}>
                    <img src={lock} alt className="msg-icon" align="left" />
                    <div className="other-sub-div">
                        {value.msg}
                    </div>
                </div>):null)
        ))
        }
        </div>
        <div className="input-div">
            <input type="text" className="input-field" />
            <Button className="send-btn">Send</Button>
        </div>
      </TabPanel>
      <TabPanel value={value} index={6} className="tab-panel">
      <div className="heading">Item One</div>
      <div className="msgs">
        {chats.map((value,index)=>(
                value.sender==="abc1"&&value.reciever==="xyz2"?
                (<div className='current-user-msg' key={index}>
                    <img src={lock} alt className="msg-icon" align="right" />
                    <div className="current-sub-div">
                        {value.msg}
                    </div>
                </div>)        
                :
                (value.sender==="xyz2"&&value.reciever==="abc1"?
                (<div className='other-user-msg' key={index}>
                    <img src={lock} alt className="msg-icon" align="left" />
                    <div className="other-sub-div">
                        {value.msg}
                    </div>
                </div>):null)
        ))
        }
        </div>
        <div className="input-div">
            <input type="text" className="input-field" />
            <Button className="send-btn">Send</Button>
        </div>
      </TabPanel>
      <TabPanel value={value} index={7} className="tab-panel">
      <div className="heading">Item One</div>
      <div className="msgs">
        {chats.map((value,index)=>(
                value.sender==="abc1"&&value.reciever==="xyz2"?
                (<div className='current-user-msg' key={index}>
                    <img src={lock} alt className="msg-icon" align="right" />
                    <div className="current-sub-div">
                        {value.msg}
                    </div>
                </div>)        
                :
                (value.sender==="xyz2"&&value.reciever==="abc1"?
                (<div className='other-user-msg' key={index}>
                    <img src={lock} alt className="msg-icon" align="left" />
                    <div className="other-sub-div">
                        {value.msg}
                    </div>
                </div>):null)
        ))
        }
        </div>
        <div className="input-div">
            <input type="text" className="input-field" />
            <Button className="send-btn">Send</Button>
        </div>
      </TabPanel>
      <TabPanel value={value} index={8} className="tab-panel">
      <div className="heading">Item One</div>
      <div className="msgs">
        {chats.map((value,index)=>(
                value.sender==="abc1"&&value.reciever==="xyz2"?
                (<div className='current-user-msg' key={index}>
                    <img src={lock} alt className="msg-icon" align="right" />
                    <div className="current-sub-div">
                        {value.msg}
                    </div>
                </div>)        
                :
                (value.sender==="xyz2"&&value.reciever==="abc1"?
                (<div className='other-user-msg' key={index}>
                    <img src={lock} alt className="msg-icon" align="left" />
                    <div className="other-sub-div">
                        {value.msg}
                    </div>
                </div>):null)
        ))
        }
        </div>
        <div className="input-div">
            <input type="text" className="input-field" />
            <Button className="send-btn">Send</Button>
        </div>
      </TabPanel>
      <TabPanel value={value} index={9} className="tab-panel">
      <div className="heading">Item One</div>
      <div className="msgs">
        {chats.map((value,index)=>(
                value.sender==="abc1"&&value.reciever==="xyz2"?
                (<div className='current-user-msg' key={index}>
                    <img src={lock} alt className="msg-icon" align="right" />
                    <div className="current-sub-div">
                        {value.msg}
                    </div>
                </div>)        
                :
                (value.sender==="xyz2"&&value.reciever==="abc1"?
                (<div className='other-user-msg' key={index}>
                    <img src={lock} alt className="msg-icon" align="left" />
                    <div className="other-sub-div">
                        {value.msg}
                    </div>
                </div>):null)
        ))
        }
        </div>
        <div className="input-div">
            <input type="text" className="input-field" />
            <Button className="send-btn">Send</Button>
        </div>
      </TabPanel>
      <TabPanel value={value} index={10} className="tab-panel">
      <div className="heading">Item One</div>
      <div className="msgs">
        {chats.map((value,index)=>(
                value.sender==="abc1"&&value.reciever==="xyz2"?
                (<div className='current-user-msg' key={index}>
                    <img src={lock} alt className="msg-icon" align="right" />
                    <div className="current-sub-div">
                        {value.msg}
                    </div>
                </div>)        
                :
                (value.sender==="xyz2"&&value.reciever==="abc1"?
                (<div className='other-user-msg' key={index}>
                    <img src={lock} alt className="msg-icon" align="left" />
                    <div className="other-sub-div">
                        {value.msg}
                    </div>
                </div>):null)
        ))
        }
        </div>
        <div className="input-div">
            <input type="text" className="input-field" />
            <Button className="send-btn">Send</Button>
        </div>
      </TabPanel>
    </Box>
  );
}