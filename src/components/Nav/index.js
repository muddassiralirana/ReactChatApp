import './Css/index.css';
import {Link} from 'react-router-dom';
import { auth } from "../../config/Firebase";
// import moon from '../../assests/images/moon-solid.svg';
// import sun from '../../assests/images/sun-solid.svg';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
function Nav({light,onClick,logout}){
    let cUser = auth.currentUser;
    return cUser?(<div className={light?"Nav Nav-Light":"Nav Nav-Dark"}>
    <button className="icon-btn" onClick={onClick}>
        {light?<NightsStayIcon className="mode-icon"/>:<WbSunnyIcon className="mode-icon" />}
        </button>
        <Link to="/profile" className="link" >Profile</Link>
        <Link to="/chat" className="link" >Chat</Link>
        <Link to="/contacts" className="link" >Contacts</Link>
        <button className="link-btn" onClick={logout} >Logout</button>
    </div>):
    (<div className={light?"Nav Nav-Light":"Nav Nav-Dark"}>
        <button className="icon-btn" onClick={onClick}>
            {light?<NightsStayIcon className="mode-icon"/>:<WbSunnyIcon className="mode-icon" />}
        </button>
        <Link to="/" className="link" >Login</Link>
        <Link to="/signup" className="link" >Sign Up</Link>
    </div>);
   
}
export default Nav;