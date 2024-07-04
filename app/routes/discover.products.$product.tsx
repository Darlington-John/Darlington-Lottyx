import { useLoaderData, Link, Form, useSubmit } from '@remix-run/react';
import { json, LoaderFunction, ActionFunction } from '@remix-run/node';
import { categories } from '~/components/data/categories';
import { hotproducts } from '~/components/data/hot-products';
import {  useEffect, useRef, useState } from 'react';
import coinImg from '~/assets/icons/coin.png'
import { useKeenSlider } from "keen-slider/react.js"
import informationImg from "~/assets/images/information.png"
import confettiImg from '~/assets/images/Confetti.png'
import "keen-slider/keen-slider.min.css"
import Cards from '~/components/cards';
import xIcon from  '~/assets/icons/close.png'
import winnerImg from '~/assets/images/winners.png'
import Button from '~/components/buttons';
import Popup from '~/components/popup';
import useForm from '~/components/hooks/useForm';
import BackgroundPurpleImg from '~/assets/images/BackgroundPurple.png';
import { getXataClient } from "utils/xata";
import { authenticator } from "utils/auth.server";


export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const action = form.get('action');
  const xata = getXataClient();
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login'
  });

  switch (action) {
    case "addBid": {
      const productName = form.get('productName');
      const product = form.get('product');
      const price = Number(form.get('price'));
      const url = form.get('url');
      const bidCode = Number(form.get('bidCode'));
      const editBidCode = Number(form.get('editBidCode'));
      if (typeof productName !== 'string' || typeof product !== 'string' || isNaN(price) || typeof url !== 'string') {
        return null;
      }

      const newBid = await xata.db.bids.create({
        productName,
        product,
        price,
        url,
        bidCode,
        editBidCode,
        user
      });

      return json(newBid);
    }
    default:
      return null;
  }
};


export const loader: LoaderFunction = async ({ params , request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!user) {
    return null;
  }

  const xata = getXataClient();
  const bids = await xata.db.bids.filter({ "user.id": user.id }).getMany();
  const productUrl = params.product; 
  const products = [...categories, ...hotproducts];

  const product = products.find((product) => product.url === productUrl);

  if (!product) {
    return json(
      { message: 'product not found' },
      { status: 404 }
    );
  }

  return json({
   product,bids, user 
  });
};

const ProductPage = () => {
  const {mainNumbers} = useForm();
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false);
  const {togglePopup, isUnderstood, toggleBid,bidding, resetNumbers, generateLottoNumbers, isSpinning} = useForm();
  const [editBidCode, setEditBidCode] = useState("");
  const [reflectInput, setReflectInput] = useState("");

  const handleEditBidCodeChange = (event) => {
    setEditBidCode(event.target.value);
    setReflectInput(event.target.value); // Pass the value to reflectInput
  };
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })
  const submit = useSubmit();


  const handleClick = () => {
 
    toggleSucessPopup();
    resetNumbers();

    const formId = "bidForm";
    const form = document.getElementById(formId);
    const actionInput = form.querySelector('input[name="action"]');
    if (form && actionInput) {
      actionInput.value = "addBid";
      submit(form);
    }
  };


    const { product } = useLoaderData<{ product }>();
    const [lineClamped, setLineClamed] = useState(true);
    
    const readMore = () => {
      setLineClamed(prevState => !prevState);
    };
    const [isSucessful, setIsSucessful] = useState(false);
    const [isSucessVisible, setIsSucessVisible] = useState(false);
 
    const [editBid, setEditBid] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const editRef = useRef(null);
    const toggleEditPopup = () => {
      if (!editBid) {
        setEditBid(true);
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setTimeout(() => setEditBid(false), 500);
      }
      
    };
    const toggleSucessPopup = () => {
setEditBid(false);
      if(!isSucessful){
      setIsSucessful(true);
      setIsSucessVisible(true);
    }
      else{
        setIsSucessVisible(false);
        setTimeout(()=> setIsSucessful(false),500)
      }
    };
    const handleClickOutside = (event) => {
      if (editRef.current && !editRef.current.contains(event.target)) {
        setIsVisible(false);
        setTimeout(() => setEditBid(false), 500);
      }
      
    };
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
    return ( 
     
      <div className='flex items-start justify-between flex-col gap-1'>

<div className="hidden ">
      <div>
      <Form method="post"  id="bidForm">
            <input type="text" name="productName" id="productName" className="border-2 rounded-md mr-8 px-3 py-1"   value={product?.name} readOnly/>
            <input type="text" name="product" id="product" className="border-2 rounded-md mr-8 px-3 py-1"   value={product?.imgName} readOnly/>
            <input type="text" name="price" id="price" className="border-2 rounded-md mr-8 px-3 py-1"   value={product?.price} readOnly/>
            <input type="text" name="bidCode" id="bidCode" className="border-2 rounded-md mr-8 px-3 py-1"   value={mainNumbers} readOnly/>
            <input type="text" name="editBidCode" id="editBidCode" className="border-2 rounded-md mr-8 px-3 py-1"   value={reflectInput} readOnly/>
            <input type="text" name="url" id="url" className="border-2 rounded-md mr-8 px-3 py-1"  value={product?.url}  readOnly/>
            <input type="hidden" name="action" id="action" value=""  readOnly/>
        </Form>
      </div>
    </div>
        <div className='flex flex-col gap-2 items-start'>
        <h1 className='font-semibold text-[22px] leading-[22px]' >{product ?.name}</h1>
        <h1 className={`text-sm  leading-[20px]     ${lineClamped ? 'line-clamp-2' : 'line-clamp-none'}`}>
        {product ?.feature}
        </h1>
        <button className='text-[10px] p-2 border border-[#737D77] rounded-lg'  onClick={readMore}>
          {lineClamped? 'Read more': 'Read less'}
          
        </button>
        </div>
        <div className='' style={{width: 'calc(100vw - 40px)' }}>

      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider flex">
          <div className="keen-slider__slide "><img src={product?.firstView} alt="" className='w-[350px] h-[235px] rounded-2xl object-cover'/></div>
          <div className="keen-slider__slide "><img src={product?.secondView} alt="" className='w-[350px] h-[235px] rounded-2xl object-cover'/></div>
          <div className="keen-slider__slide "><img src={product?.thirdView} alt="" className='w-[350px] h-[235px] rounded-2xl object-cover'/></div>

      
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
      {loaded && instanceRef.current && (
        <div className="dots">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx)
                }}
                className={"dot " + (currentSlide === idx ? " active" : "")}
              ></button>
            )
          })}
        </div>
      )}

