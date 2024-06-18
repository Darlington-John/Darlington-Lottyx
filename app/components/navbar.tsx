
import Button from "./buttons";
import coinImg from './../assets/icons/coin.png'
import BellImg from './../assets/icons/Bell.png'
import plusImg from './../assets/icons/plus.png'
import useForm from "./hooks/useForm";
import { UserButton } from "@clerk/remix";
const Navbar = ({user}) => {


    return (  <div className="flex  items-center justify-between sticky w-full top-0 z-40 text-white text-sm px-5  py-3 ">
        <div className="flex items-center gap-2">
        <UserButton/>
<h1 >
    Hello {user.name}
</h1>

</div>
<div className="flex gap-2">
    <Button  label={true} labelImg={coinImg} labelText="124,000" bg="#00000040" icon={true} img={plusImg} />
    <div className="relative">
        <button className="bg-[#FFBF00]  p-1 rounded-full  z-30 absolute top-0  right-px">
            
        </button>
    <Button icon={true} img={BellImg} bg="#00000040"/>
    </div>
</div>
    </div>);
}
 
export default Navbar;