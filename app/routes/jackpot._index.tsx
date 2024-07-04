import { useState, useEffect } from 'react';
import jackpotImg from '~/assets/images/jackpot.png'
import Button from '~/components/buttons';
import Cards from '~/components/cards';
import { jackpotInfo } from '~/components/data/jackpot-info';
import wheelImg from '~/assets/images/wheel.png'
import spinImg from '~/assets/images/spin.png'
import polyImg from '~/assets/images/poly.png'
import warningImg from '~/assets/icons/warningRound.png'
import { useLoaderData, useNavigate } from '@remix-run/react';
import { LoaderFunction, ActionFunction, json } from "@remix-run/node";
import rightIcon from '~/assets/icons/arr-right.png'
import { authenticator } from 'utils/auth.server';
import { getXataClient } from 'utils/xata';
import styleImg from "~/assets/images/style.png"
import smileMan  from "~/assets/images/smile-man.png"

export const loader: LoaderFunction = async ({ request }) => {
    const user = await authenticator.isAuthenticated(request, {
      failureRedirect: '/login',
    });

    if (!user) {
      return null;
    }

    const xata = getXataClient();
    const pots = await xata.db.pots.filter({ "user.id": user.id }).getMany();
    console.log("POTS", pots);
    return json({pots, user });
  };
  
function Jackpot() {
    const [showInfo, setShowInfo] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const { pots } = useLoaderData();
    useEffect(() => {
 
        if (typeof window !== 'undefined') {
            const hasVisitedBefore = localStorage.getItem('visitedBefore');
            setShowInfo(!hasVisitedBefore); 
            if (!hasVisitedBefore) {
                setIsVisible(true);
            }
        }
        setIsLoading(false); 
    }, []);
    const navigate = useNavigate();
    const spin = () => {
      setIsSpinning(true);
      setTimeout(() => {
        navigate('/jackpot/play'); 
      }, 3000);
    };
    const handleCloseInfo = () => {
        setIsVisible(false);
        setTimeout(() => {
            setShowInfo(false); 
            if (typeof window !== 'undefined') {
                localStorage.setItem('visitedBefore', true); 
            }
        }, 500);
    };
    const [showJackpot, setShowJackpot] = useState(true);
    const hideJackpot = () => {
        setShowJackpot(false);
      };
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    if (isLoading) {
        return null;
    }
 
    return (
        
             
           <div className='flex items-center justify-end flex-col w-full gap-6'>
           {showInfo && (

               <div className={`fixed bottom-[61px]  h-full w-full  z-30 left-0 flex  justify-end  items-end        backdrop-brightness-50  `}>
<div className={`w-full p-3 bg-[#410A88] h-auto rounded-t-2xl relative overflow-hidden   items-stretch  gap-5  px-3 py-3 flex flex-col  gap-3  popup duration-300 ease-in-out ${isVisible ? '' : 'popup-hidden'}`}>
<div className='absolute -top-60  left-0 bg-[#fff]  p-40 blur-[150px]  rounded-full     -translate-x-1/2  left-1/2 z-10'></div>
<div className='flex w-full items-center justify-center text-center flex-col gap-2 z-20 relative'>
   <img src={jackpotImg} alt=""/>
   <div className=''>
<h1 className='text-[9px] font-semibold '>
   WELCOME TO
</h1>
<h1 className='text-[22px] font-semibold '>
   Jackpot
</h1>
   </div>
</div>
<div className='flex-col  flex w-full items-center  text-center flex-col gap-2  z-20 relative'>
<h1 className='text-[9px] font-semibold '>
HERE’S HOW IT WORKS
</h1>
<div className='flex flex-col w-full gap-2 '>
{jackpotInfo.map((data, index)=>(
   <Cards information data={data} {...data} key={index}/>
))}
</div>
</div>
<Button bg="#18A551"  action='I understand' pad="8px  16px " rounded="lg "  onClick={handleCloseInfo}/>

</div>
               </div>
           )}


<h1 className='text-[22px] font-semibold text-center '>
  {pots.length === 0 ? (<>Spin the wheel to enter<br/> the jackpot for this week!</>) : ('Spin the wheel to enter a new jackpot')}

</h1>
<div className='flex  flex-col items-center justify-center  relative'>
   <div className='  relative top-20'>
   <img src={wheelImg} alt="" className={`relative z-20 transition duration-150 ease-in-out  ${isSpinning && 'animate-spin'}`}/>
   <img src={spinImg} alt=''className='absolute  z-20 top-0 left-0  -translate-y-1/2  -translate-x-1/2  top-1/2 left-1/2' onClick={spin}/>
   </div>

<img src={polyImg} alt="" className='relative z-10'/>
</div>
       </div>
     


    );
}

export default Jackpot;
