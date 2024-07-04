import  { useState, useEffect } from 'react';
const CountdownTimer = () => {
  const calculateTargetDate = () => {
    const now = new Date().getTime();
    return now + 
      7 * 24 * 60 * 60 * 1000 + 
      2 * 60 * 60 * 1000 + 
      3 * 60 * 1000 + 
      23 * 1000; // 7 days, 2 hrs, 3 mins, 23 secs from now
  };

  const calculateTimeLeft = (targetDate) => {
    const difference = targetDate - new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return timeLeft;
  };

  const [targetDate] = useState(calculateTargetDate());
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);
  return (
    <div className='flex  items-center gap-1 text-white'>
      <div className='flex flex-col gap-0 font-semibold items-center text-center bg-[#00000040] rounded-lg  p-1 w-[48px]'>
      <span className='text-[17px]'>{timeLeft.days}</span>
      <span className='text-[9px]'> DAYS</span>
      </div>
      <span className='text-[17px]'>:</span>
      <div className='flex flex-col gap-0 font-semibold items-center text-center bg-[#00000040] rounded-lg  p-1 w-[48px]'>
      <span className='text-[17px]'>{timeLeft.hours}</span>
      <span className='text-[9px]'> HRS </span>
      </div>
      <span className='text-[17px]'>:</span>
      <div className='flex flex-col gap-0 font-semibold items-center text-center bg-[#00000040] rounded-lg  p-1 w-[48px]'>
      <span className='text-[17px]'>{timeLeft.minutes}</span>
      <span className='text-[9px]'> MINS</span>
      </div>
      <span className='text-[17px]'>:</span>
      <div className='flex flex-col gap-0 font-semibold items-center text-center bg-[#00000040] rounded-lg  p-1 w-[48px]'>
      <span className='text-[17px]'>{timeLeft.seconds}</span>
      <span className='text-[9px]'>SECS </span>
      </div>
{/* <HotProducts products={products}/> */}
    </div>
  );
};

export default CountdownTimer;
