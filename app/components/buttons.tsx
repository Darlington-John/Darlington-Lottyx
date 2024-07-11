
const Button = (props: any) => {
    return (<div className={`flex items-center justify-between       rounded   gap-2  ` }  onClick={props.onClick} >

{props.label && (
    <div className={`flex gap-1  text-white  font-semibold  rounded-${props.rounded} 
shrink-0 `} style={{backgroundColor: `${props.bg}`, padding: `${props.pad}`}}>
            <img src={props.labelImg} alt="" className={`w-auto  h-auto order-${props.order}`}/>
<h1>
{props.labelText}
</h1>
    </div>
)}
{props.icon && (
    <div  className={`w-auto ${props.shadow && 'action'}   rounded-${props.rounded}`} style={{ padding: `${props.pad}`, backgroundColor: `${props.bg}`}}>
    <img src={props.img} alt="" className={`w-${props.imgWidth} rounded-full`} />
    </div>
)}
{props.action && (<h1 className={`text-white   font-semibold text-sm  w-full text-center     rounded-${props.rounded}   ${props.shadow && 'action'}  h-[40px]`} style={{backgroundColor: `${props.bg}`, padding: `${props.pad}`}}>
{props.action}
</h1>)}
    </div>  );
}
 
export default Button;