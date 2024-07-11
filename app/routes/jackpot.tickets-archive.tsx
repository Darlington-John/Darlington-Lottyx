import { useState, useEffect } from 'react';
import jackpotImg from '~/assets/images/jackpot.png'
import Button from '~/components/buttons';
import Cards from '~/components/cards';
import { jackpotInfo } from '~/components/data/jackpot-info';
import wheelImg from '~/assets/images/wheel.png'
import spinImg from '~/assets/images/spin.png'
import polyImg from '~/assets/images/poly.png'
import warningImg from '~/assets/icons/warningRound.png'
import { Link, useLoaderData, useNavigate } from '@remix-run/react';
import { LoaderFunction, ActionFunction, json } from "@remix-run/node";
import rightIcon from '~/assets/icons/arr-right.png'
import { authenticator } from 'utils/auth.server';
import { getXataClient } from 'utils/xata';
import styleImg from "~/assets/images/style.png"
import smileMan  from "~/assets/images/smile-man.png"
import useForm from '~/components/hooks/useForm';
// import  './../components/data/jsonPots';
export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  if (!user) {
    return null;
  }

  const xata = getXataClient();
  const pots = await xata.db.pots.filter({ "user.id": user.id }).getMany();
  console.log("POTS", pots);

  // Return data as JSON response
  return json({ pots, user });
};

function JackpotTickets() {
  const {PlayAgain} = useForm();
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
        <>
                 {pots.length === 0 ? (
  <h1>
    No tickets yet
  </h1>
          ) : (
<div className='w-full flex flex-col  gap-5 relative'>
{showJackpot && (      <Cards  background={styleImg} annoucement  close  info="NEXT JACKPOT IN…" countdown  herobg  hero={smileMan} onClick={hideJackpot} moreInfo/>)}

<h1 className='font-semibold text-[22px]'>
Active tickets
</h1>
<div className='flex flex-col gap-3 items-start'>
<p className='text-[#A7B1AB] text-sm '>
Here are tickets you played for this week. Play multiple times to increase your chances of winning.
</p>
<div className='border border-[#444A47] flex justify-between w-full items-center bg-[#2D312F]  py-2 px-3 rounded-lg'>
<div className='flex gap-2 items-center'>
  <img src={warningImg} alt=''/>
  <h1 className='text-sm'>  Tickets expires on Apr 15, 2024</h1>

</div>
<Button icon={true} img={rightIcon} bg="#18A551" rounded="[4px]" pad="8px" shadow/>
</div>
</div>

  <div className='flex flex-col gap-3'>
{pots.map((data, index) => (
  <Cards tickets  data={data} {...data} key={data.id} id={index + 1} 
  link={`/jackpot/tickets/${data.id}?index=${index + 1}`}
    date={data.xata ? formatDate(data.xata.createdAt) 
    : 'No creation date'} pay={data.pay}
    
    />
))}

</div>
</div>
          )}</>

    );
}

export default JackpotTickets;
