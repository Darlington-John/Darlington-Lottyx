import { useEffect, useRef, useState } from "react";
import { json, LoaderFunction, ActionFunction } from '@remix-run/node';
import { getXataClient } from "utils/xata";
import { authenticator } from "utils/auth.server";
import { Form, Link} from "@remix-run/react";
import useForm from "~/components/hooks/useForm";
import infoIcon from '~/assets/icons/infoMain.png'
import { jackpotInfo } from "~/components/data/jackpot-info";
import Cards from "~/components/cards";
import { jackpotPotCalculusInfo, jackpotPotInfo } from "~/components/data/jackpot-pot-info";
import multiplierImg from "~/assets/images/multiplier.png"
import Button from "~/components/buttons";
import closeIcon from '~/assets/icons/close.png'
import coinIcon from '~/assets/icons/coin.png'
import dangerIcon from "~/assets/icons/dang.png"
import loadImg from "~/assets/images/infinity.gif"
import confettiImg from '~/assets/images/Confetti.png'
import BackgroundPurpleImg from '~/assets/images/BackgroundPurple.png';
const numbers = Array.from({ length: 20 }, (v, i) => ({
  id: i + 1,
  number: (i + 1) * 5,
}));
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
    return json({ pots, user });
  };
  
  
  export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData();
    const action = form.get('action');
    const xata = getXataClient();
    const user = await authenticator.isAuthenticated(request, {
      failureRedirect: '/login'
    });
  
    switch (action) {
      case "addPot": {
        const Pot1 = Number(form.get('Pot1'));
        const Pot2 = Number(form.get('Pot2'));
        const Pot3 = Number(form.get('Pot3'));
        const Pot4 = Number(form.get('Pot4'));
        const pay = Number(form.get('pay'));
  
        const newPot = await xata.db.pots.create({
          user,
          Pot1,
          Pot2,
          Pot3,
          Pot4,
          pay
        });
  
        return json(newPot);
      }
      default:
        return null;
    }
  }
  
  
