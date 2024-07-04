import { useLoaderData, useSearchParams} from '@remix-run/react';
import { json, LoaderFunction} from '@remix-run/node';

import { getXataClient } from "utils/xata";
import { authenticator } from "utils/auth.server";
import { jsonPots } from 'jsonPots';
import { poots } from '~/components/data/pots';
import BottomBar from '~/components/bottom-bar';
import Navbar from '~/components/navbar';
import BackgroundPurpleImg from "~/assets/images/BackgroundPurple.png"
import Cards from '~/components/cards';
import winnerImg from '~/assets/images/winners.png'
import coinImg from "~/assets/images/coinBig.png"
import lineImg from '~/assets/icons/line.png'
import multiplier from '~/assets/images/multiplier.png'
export const loader: LoaderFunction = async ({ params, request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  if (!user) {
    return null;
  }

  const xata = getXataClient();
  const ticketId = params.ticket;
  const ticket = await xata.db.pots.read(ticketId);

  if (!ticket) {
    return json({ message: "Ticket not found" }, { status: 404 });
  }

  return json({ ticket, user });
};



function TicketPage() {
  
  const { ticket , user} = useLoaderData();
  const [searchParams] = useSearchParams(); // Use the hook
  const pots = [
    { number: 1, value: ticket.Pot1 },
    { number: 2, value: ticket.Pot2 },
    { number: 3, value: ticket.Pot3 },
    { number: 4, value: ticket.Pot4 },
  ];
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};
  const index = searchParams.get('index');
  // const formatDate = (dateString) => {
  //   const options = { year: "numeric", month: "long", day: "numeric" };
  //   return new Date(dateString).toLocaleDateString(undefined, options);
  // };

  return (
    <div className="h-screen  overflow-hidden  flex items-start flex-col justify-between">

    <Navbar user={user} />
              <img
     src={BackgroundPurpleImg}
     className="w-full h-full fixed  z-10 top-0" alt=""
   />

   <div className={`z-20 flex  h-full  relative w-full px-5 py-3  overflow-x-hidden  flex-col gap-5 `} style={{ height: 'calc(100% - 137px)' }}>
   <h1 className='font-semibold text-[22px]'>Ticket #{index}</h1>
   <div className='w-full py-2 hhh gap-0 flex flex-col items-center '>
<h1 className='text-[9px] font-semibold'>
YOU PAYED A TOTAL OF
</h1>
<div className='flex items-center gap-4'>
<div className='flex items-center '>
<img src={coinImg} alt='' className='w-8 h-8'/>
<h1 className='font-semibold text-[34px]'>
 {ticket.pay}
</h1>
</div>
<img src={lineImg} alt='' className=''/>
<h1 className='font-semibold text-[34px] text-[#A7B1AB]'>
₦{ticket.pay * 10}
</h1>
</div>
<h1 className='text-[9px] font-semibold'>
On {ticket.xata ? formatDate(ticket.xata.createdAt) 
    : 'No creation date'}
</h1>
   </div>
   <Cards  background={winnerImg} annoucement   countdown herobg place="center" winAnnouce annouce='Winning numbers will be announced in'   />
<div className='flex flex-col gap-4  w-full'>
  <div className='flex gap-1  flex-col'>
  <h1 className='text-[18px] font-semibold'>
  Your choice
</h1>
<h1 className='text-sm  text-[#A7B1AB]'>
How your pots look like 
</h1>
  </div>
  <div className='flex items-center gap-2 justify-center'>
{pots.map((data, index)=> (
   <div className="flex items-center gap-0 p-2 w-[80px] h-[80px] bg-[#0B0C0C] rounded-full justify-center text-[#A7B1AB] flex-col border border-[#737D77] round" key={index}>
   <h1 className="text-[10px] font-semibold chak">POT {data.number}</h1>
   <h1 className="chak text-[27px] font-semibold text-white leading-8">{data.value}</h1>
 </div>
))}
          </div>
</div>
<div className='flex flex-col gap-4  w-full'>
  <div className='flex gap-1  flex-col'>
  <h1 className='text-[18px] font-semibold'>
  Potential earning
</h1>
<h1 className='text-sm  text-[#A7B1AB]'>
Possible earnings if you guessed correctly. 
</h1>
  </div>
<img src={multiplier} alt="" className='w-full'/>
</div>
</div>
<BottomBar/>
        </div>
  );
}

export default TicketPage;