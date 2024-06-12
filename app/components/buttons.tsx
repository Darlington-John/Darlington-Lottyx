
const Button = (props: any) => {
    return (<div className={`flex items-center justify-between    rounded py-1 px-2 gap-2` }  onClick={props.onClick} style={{backgroundColor: `${props.bg}`}}>

{props.label && (
    <div className="flex gap-1  text-white  font-semibold">
            <img src={props.labelImg} alt="" className="w-auto  h-auto"/>
<h1>
{props.labelText}
</h1>
    </div>
)}
{props.icon && (
    <img src={props.img} alt="" className="w-auto"/>
)}
{props.action && (<h1 className="text-white   font-semibold text-sm">
{props.action}
</h1>)}
    </div>  );
}
 
export default Button;