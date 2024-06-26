import { useState, useEffect, useRef } from 'react';
import jackpotImg from '~/assets/images/jackpot.png'
import Button from '~/components/buttons';
import Cards from '~/components/cards';
import { jackpotInfo } from '~/components/data/jackpot-info';
import wheelImg from '~/assets/images/wheel.png'
import spinImg from '~/assets/images/spin.png'
import polyImg from '~/assets/images/poly.png'
import { useNavigate } from '@remix-run/react';
function MyComponent() {
    const [showInfo, setShowInfo] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const infoRef = useRef(null);

    useEffect(() => {
        // Check if localStorage is available
        if (typeof window !== 'undefined') {
            const hasVisitedBefore = localStorage.getItem('visitedBefore');
            setShowInfo(!hasVisitedBefore); // Show info if 'visitedBefore' is not set
            if (!hasVisitedBefore) {
                setIsVisible(true); // Trigger animation if first time visit
            }
        }
        setIsLoading(false); // Set loading to false after check
    }, []);
    const navigate = useNavigate();
    const spin = () => {
      setIsSpinning(true);
      setTimeout(() => {
        navigate('/jackpot/play'); // Replace with your target page URL
      }, 3000);
    };
    const handleCloseInfo = () => {
        setIsVisible(false); // Trigger hide animation
        setTimeout(() => {
            setShowInfo(false); // Close the info message after animation
            if (typeof window !== 'undefined') {
                localStorage.setItem('visitedBefore', true); // Set 'visitedBefore' in localStorage
            }
        }, 500); // Delay hiding the component until animation is done
    };

    if (isLoading) {
        return null; // Render nothing while loading
    }

    return (
        <div className='flex items-center justify-end flex-col w-full gap-6'>
            {showInfo && (
                // <div className={`popup ${isVisible ? '' : 'popup-hidden'}`} ref={infoRef}>

                // </div>
                <div className={`fixed bottom-[61px]  h-full w-full  z-30 left-0 flex  justify-end  items-end        backdrop-brightness-50  `}>
<div className={`w-full p-3 bg-[#410A88] h-auto rounded-t-2xl relative overflow-hidden   items-stretch  gap-5  px-3 py-3 flex flex-col  gap-3  popup duration-300 ease-in-out ${isVisible ? '' : 'popup-hidden'}`}>
{/* <p>This is the info message.</p>
<button onClick={handleCloseInfo}>Close</button> */}
<div className='flex w-full items-center justify-center text-center flex-col gap-2'>
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
<div className='flex-col  flex w-full items-center  text-center flex-col gap-2 '>
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
            {/* Rest of your component */}
<h1 className='text-[22px] font-semibold text-center '>
Spin the wheel to enter<br/> the jackpot for this week!
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

export default MyComponent;
