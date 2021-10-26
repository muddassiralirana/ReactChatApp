import './Css/index.css';

function Post({profile,name,date,text,pic,likes,comments,shares,light}) {
    return <div className={light?"post LightColor":"post DarkColor"} id="post" >
        <img alt={name} src={profile} className="profile" align="left" />
        <span className="name" > {name} </span>
        <br />
        <span className="date" > {date} </span>
        <p className="text" > {text} </p>
        <img alt="post pic" src={pic} className="pic" />
        <p className="r1" >
            <span className="sp1" >
                <button className="link1" > Likes </button> 
                <button className="link2" > {likes} </button>
            </span>
            <span className="sp2" >
                <button className="link3"> {comments} comments </button>
                <button className="link4" > {shares} shares </button>
            </span>
        </p>
        <p className="r2" >
            <button className="btn1" >Like</button>
            <button className="btn2" > Comment </button>
            <button className="btn3" > Share </button>
        </p>
    </div>
}
export default Post;