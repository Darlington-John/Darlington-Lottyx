import splashDarkImg from "./../assets/images/splashDark.png"
import infinityImg from "./../assets/images/infinity.gif"
import { Navigate } from 'react-router';
import { useEffect, useState } from "react";
const AcctSetup = () => {
    const [showDiscoverLoader, setShowDiscoverLoader] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
          setShowDiscoverLoader(false); 
        }, 5000); 
        return () => clearTimeout(timer); 
      }, []);
    return ( <div 
        className=" flex  h-screen w-full    items-center    justify-center   overflow-auto"
        >
        <img
         src={splashDarkImg}
         className="w-full h-full fixed  z-10 top-0" alt=""
       /> 

      
      {showDiscoverLoader ? (
<div className="h-screen  overflow-auto relative z-20">
<img
src={splashDarkImg}
className="w-full h-full fixed  z-10 top-0" alt=""
/>
<div className="z-20 flex items-center justify-center h-full relative">
<div className="flex flex-col gap-2 items-center justify-center w-full px-16 ">
  <img src={infinityImg} className="w-20" alt=""/>
  <h1 className="text-[34px] text-white font-semibold text-center ">Setting  up your account</h1>
</div>
</div>
</div>
) : (
<Navigate to="/discover"/>

)}

       </div>
       );
}
 
export default AcctSetup;