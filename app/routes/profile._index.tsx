
import { Form, useLoaderData} from '@remix-run/react';
import { LoaderFunction,  json, ActionFunction } from "@remix-run/node";

import { authenticator } from 'utils/auth.server';
import { getXataClient } from 'utils/xata';
import diceImg from '~/assets/icons/dice.png'
import blue from '~/assets/images/blueMain.png'
import profile from "~/assets/icons/user.svg"
import walletImg from '~/assets/icons/wallet.png'
import lineImg from '~/assets/icons/line.png'
import copyImg from '~/assets/icons/copy.png'
import game from '~/assets/icons/gamepad.png'
import Cards from '~/components/cards';
import Button from '~/components/buttons';
import suspend  from "~/assets/icons/stop.png"
import useForm from '~/components/hooks/useForm';
import divider from '~/assets/images/Divider.png'
import trash from '~/assets/icons/trash.png'
import { useEffect, useRef, useState } from 'react';
import deleteImg from '~/assets/images/delete.png';
import eyeOpenImg from "./../assets/icons/eyeOpen.png"
import eyeCloseImg from "./../assets/icons/eyeClose.png"
export const loader: LoaderFunction = async ({ request }) => {
    const user = await authenticator.isAuthenticated(request, {
      failureRedirect: '/login',
    });

    if (!user) {
      return null;
    }

    const xata = getXataClient();
    const pots = await xata.db.pots.filter({ "user.id": user.id }).getMany();
    const bids = await xata.db.bids.filter({ "user.id": user.id }).getMany();
    console.log("POTS", pots);
    return json({pots, user ,bids});
  };
  export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const action = form.get('action');
    const xata = getXataClient();
    const user = await authenticator.isAuthenticated(request, {
      failureRedirect: '/login'
    });
  
    switch (action) {
      
      case "logout": {
        return await authenticator.logout(request, { redirectTo: '/login' });
      }  
       case "delete": {
        const id = form.get('id');
        if (typeof id !== 'string') {
          return null;
        }
        const user = await xata.db.users.delete(id);
        return json(user);
      }

      default:
        return null;
    }
  }
  
