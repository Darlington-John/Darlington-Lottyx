import { ActionFunction } from "@remix-run/node";
import type {LoaderFunction} from "@remix-run/node"
import { Form, Link } from "@remix-run/react";
import { authenticator } from "utils/auth.server";
import splashDarkImg from "./../assets/images/splashDark.png"
import eyeOpenImg from "./../assets/icons/eyeOpen.png"
import eyeCloseImg from "./../assets/icons/eyeClose.png"
import dangerIcon from "./../assets/icons/danger.svg"
import { useState } from 'react';
 const loader: LoaderFunction = async ({ request }) => {
    const user = await authenticator.isAuthenticated(request, {
      successRedirect: '/acct-setup'
    });
  
    if (!user) {

      return null;
    }

  };
const action:ActionFunction = async ({request}) => {
   await authenticator.authenticate("form", request, {
    successRedirect: '/acct-setup',
    failureRedirect: '/login'
   })
}

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
 
  const [errorEmailMessage, setErrorEmailMessage] = useState<string | null>(null);
  const [errorPwdMessage, setErrorPwdMessage] = useState<string | null>(null);

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = (form: FormData) => {
    let valid = true;
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    if (!email || email.trim() === '') {
      setErrorEmailMessage('Email is required.');
      valid = false;
    } else {
      const noSpaces = email.replace(/\s/g, '');
      const isValidEmail = noSpaces.endsWith('@gmail.com') && /^[^\s@]+$/.test(noSpaces.slice(0, -10));
      if (!isValidEmail) {
        setErrorEmailMessage('Invalid email format. Must end with @gmail.com');
        valid = false;
      } else {
        setErrorEmailMessage(null);
      }
    }

    if (!password || password.trim() === '') {
      setErrorPwdMessage('Password is required.');
      valid = false;
    } else {
      setErrorPwdMessage(null);
    }

    setIsFormValid(valid);
    return valid;
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const formElement = event.currentTarget.form as HTMLFormElement;
    const form = new FormData(formElement);
    const isValid = validateForm(form);

    if (isValid) {

      event.currentTarget.setAttribute('type', 'submit');
      formElement.submit();
    }
  };
    return (  
      <div 
      className=" flex  h-screen w-full    items-center    justify-center   overflow-auto"
      >
      <img
       src={splashDarkImg}
       className="w-full h-full fixed  z-10 top-0" alt=""
     />
        <div

className="w-full gap-8 z-20   flex flex-col  ">
  <div 
className="gap-3"
>
<h1 
className="text-lg  text-[#fff]  text-[28px] font-semibold text-center">
Log in
</h1>
<div 
className="flex-row gap-2 flex- row flex-wrap items-center justify-center flex">
<h1 
className="text-lg  text-[#fff]  text-lg  text-center ">
Don{`'`}t have an account?
</h1>
<Link to="/signup">
<h1 
className="text-lg  text-green     ">
Sign up
</h1>
</Link>
</div>
</div>
     <Form method="post" className="px-6 gap-8 flex flex-col" >
     <div className="items-start gap-2 w-full flex flex-col">
        <label className="text-base text-[#fff]" htmlFor="email">
         Email address
        </label>
        <div className={`w-full bg-[#2D312F]  rounded-md border   border-2 flex-row px-2 py-1 gap-2 flex ${errorEmailMessage? 'border-[#ff8d8d]' : 'border-[#444A47]'} `}>

        <input className="text-sm text-[#fff] w-full h-full py-1 px-2   outline-none bg-transparent"
type="email"
name="email"
id="email"
/>
 {errorEmailMessage && <img src={dangerIcon} alt="" className="w-6  h-6 self-center"/>}

        </div>
        {errorEmailMessage && <h1 className="text-[#FF8D8D]  text-[12px]">{errorEmailMessage}</h1>}
      </div>
      <div className="items-start gap-1 w-full flex flex-col">
        <label htmlFor="password" className="text-base text-[#fff] ">
      Password
        </label>
        <div className={`w-full bg-[#2D312F]  rounded-md border  border-[#444A47] border-2 flex-row px-2 py-1 justify-beeen  items-center flex  ${errorPwdMessage  ? 'border-[#ff8d8d]' : ''}`}>

        <input className="text-sm text-[#fff] w-full h-full py-1 px-2   outline-none bg-transparent"
    type={isPasswordVisible ? 'text' : 'password'}
name="password"
id="password"
/>

      <img
       alt=""  src={isPasswordVisible ? eyeCloseImg : eyeOpenImg}
  onClick={handleTogglePasswordVisibility}
className="w-5  h-5"
   />


        </div>
        {errorPwdMessage && <h1 className="text-[12px] text-[#ff8d8d]">{errorPwdMessage}</h1>}
      </div>
      <button   type="button" onClick={handleButtonClick}
        className="text-base text-[#fff] w-full  py-1 px-2  bg-[#18A551] items-center rounded-md flex justify-center text-white text-base py-2 text-center"  >
Continue
        </button>
   </Form>
</div>
</div>

    );
}
 export {action, loader};
export default Login;