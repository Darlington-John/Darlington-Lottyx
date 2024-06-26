
import Button from "./buttons";
import coinImg from './../assets/icons/coin.png'
import BellImg from './../assets/icons/Bell.png'
import plusImg from './../assets/icons/plus.png'
import ticketIcon from "./../assets/icons/ticket.png"
import useForm from "./hooks/useForm";
import userIcon from "~/assets/icons/user.png"
import leftIcon from '~/assets/icons/arrow-left.png'
import { useLocation, useNavigate } from "@remix-run/react";
import { startsWith } from "@xata.io/client";

const Navbar = ({user}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoBack = () => {
      navigate(-1); // Navigate back in history
    };
    return (  <div className="flex  items-center justify-between sticky w-full top-0 z-40 text-white text-sm px-5  py-3 ">
        <div className="flex items-center gap-2">
        {location.pathname  ==="/discover" || location.pathname  ==="/jackpot"  ? (<>
            <Button icon={true} img={userIcon} bg="#00000040" rounded="full" pad="8px"/>
<h1 >
    Hello {user.name}
    
</h1>

        </>) : ( <Button icon={true} img={leftIcon} bg="#00000040" rounded="lg" pad="8px" onClick={handleGoBack}/>)}

</div>
<div className="flex gap-2 p-2  items-center">
    <div className="flex flex-row bg-[#00000040] py-2 px-2 gap-1 rounded-sm ">
    <Button  label={true} labelImg={coinImg} labelText="124,000" bg="#00000000"   />
    <Button  icon={true} img={plusImg} bg="#00000040" pad="2px"/>
    </div>
    <div className="relative">
        <button className="bg-[#FFBF00]  p-1 rounded-full  z-30 absolute top-0  right-px">
            
        </button>
        {location.pathname.startsWith("/discover") ?    <Button icon={true} img={BellImg} bg="#00000040" pad="8px" rounded="sm"/>   :    null}
        {location.pathname.startsWith("/jackpot") ?    <Button icon={true} img={ticketIcon} bg="#00000040" pad="8px" rounded="sm"/>   :    null}
    </div>
</div>
    </div>);
}
 
export default Navbar;