function Profile() {
 
const {deleteAcctPop, toggleDeletePopup, setDeleteAcctPop}= useForm();
    const { pots, bids, user } = useLoaderData();
    const [deleteAcct, setDeleteAcct] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const deleteRef = useRef(null);

    const toggleDeleteAcctPopup = () => {
// toggleDeletePopup();
setDeleteAcctPop(false);
      if (!deleteAcct) {
        setDeleteAcct(true);
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setTimeout(() => setDeleteAcct(false), 500);
      }
      
    };

    const handleClickOutside = (event) => {
      if (deleteRef.current && !deleteRef.current.contains(event.target)) {
        setIsVisible(false);
        setTimeout(() => setDeleteAcct(false), 500);
      }
      
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const [deleteAcctMain, setDeleteAcctMain] = useState(false);
    const [isMainVisible, setIsMainVisible] = useState(false);
    const deleteMainRef = useRef(null);

    const toggleDeleteAcctMainPopup = () => {
      if (!deleteAcctMain) {
        setDeleteAcctMain(true);
        setIsMainVisible(true);
      } else {
        setIsMainVisible(false);
        setTimeout(() => setDeleteAcctMain(false), 500);
      }
      
    };
const resetPopup =()=>{
  if (!deleteAcctMain) {
    setDeleteAcctMain(true);
    setIsMainVisible(true);
  } else {
    setIsMainVisible(false);
    setTimeout(() => setDeleteAcctMain(false), 500);
  }
}
    const handleClickDeleteOutside = (event) => {
      if (deleteMainRef.current && !deleteMainRef.current.contains(event.target)) {
        setIsMainVisible(false);
        setTimeout(() => setDeleteAcctMain(false), 500);
      }
      
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClickDeleteOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickDeleteOutside);
      };
    }, []);
 const profileLinks = [
    {
        id:1,
        content: 'Your bids',
        icon: game,
        link: '',
    },
    {
        id:2,
        content: 'Change name',
        icon: game,
        link: '',
    },
    {
        id:3,
        content: 'Change image',
        icon: game,
        link: '',
    },
    {
        id:4,
        content: 'Change password',
        icon: game,
        link: '',
    },
 ]
 const [isPasswordVisible, setIsPasswordVisible] = useState(false);
 const handleTogglePasswordVisibility = () => {
  setIsPasswordVisible(!isPasswordVisible);
};
    return (
        
             
           <div className='flex items-center flex-col w-full gap-8 relative'>
<div className='flex items-center w-full flex-col gap-2'>
<div className='flex items-center justify-between w-full'>
    <div className='py-4 px-2 bg-[#00000040] rounded-lg  text-center flex flex-col items-center w-[80px]'>
<img src={diceImg} alt=''/>
<h1 className='text-[17px] font-semibold'>
{bids? bids.length: '0' }
</h1>
<h1 className='text-[9px] '>
Total bids

</h1>
    </div>
<div className='flex items-center justify-center p-3 bg-[#00000040] rounded-full'>
<img src={user.profile? user.profile: profile} alt="" className='w-[150px] h-[150px] rounded-full object-cover'/>
</div>
<div className='py-4 px-2 bg-[#00000040] rounded-lg  text-center flex flex-col items-center w-[80px]'>
<img src={walletImg} alt=''/>
<h1 className='text-[17px] font-semibold'>
₦150k
</h1>
<h1 className='text-[9px] '>
Winnings
</h1>
    </div>
</div>
<div className='flex flex-col  items-center gap-2'>
<div className='flex gap-2 text-[22px] font-semibold'>
<h1>{user.name}</h1>
<h1>{user?.surname}</h1>
{/* <h1>{user.profile}</h1> */}
</div>
<div className='flex items-center gap-2 text-[#A7B1AB] text-sm'>
    <h1>
        {user?.email}
    </h1>
    <img src={lineImg} alt=""/>
    <h1>
        {user?.phone}
    </h1>
</div>
<div className='flex gap-1  py-1 px-2 rounded-full text-[9px] font-semibold border border-[#737D77]'>
<h1>
    ID: 
</h1>
<h1>
{user?.phone}
</h1>
<img src={copyImg} alt=''/>
</div>
</div>
</div>
<div className='flex flex-col  w-full gap-2'>
    {profileLinks.map((data,index)=> (
        <Cards profile key={index} data={data} {...data} />
    ))}

</div>
{deleteAcctPop && (
  <div className='fixed top-12 right-[20px] bg-[#2d312f] border border-[#444A47] z-[1000] w-[200px] h-[90px]  rounded-lg p-3 flex flex-col justify-between'>
<div className='flex gap-2 items-center text-sm  '>
  <img src={suspend} alt=""/>
  <h1>
  Suspend account
  </h1>
</div>
<img src={divider} alt='' className='w-full'/>
<div className='flex gap-2 items-center text-sm text-[#FF8D8D]  ' onClick={toggleDeleteAcctPopup}>
  <img src={trash} alt=""/>
  <h1>
Delete account
  </h1>
</div>
  </div>
)}
<div   className='w-full'>
<button   onClick={toggleDeleteAcctMainPopup}
        className="text-base text-[#fff] w-full   px-2  bg-transparent  items-center rounded-md flex justify-center text-white text-base py-2 text-center h-[40px]   border border-[#737D77]"  >
Log out
        </button>
      </div>
{deleteAcct && (
  <div className={`fixed bottom-[61px]  h-full w-full  z-30 left-0 flex  justify-end  items-end        backdrop-brightness-50   `}>

  <div className={`w-full p-3 bg-[#171817]  h-auto rounded-t-2xl relative overflow-hidden   items-stretch  gap-4  p-6 flex flex-col  gap-3  popup duration-300 ease-in-out relative  ${isVisible ? '' : 'popup-hidden'}`} ref={deleteRef}>
  <div className="bg-white p-1.5 blur-2xl absolute -top-[20px] left-0 w-full"  >
  </div>
  <img src={deleteImg} alt='' className='mx-auto'/>
  <h1 className='text-center font-semibold  text-[22px]'>
  Delete your account
  </h1>
  <h1 className='text-center   text-sm'>
  Deleting your account will permanently remove all your data. You can’t undo this.
  </h1>
  <Form method="post" className='flex flex-col w-full gap-4'>
    <div className='flex flex-col w-full gap-1'>
    <h1 className='text-sm'>
    Enter your password to delete your account
      </h1>
  <div className={`w-full bg-[#2D312F]  rounded-md border  border-[#444A47] border-2 flex-row px-2 py-1 justify-beeen  items-center flex `}>

<input className="text-sm text-[#fff] w-full h-full py-1 px-2   outline-none bg-transparent"
type={isPasswordVisible ? 'text' : 'password'}
name="password"
id="password"
/>

<img
alt=""  src={isPasswordVisible ? eyeCloseImg : eyeOpenImg}
onClick={handleTogglePasswordVisibility}
className="w-5  h-5"
/>


</div>
</div>

<button  type='submit'
 name="action"
 value='logout'
className='w-full bg-[#DC0000] text-center text-sm rounded-lg shadow p-2 h-[40px]'>
Delete Account
</button>
  </Form>
         </div>
         </div>
)}
{deleteAcctMain && (
  <div className={`fixed bottom-[61px]  h-full w-full  z-30 left-0 flex  justify-center   items-center         backdrop-brightness-50   `}>

  <div className={`w-[280px] p-3 bg-[#2d312f]  h-auto  rounded-2xl relative overflow-hidden   items-stretch  gap-4  p-6 flex flex-col  gap-3  popup duration-300 ease-in-out relative  ${isMainVisible ? '' : 'popup-hidden'}`} ref={deleteMainRef}>
  <div className="bg-white p-1.5 blur-2xl absolute -top-[20px] left-0 w-full"  >
  </div>
  <h1 className='text-center font-semibold  text-sm '>
  Log out
  </h1>
  <h1 className='text-center   text-sm'>Are you sure you want to log out from your account?
  </h1>
  <Form method="post" className='flex flex-col w-full gap-4'>

<button type='submit'
 name="action"
 value='logout'
className='w-full bg-[#DC0000] text-center text-sm rounded-lg shadow p-2 h-[40px]'>
Log out
</button>
  </Form>
  <button  onClick={resetPopup}
className='w-full  text-center text-sm rounded-lg  font-semibold text-[#6BE39C] '>
Cancel
</button>
         </div>
         </div>
)}
       </div>
     


    );
}

export default Profile;