</div>

<Cards  background={winnerImg} annoucement   countdown herobg place="center" winAnnouce annouce='Winners will be announced in'   />

<div className='flex flex-col gap-2 w-full'>
<div className='py-1 items-center gap-1 flex w-full justify-center relative overflow-hidden'>
  <div className='absolute z-10 bg-white left-0 p-9  blur-3xl  puff'>

  </div>
<img src={coinImg} className='w-[32px] h-[32px] relative z-20 ' alt=""/>
<h1 className='text-[34px] font-semibold relative z-20'>
{product?.price}

</h1>

  
</div>
<Button bg="#18A551"  action="Generate Bidding Code" pad="8px  16px" rounded="lg"  onClick={isUnderstood === true ? toggleBid : togglePopup} />
</div>
{bidding ? <Popup slide info  infoText="Your bidding code" bidWorks action sucess={mainNumbers === '000000' ? 'Generate a bidding code' : (isSpinning ? 'Generating' : `Place Bid with ${product?.price} coins`)}   onClick={mainNumbers === '000000' ? generateLottoNumbers : handleClick}  value="addBid" editClick={toggleEditPopup}/> : <Popup slide info infoImg={informationImg} infoText="Here’s how bidding works" bidWorks action sucess="I Understand" onClick={togglePopup}/> }
{editBid && (
  <div className={`fixed bottom-[61px]  h-full w-full  z-30 left-0 flex  justify-center  items-center        backdrop-brightness-50  px-8`}>
    <div className={`w-full p-3 bg-[#2D312F] h-auto rounded-2xl relative overflow-hidden   items-stretch  gap-5  px-3 py-3 flex flex-col  popup duration-300 ease-in-out ${isVisible ? '' : 'popup-hidden'}`} ref={editRef} >
    <div className='w-full absolute  top-0 left-0 bg-[#fff]  p-1.5 blur-2xl'></div>
<div className='flex flex-col p-3 w-full items-stretch  text-center gap-5 relative'>

<h1 className='text-sm font-semibold text-center'>Edit your code </h1>
<div className='flex w-full flex-col gap-2 text-sm'>
  <h1>Enter a 6-digit code for this bid</h1>
  <div className={`w-full bg-[#2D312F]  rounded-md border   border-2 border-[#444A47] flex-row px-2 py-1 gap-2 flex  `}>
<Form >
<input className="text-sm text-[#fff] w-full h-full py-1 px-2   outline-none bg-transparent " placeholder={mainNumbers ==="000000" ? 'Enter a code' : mainNumbers}
type="text"
maxLength={6}
value={editBidCode}
onChange={handleEditBidCodeChange}
/>

<input type="hidden" name="action" id="action" value="" />
</Form>
</div>
</div>
<Button bg="#18A551"  action="Save" pad="8px  16px" rounded="lg"  onClick={ editBidCode==='' ? null  : handleClick}  />
<button className='text-sm font-semibold text-center' onClick={toggleEditPopup}>cancel </button>
</div>
    </div>
  </div>
)}
{isSucessful && (
    <div className={`h-screen  overflow-hidden  flex  items-center flex-col justify-center  fixed  z-40 left-0 w-full top-0 px-6  popup ${isSucessVisible ? '' : 'popup-hidden'}`}>
              <img
     src={BackgroundPurpleImg}
     className="w-full h-full fixed  z-10 top-0" alt=""
   />
   <button className='fixed top-20 z-50 left-0 -translate-x-2/4  left-[50%] bg-[#00000040]  rounded-md py-1 px-2 flex gap-1 text-sm items-center' onClick={toggleSucessPopup}><img src={xIcon} alt=""/><span>Close</span></button>
<div className='flex items-center justify-center w-full relative z-50 flex-col gap-6'>
<div className='flex flex-col items-center gap-4 justify-center'>
<img src={confettiImg} alt=""/>
<h1 className='text-[22px] font-semibold text-center'  >
You’ve entered the draw
</h1>
</div>
<h1 className='text-sm text-center'>
You’ve successfully placed a bid on this product.<br/>
To stand a better chance of winning, bid as many times as you can for this product.
</h1>
<div className='flex flex-col w-full items-stretch gap-6'>
<Button bg="#18A551"  action="Bid Again" pad="8px  16px" rounded="lg"   onClick={toggleSucessPopup} />
<Link to='/bids'>

<Button bg="#00000000"  action="See all your bids" pad="8px  16px" rounded="lg border border-[#737D77]"    />
</Link>
</div>
</div>
        </div>
)}
        </div>
     );
}
function Arrow(props) {
  const disabled = props.disabled ? " arrow--disabled" : ""
  return (

    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>

  )
}
export default ProductPage;