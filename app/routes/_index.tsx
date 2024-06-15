
import { useState, useEffect } from 'react';
import Loader from "./../components/loader";
import Intro from '~/components/intro';
import useForm from '~/components/hooks/useForm';
import { Navigate } from 'react-router';
import { SignedIn, SignedOut } from '@clerk/remix';
import infinityImg from "./../assets/images/infinity.gif"
import splashDarkImg from "./../assets/images/splashDark.png"
const Index = () => {
    const [showAlwaysLoader, setShowAlwaysLoader] = useState(true);
const {showIntro, setShowIntro, handleDismissIntro} =useForm();
const [showDiscoverLoader, setShowDiscoverLoader] = useState(true);
useEffect(() => {
    const timer = setTimeout(() => {
      setShowDiscoverLoader(false); 
    },10000); 

    return () => clearTimeout(timer); 
  }, []);
    useEffect(() => {
        const timer = setTimeout(() => {
          setShowAlwaysLoader(false); 
        }, 5000); 
    
        return () => clearTimeout(timer); 
      }, []);
   
    return (
        <div>
        {showAlwaysLoader ? (
          
       <Loader/>
        ) : (
     <>

     {showIntro ? (
        <Intro onDismiss={handleDismissIntro} />
      ) : (<>
        <SignedIn>
        {showDiscoverLoader ? (
  <div className="h-screen  overflow-auto">
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
      </SignedIn>
        <SignedOut><Navigate to="/create-account"/></SignedOut>
        </>
      )}
     </>
        )}
        </div>
      );
}
 
export default Index;