import Button from "./buttons";
import closeIcon from '~/assets/icons/close.png'
import CountdownTimer from "./countdown";
import coinImg from '~/assets/icons/coin.png'
import { Link } from "@remix-run/react";
import ticketImg from '~/assets/images/Ticket.png'
const Cards = (props: any) => {
    return ( <> 
    {props.products && (
        <Link to={props.link}>
        <div className={`relative flex flex-col overflow-hidden  rounded-2xl shrink-0  `} style={{width: `${props.pWidth}`}}>
            {props.hot && (<div className="bg-[#FF0000] absolute top-[10px] z-20 left-[-30px] -rotate-45 w-[100px] text-center">
                <h1 className="text-[9px] font-semibold">Hot</h1>
            </div>)}
            
<img src={props.product} alt="" className="h-[130px] object-cover" />
<div className="flex flex-col  gap-2 bg-[#2D312F] text-sm p-2 items-start relative overflow-hidden">
    <div className="flex w-full p-3 bg-[#B3B3B3] absolute top-[-10px] z-10 left-0  opacity-50 blur-lg"></div>
<h1 className="line-clamp-1 relative z-20">{props.name}</h1>
<Button label={true} labelImg={coinImg} labelText={props.price} bg="#444A47" rounded="lg" pad=" 2px 4px"/>
</div>
        </div>
        </Link>
    )}
    {props.annoucement && (
        <div className=" p-4 w-full rounded-lg py-xl px-2xl flex items-start    text-white flex-col gap-1 relative overflow-hidden shrink-0" style={{
            backgroundImage: `url(${props.background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            alignItems: `${props.place}`
          }}>
            {props.herobg && (
                <img src={props.hero} alt="" className="absolute right-0 bottom-0 z-10"/>
            )}
{props.close && (
    <div className="flex items-center  justify-between w-full relative z-20">
        <h1 className="text-sm font-semibold">
            {props.info}
            </h1>
            <Button icon={true} img={closeIcon} bg="#00000040" rounded="full" pad="4px" onClick={props.onClick}/>
            
    </div>
)}
{props.countdown && (
    <div className="flex flex-col items-start  gap-2 relative z-20 " style={{  alignItems: `${props.place}` }}>
        {props.winAnnouce && (
            <h1 className="font-semibold text-sm text-center">{props.annouce}</h1>
        )}
    <CountdownTimer/>
    {props.moreInfo && (
    <button className="text-[9px] font-semibold" onClick={props.learn}>
        Click to learn more
    </button>
    )}
    </div>
)}
        </div>
    )}
    {props.information  && (
        <div className="flex gap-2 items-start w-full   rounded-lg text-sm  bg-[#00000040] p-3  text-start">
<img src={props.infoImg} alt=""/>
<p>{props.info}</p>
        </div>
    )}
    {props.tickets && (
        <Link to={props.link}>
        <div className="flex justify-between py-3 px-4 items-start bg-[#171817] rounded-lg">
<div className="flex gap-1 items-center">
<img src={ticketImg} alt="" className="w-10 h-10"/>
<div className="flex flex-col gap-0">
<h1 className="text-sm ">
    Ticket #{props.id}
</h1>
<h1 className="text-sm ">
    {props.date}
</h1>
</div>
</div>
<Button label={true} labelImg={coinImg} labelText={props.pay} bg="#444A47" rounded="[4px]" pad=" 2px 4px"/>
        </div>
        </Link>
    )}
    </>);
}
 
export default Cards;