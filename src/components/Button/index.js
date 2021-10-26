import './Css/index.css';
function Button({onClick,className,children,disabled,type}){
    return (
        <button 
        onClick={onClick} 
        type={type} 
        disabled={disabled} 
        className={className} 
        >
            {children}
        </button>
    );
}
export default Button;