const Pots = () => {

const {selectedNumbers,  handleDivClick, handleNumberClick , handleChange, getPotText, activeDiv, pay, setPay, isPayVisible, setIsPayVisible, payRef,togglePayPopup, handlePotsSubmit, error, paySucessful,  isPaySucessfulVisible,togglePaySucessfulPopup, toggleJackpotSucessfulPopup, jackpotSucessful, setJackpotSucessful, isJackpotSucessfulVisible, setIsJackpotSucessfulVisible, PlayAgain} = useForm();
const [learnMore, setLearnMore] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [editPayAmount, setEditPayAmount] = useState("");
    const [reflectInput, setReflectInput] = useState("");
  
    const handleInputChange = (event) => {
      const value = event.target.value;
      setEditPayAmount(value);
      setReflectInput(value);
      setInputValue(value);
    };
    const [inputValue, setInputValue] = useState("");
    const [inputWidth, setInputWidth] = useState(22); 
  
    useEffect(() => {
      
      setInputWidth(inputValue.length > 0 ? inputValue.length : 22);
    }, [inputValue]);
  
    const learnRef = useRef(null);
    const toggleLearn = () => {
      if (!learnMore) {
        setLearnMore(true);
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setTimeout(() => setLearnMore(false), 500);
      }
      
    };
    

    const handleClickOutside = (event) => {
      if (payRef.current && !payRef.current.contains(event.target)) {
        setIsPayVisible(false);
        setTimeout(() => setPay(false), 500);
      }
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

      const [activeButton, setActiveButton] = useState(0);

      const handleButtonClick = (id) => {
        setActiveButton(id);
      };
     
    
    
  return (
    <div className={`flex flex-col gap-5 items-center justify-between w-full h-full overflow-hidden    `}>

      <div className="flex gap-2 w-full justify-center relative z-20 pt-5">
        {Array.from({ length: 4 }, (v, i) => i + 1).map((pot) => (
          <div
            key={pot}
            className={`flex items-center gap-0 p-2 w-[80px] h-[80px] bg-[#0B0C0C] rounded-full justify-center text-[#A7B1AB] flex-col round ${
              activeDiv === pot ? "outline outline-4 outline-[#18A551]" : "border border-[#737D77]"
            }`}
            onClick={() => handleDivClick(pot)}
          >
            <h1 className="text-sm font-semibold chak">POT {pot}</h1>
            <h1 className={` chak ${selectedNumbers[pot] ? 'text-[27px] font-semibold text-white leading-8'  : "text-[8px]"}`}>
              {selectedNumbers[pot] ? selectedNumbers[pot] : "TAP TO CHOOSE"}
            </h1>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 text-center w-full  pb-28">
        <h1 className="text-sm">{getPotText()}</h1>
        <div className="grid grid-cols-4 w-full gap-6">
          {numbers.map((data) => (
            <div
              key={data.id}
              className={`border border-[#737D77] flex items-center gap-0 p-2 w-[60px] h-[60px] rounded-full justify-center text-[#A7B1AB] flex-col relative overflow-hidden mx-auto ${selectedNumbers[activeDiv] === data.number ? 'bg-[#0C893E] text-white' : ' bg-[#0B0C0C]'}`}
              onClick={() => handleNumberClick(data.number)}
            >
              <h1 className="text-[22px] font-semibold chak relative z-20">
                {data.number}
              </h1>
              <div className="p-3 bg-white rounded-full blur-lg absolute -top-[10px] z-10"></div>
            </div>
          ))}
        </div>
      </div>
    
      <Form method="post"  className="hidden" id="potForm">
      
          <input
            type="text"
            id="input-1"
            name="Pot1"
            value={selectedNumbers[1]}
            onChange={(e) => handleChange(e, 1)}
          />

          <input
            type="text"
            id="input-2"
            name="Pot2"
            value={selectedNumbers[2]}
            onChange={(e) => handleChange(e, 2)}
          />
    
          <input
            type="text"
            id="input-3"
            name="Pot3"
            value={selectedNumbers[3]}
            onChange={(e) => handleChange(e, 3)}
 
          />
  
      
          <input
            type="text"
            id="input-4"
            name="Pot4"
            value={selectedNumbers[4]}
            onChange={(e) => handleChange(e, 4)}
          />
           <input type="text" name="pay" id="pay"    value={reflectInput} readOnly/>
          <input type="hidden" name="action" id="action" value=""  readOnly/>
      </Form>
      
<div className={`fixed top-0 left-0 w-screen  h-full  ${isVisible? '' : 'backdrop-brightness-50 z-30'}`}>
      <div className={`absolute  left-0 p-6 bg-[#171817] w-full rounded-t-2xl items-stretch  justify-between flex flex-col overflow-hidden gap-5 z-40 bottom-[60px] pt-4     ${isVisible ? 'slide-down' : 'slide-down-hidden'}`}  ref={learnRef}>
<div className="bg-white p-1 blur-2xl absolute top-0 left-0 w-full"  >
</div>
<div className="flex flex-col gap-5">
<button  className="flex gap-2  items-center text-sm leading-[0]  self-center " onClick={toggleLearn}>
    <img src={infoIcon} alt=""/>
    <h1>Learn more</h1>
    </button>
    
        <div className="p-4 w-full  border border-[#444A47]  rounded-lg  p-[2px] w-full flex " >
            <button 
              className={`flex items-center w-full   justify-center  py-1 px-2 rounded-lg ${activeButton === 0 ? 'bg-[#2D312F]' : ''}`}
              onClick={() => handleButtonClick(0)}>
              <h1>How it works</h1>
            </button>
            <button className={`flex items-center w-full   justify-center  py-1 px-2 rounded-lg ${activeButton === 1 ? 'bg-[#2D312F]' : ''}`}  onClick={() => handleButtonClick(1)}>
              <h1>Winnings</h1>
            </button>
        </div>
        {activeButton === 0 && (<div className="flex flex-col gap-4 items-start text-start w-full">
<h1 className="text-sm">
Here’s how to play this game.
</h1>
<div className='flex flex-col w-full gap-3 '>
{jackpotPotInfo.map((data, index)=>(
    <Cards information data={data} {...data} key={index}/>
))}
</div>
        </div>)}
        </div>


        
        {activeButton === 1 && (<div className="flex flex-col gap-2 items-start text-start w-full">
<h1 className="text-sm">
Here’s how your winnings are calculated.
</h1>
<div className='flex flex-col w-full gap-2 '>
{jackpotPotCalculusInfo.map((data, index)=>(
    <Cards information data={data} {...data} key={index}/>
))}
</div>
<img src={multiplierImg} alt="" className="w-full"/>
        </div>)}
        <Button bg="#18A551"  action='I understand' pad="8px  16px " rounded="lg w-full "  onClick={toggleLearn} shadow/>
    </div>
    </div>
    {pay && (
 <div className={`fixed bottom-[61px]  h-full w-full  z-[2000] left-0 flex    items-end        backdrop-brightness-50  `}>
 <div className={`w-full  p-6 bg-[#171817] h-auto rounded-t-2xl relative overflow-hidden   items-stretch     flex flex-col  popup duration-300 ease-in-out ${isPayVisible ? '' : 'popup-hidden'}`} ref={payRef} >
 <div className="bg-white p-2 blur-2xl absolute -top-[30px] left-0 w-full"  >
 </div>
<div className='flex flex-col p-3 w-full items-stretch  text-center gap-4 relative '>

<button onClick={togglePayPopup} className="border border-[#737D77] text-[10px] p-2 flex gap-1 items-center  font-semibold rounded self-center">
<img src={closeIcon} alt=""/>
<span>
  Cancel
</span>
</button>

<h1 className="text-[22px] font-semibold    self-center">Pay and submit</h1>
<h1 className="text-sm    self-center ">How much do you want to pay for this ticket?</h1>
<Form method="post"  className="flex items-center gap-0 self-center justify-center w-full">
  <div className="shrink-0">
<img src={coinIcon} alt="" className="w-8 h-8  shrink-0"/>
  </div>
<input className=" text-[34px] text-[#FFF] font-semibold   py-1 px-1   outline-none bg-transparent    w-[220px]" 
type="number"
value={inputValue}
        onChange={handleInputChange}
 style={{
  width: inputValue.length > 0 ? `${inputWidth}ch` : "220px", 
  maxWidth: "40ch", 
  minWidth:" 3ch"
}}
placeholder="Enter amount"
/>
</Form>
{error && <div className="text-[#FF8D8D]  text-sm flex items-start gap-2 text-start">
  <img  src={dangerIcon} alt=""/>
  <h1>{error}</h1>
  </div>}
<Button bg="#313533"  action="Submit Ticket" pad="8px  16px" rounded="lg  grey-shadow" onClick={handlePotsSubmit}    />

</div>
 </div>
</div>
    )}
    {paySucessful && (
 <div className={`fixed bottom-[61px]  h-full w-full  z-[2000] left-0 flex    items-center        backdrop-brightness-50  justify-center `}>
 <div className={`w-[170px]  py-5 px-4  bg-[#171817] h-auto rounded-lg  relative overflow-hidden   items-center     flex flex-col  popup duration-300 ease-in-out ${isPaySucessfulVisible ? '' : 'popup-hidden'}`} >
 <div className="bg-white p-2 blur-2xl absolute -top-[30px] left-0 w-full"  >
 </div>
<img src={loadImg} alt="" className="w-12"/>
<h1 className="text-sm ">Submitting your ticket</h1>
 </div>
</div>
    )}
    {jackpotSucessful && (
        <div className={`h-screen  overflow-hidden  flex  items-center flex-col justify-center  fixed  z-40 left-0 w-full top-0 px-6  popup ${isJackpotSucessfulVisible ? '' : 'popup-hidden'}`}>
                  <img
         src={BackgroundPurpleImg}
         className="w-full h-full fixed  z-10 top-0" alt=""
       />
   
    <div className='flex items-center justify-center w-full relative z-50 flex-col gap-6'>
    <div className='flex flex-col items-center gap-4 justify-center'>
    <img src={confettiImg} alt=""/>
    <h1 className='text-[22px] font-semibold text-center'  >
    Congratulations!
    </h1>
    </div>
    <h1 className='text-sm text-center'>
    You have successfully entered this Jackpot. Play as many <br/> times as possible to increase your chances of winning.
    </h1>
    <div className='flex flex-col w-full items-stretch gap-6'>
      <Link to="/jackpot" onClick={PlayAgain}>
    <Button bg="#18A551"  action="Play Again" pad="8px  16px" rounded="lg"    />
    </Link>
    <Link to='/jackpot/tickets'>
    
    <Button bg="#00000000"  action="Close" pad="8px  16px" rounded="lg border border-[#737D77]"    />
    </Link>
   
    </div>
    </div>
            </div>
    )}

    </div>
  );
};

export default Pots;
