
import Button from "./buttons";
import coinImg from './../assets/icons/coin.png'
import BellImg from './../assets/icons/Bell.png'
import plusImg from './../assets/icons/plus.png'
import ticketIcon from "./../assets/icons/ticket.png"
import moreIcon from '~/assets/icons/more.png'
import userIcon from "~/assets/icons/user.png"
import leftIcon from '~/assets/icons/arrow-left.png'
import { useLocation, useNavigate } from "@remix-run/react";
import checkIcon from "~/assets/icons/check.png"
import closeIcon from "~/assets/icons/close.png"
import useForm from "./hooks/useForm";
const Navbar = ({user, ...props}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const {toggleDeletePopup} = useForm();
    const handleGoBack = () => {
      navigate(-1);

    };
    return (  <div className="flex  items-center justify-between sticky w-full top-0 z-40 text-white text-sm px-5  py-3 ">
        {location.pathname === '/jackpot/play'  && (
                <div className="flex flex-row bg-[#00000040] py-2 px-2 gap-1 rounded-[4px] ">
                <Button  label={true} labelImg={closeIcon} labelText="Cancel" bg="#00000000"  rounded="2xl" onClick={props.cancel}  />
                </div>
        )}
               {location.pathname === '/jackpot/play'  && (
               <h1 className="text-sm font-semibold">Jackpot</h1>
        )}
             {location.pathname === '/jackpot/play'  && (
                <div className="flex flex-row bg-[#18A551] py-2 px-2 gap-1 rounded-[4px]  action">
                <Button  label={true} labelImg={checkIcon} labelText="Submit" bg="#00000000"  rounded="2xl"  order="1"  onClick={props.handleClick} />
 
                </div>
        )}
        {location.pathname.startsWith("/discover") || location.pathname === "/jackpot"   || location.pathname === '/jackpot/tickets' ? 
        <div className="flex items-center gap-2">
        {location.pathname  ==="/discover" || location.pathname  ==="/jackpot"   || location.pathname === '/jackpot/tickets' ? (<>
            <Button icon={true} img={user.profile? user.profile :userIcon} bg="#00000040" rounded="full" pad={user.profile? '0px' :'8px'} imgWidth="8"/>
<h1 >
    Hello {user.name}
    
</h1>

        </>) : ( <> {location.pathname === '/jackpot/play' ? null: (<Button icon={true} img={leftIcon} bg="#00000040" rounded="lg" pad="8px" onClick={handleGoBack}/>)}

         </>  )}

</div> : null
}
{(location.pathname.startsWith('/jackpot/tickets/rec') || location.pathname === '/jackpot/tickets-archive') && (
  <Button icon={true} img={leftIcon} bg="#00000040" rounded="lg" pad="8px" onClick={handleGoBack} />
)}

{location.pathname.startsWith('/discover') ||  location.pathname ==='/jackpot'  || location.pathname === '/jackpot/tickets'    ? (
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
        ) : ''}
{location.pathname.startsWith('/profile')  && (
    <div className="flex items-center w-full justify-between">
        <div></div>
  <Button icon={true} img={moreIcon} bg="#00000040" rounded="lg  justify-self-end " pad="8px"  onClick={toggleDeletePopup}/>
  </div>
)}
    </div>);
}
 
export default Navbar;