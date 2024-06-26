import Button from "./buttons";
import { biddingInfo } from "./data/biding-info";
import useForm from "./hooks/useForm";
import informationImg from '~/assets/images/information.png'
import LottoNumberGenerator from "./lotto-spinner";
const Popup = (props : any) => {
    const {isVisible, popupRef, togglePopup, showInfo, isBiddingVisible,popupBidRef,toggleBid,bidding} = useForm();
    return (<>
{props.slide && (
    <>
    {showInfo && (
  <div className={`fixed bottom-[61px]  h-full w-full  z-30 left-0 flex  justify-end items-end transition      backdrop-brightness-50`}>
<div className={`w-full p-3 bg-[#171817] h-auto rounded-t-2xl relative overflow-hidden   items-stretch  gap-5  p-6 flex flex-col  popup duration-300 ease-in-out ${isVisible ? '' : 'popup-hidden'}`} ref={popupRef} >
<div className='absolute  -top-20 left-0 w-full p-4 bg-white blur-3xl'>
</div>
{props.info && (
    <div className="w-full items-center text-center  flex justify-center flex-col gap-3">
<img src={props.infoImg} alt=""  className=""/>
<h1 className="text-[22px] font-semibold">
{props.infoText}
</h1>
</div>
)}
<div className="self-center">

    {props.bidWorks && (
        <div className="flex  flex-col gap-4">
            {biddingInfo.map((data, index) => (
                <div className="flex gap-2 items-center" key={index}>
<img src={informationImg} className="w-5 h-5 " alt=""/>
<h1 className="text-sm">
{data.info}
</h1>
</div>
            ))}

        </div>
    )}

</div>
{props.action && (
   <Button bg="#18A551"  action={props.sucess} pad="8px  16px " rounded="lg "  onClick={props.onClick}/>
)}
</div>
  </div>
)}
 {bidding && (
  <div className={`fixed bottom-[61px]  h-full w-full  z-30 left-0 flex  justify-end items-end transition      backdrop-brightness-50`}>
<div className={`w-full p-3 bg-[#171817] h-auto rounded-t-2xl relative overflow-hidden   items-stretch  gap-5  p-6 flex flex-col  popup duration-300 ease-in-out ${isBiddingVisible ? '' : 'popup-hidden'}`} ref={popupBidRef} >
<div className='absolute  -top-20 left-0 w-full p-4 bg-white blur-3xl'>
</div>
{props.info && (
    <div className="w-full items-center text-center  flex justify-center flex-col gap-3">
<img src={props.infoImg} alt=""  className=""/>
<h1 className="text-[22px] font-semibold">
{props.infoText}
</h1>
</div>
)}
<div className="self-center">

<LottoNumberGenerator onClick={props.editClick}/>

</div>

{props.action && (
   <Button bg="#18A551"  action={props.sucess} pad="8px  16px " rounded="lg "  onClick={props.onClick}/>
)}
</div>
  </div>
)}
    </>
)}
    </>  );
}
 
export default Popup;