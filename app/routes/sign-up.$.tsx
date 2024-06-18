// Login.tsx
// import { ActionFunction } from "@remix-run/node";
// import type {LoaderFunction} from "@remix-run/node"
// import eyeOpenImg from "./../assets/icons/eyeOpen.png"
// import eyeCloseImg from "./../assets/icons/eyeClose.png"
// import dangerIcon from "./../assets/icons/danger.svg"
// import { useState } from 'react';

// import { Form, Link } from "@remix-run/react";
// import { authenticator } from "utils/auth.server";
// import splashDarkImg from "./../assets/images/splashDark.png"
//  const loader: LoaderFunction = async ({ request }) => {
//     const user = await authenticator.isAuthenticated(request, {
//       successRedirect: '/resolutions'
//     });
  
//     if (!user) {
//       // Return any data necessary for rendering the login page, or null if no data is needed
//       return null;
//     }
  
//     // This point is reached if the user is authenticated and has been redirected
//     // The function should never actually reach here if the redirect happens correctly
//   };
// const action:ActionFunction = async ({request}) => {
//    await authenticator.authenticate("form", request, {
//     successRedirect: '/resolutions',
//     failureRedirect: '/login'
//    })
// }

// const Login = () => {
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
 
//   const [errorEmailMessage, setErrorEmailMessage] = useState<string | null>(null);
//   const [errorPwdMessage, setErrorPwdMessage] = useState<string | null>(null);
//   const handleTogglePasswordVisibility = () => {
//     setIsPasswordVisible(!isPasswordVisible);
//   };
//   const validateForm = (form: FormData) => {
//     let valid = true;
//     const email = form.get("email") as string;
//     const password = form.get("password") as string;

//     if (!email || email.trim() === '') {
//       setErrorEmailMessage('Email is required.');
//       valid = false;
//     } else {
//       const noSpaces = email.replace(/\s/g, '');
//       const isValidEmail = noSpaces.endsWith('@gmail.com') && /^[^\s@]+$/.test(noSpaces.slice(0, -10));
//       if (!isValidEmail) {
//         setErrorEmailMessage('Invalid email format. Must end with @gmail.com');
//         valid = false;
//       } else {
//         setErrorEmailMessage(null);
//       }
//     }

//     if (!password || password.trim() === '') {
//       setErrorPwdMessage('Password is required.');
//       valid = false;
//     } else {
//       setErrorPwdMessage(null);
//     }

//     return valid;
//   };
//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     const form = new FormData(event.target as HTMLFormElement);
//     const isValid = validateForm(form);

//     if (isValid) {
//       // If the form is valid, submit the form
//       await fetch("/signup", {
//         method: "POST",
//         body: form,
//       });
//     }
//   };
//     return (  
//       <div 
//       className=" flex  h-screen w-full    items-center    justify-center   overflow-auto"
//       >
//       <img
//        src={splashDarkImg}
//        className="w-full h-full fixed  z-10 top-0" alt=""
//      />
//         <div

// className="w-full gap-8 z-20   flex flex-col  ">
// <div 
// className="gap-3"
// >
// <h1 
// className="text-lg  text-[#fff]  text-[28px] font-semibold text-center">
// Log in
// </h1>
// <div 
// className="flex-row gap-2 flex- row flex-wrap items-center justify-center flex">
// <h1 
// className="text-lg  text-[#fff]  text-lg  text-center ">
// Don{`'`}t have an account?
// </h1>
// <Link to="/signup">
// <h1 
// className="text-lg  text-green     ">
// Sign up
// </h1>
// </Link>
// </div>
// </div>
// <Form method="post" onSubmit={handleSubmit}>
// <div 
// className="px-6 gap-8 flex flex-col">

//       <div className="items-start gap-2 w-full flex flex-col">
//         <label className="text-base text-[#fff]" htmlFor="email">
//          Email address
//         </label>
//         <div className={`w-full bg-[#2D312F]  rounded-md border   border-2 flex-row px-2 py-1 gap-2 flex ${errorEmailMessage? 'border-[#ff8d8d]' : 'border-[#444A47]'} `}>

//         <input className="text-sm text-[#fff] w-full h-full py-1 px-2   outline-none bg-transparent"
// type="email"
// name="email"
// id="email"
// />
//  {errorEmailMessage && <img src={dangerIcon} alt="" className="w-6  h-6 self-center"/>}

//         </div>
//         {errorEmailMessage && <h1 className="text-[#FF8D8D]  text-[12px]">{errorEmailMessage}</h1>}
//       </div>
//       <div className="items-start gap-1 w-full flex flex-col">
//         <label htmlFor="password" className="text-base text-[#fff] ">
//       Password
//         </label>
//         <div className={`w-full bg-[#2D312F]  rounded-md border  border-[#444A47] border-2 flex-row px-2 py-1 justify-beeen  items-center flex  ${errorPwdMessage  ? 'border-[#ff8d8d]' : ''}`}>

//         <input className="text-sm text-[#fff] w-full h-full py-1 px-2   outline-none bg-transparent"
//     type={isPasswordVisible ? 'text' : 'password'}
// name="password"
// id="password"
// />

//       <img
//        alt=""  src={isPasswordVisible ? eyeCloseImg : eyeOpenImg}
//   onClick={handleTogglePasswordVisibility}
// className="w-5  h-5"
//    />


//         </div>
//         {errorPwdMessage && <h1 className="text-[12px] text-[#ff8d8d]">{errorPwdMessage}</h1>}
//       </div>


//         <button  type="submit"
//         className="text-base text-[#fff] w-full  py-1 px-2  bg-[#18A551] items-center rounded-md flex justify-center text-white text-base py-2 text-center">
// Continue
//         </button>

//     </div>
// </Form>
// </div>

//      </div>

//     );
// }
//  export {action, loader};
// export default Login;




// Signup.tsx
// import type { ActionFunction,  LoaderFunction } from "@remix-run/node";
// import { authenticator } from "utils/auth.server";
// import bcrypt from "bcryptjs";
// import { getXataClient } from "utils/xata";
// import splashDarkImg from "./../assets/images/splashDark.png"
// import nigImg from "./../assets/icons/nig.png"
// import arrDownImg from "./../assets/icons/arrDown.png"
// import eyeOpenImg from "./../assets/icons/eyeOpen.png"
// import eyeCloseImg from "./../assets/icons/eyeClose.png"
// import dangerIcon from "./../assets/icons/danger.svg"
// import warningIcon from "./../assets/icons/warning.svg"
// import googleImg from "./../assets/icons/google.png"
// import { useCallback, useState, useRef } from 'react';
// import useForm from "~/components/hooks/useForm"
// import { Link, useNavigate, Form } from "@remix-run/react"
// const loader: LoaderFunction = async ({ request }) => {
//     const user = await authenticator.isAuthenticated(request, {
//       successRedirect: '/resolutions'
//     });
  
//     if (!user) {
//       // Return any data necessary for rendering the login page, or null if no data is needed
//       return null;
//     }
  
//     // This point is reached if the user is authenticated and has been redirected
//     // The function should never actually reach here if the redirect happens correctly
//   };
// const action:ActionFunction = async ({request}) => {
//     const form = await request.formData();
//     const email = form.get('email') as string;
//     const password = form.get('password') as string;
//     const phone = form.get('phone') as string;
//     const name = form.get('name') as string;
//     const surname = form.get('surname') as string;
//     const  salt = await bcrypt.genSalt(10);
//     const hashedPassword = await  bcrypt.hash(password, salt);
//     const xata = getXataClient();
//     const user = await xata.db.users.create({email, password: hashedPassword, phone, name, surname})
//     return await authenticator.authenticate("form", request, {
//         successRedirect: "/resolutions",
//         failureRedirect: "/login",
//         context: {FormData: form} 
//     })
// }

// const SignUp = () => {


//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [errorEmailMessage, setErrorEmailMessage] = useState<string | null>(null);
//   const [errorPhoneMessage, setErrorPhoneMessage] = useState<string | null>(null);
//   const [errorNameMessage, setErrorNameMessage] = useState<string | null>(null);
//   const [errorPwdMessage, setErrorPwdMessage] = useState<string | null>(null);
//   const handleTogglePasswordVisibility = () => {
//     setIsPasswordVisible(!isPasswordVisible);
//   };
//   const validateForm = (form: FormData) => {
//     let valid = true;
//     const email = form.get("email") as string;
//     const password = form.get("password") as string;
//     const phone = form.get("phone") as string;
//     const name = form.get("name") as string;

//     if (!email || email.trim() === '') {
//       setErrorEmailMessage('Email is required.');
//       valid = false;
//     } else {
//       const noSpaces = email.replace(/\s/g, '');
//       const isValidEmail = noSpaces.endsWith('@gmail.com') && /^[^\s@]+$/.test(noSpaces.slice(0, -10));
//       if (!isValidEmail) {
//         setErrorEmailMessage('Invalid email format. Must end with @gmail.com');
//         valid = false;
//       } else {
//         setErrorEmailMessage(null);
//       }
//     }

//     if (!password || password.trim() === '') {
//       setErrorPwdMessage('Password is required.');
//       valid = false;
//     } else {
//       setErrorPwdMessage(null);
//     }

//     if (!phone || phone.trim() === '') {
//       setErrorPhoneMessage('Phone number is required.');
//       valid = false;
//     } else if (phone.length < 10 || phone.length > 11) {
//       setErrorPhoneMessage('Phone number must be between 10 and 11 digits.');
//       valid = false;
//     } else {
//       setErrorPhoneMessage(null);
//     }

//     if (!name || name.trim() === '') {
//       setErrorNameMessage('Name is required.');
//       valid = false;
//     } else {
//       setErrorNameMessage(null);
//     }

//     return valid;
//   };
//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     const form = new FormData(event.target as HTMLFormElement);
//     const isValid = validateForm(form);

//     if (isValid) {
//       // If the form is valid, submit the form
//       await fetch("/signup", {
//         method: "POST",
//         body: form,
//       });
//     }
//   };
//   const handleChange = (e) => {
//     const text = e.target.value;
//     const onlyNumbers = text.replace(/[^0-9]/g, '');
//     const newNumber = onlyNumbers.slice(0, 11);


//     if (text !== newNumber) {
//       setErrorMessage('Please enter only numeric values.');
//     } else if (newNumber.length !== 11) {
//       setErrorMessage('Number must be more than 9 digits.');
//     } else {
//       setErrorMessage(null);
//     }
//   };

   
// const getErrorMessageStyle = (message) => {
  
//   if (message === 'Please enter only numeric values.') {
//     return { color: '#FF8D8D', fontSize: 12}; 
//   } else if (message === 'Number must be more than 9 digits.') {
//     return { color: '#F7CA18', fontSize: 12}; 
//   }
//   else if (message === 'Phone number is required.') {
//     return { color: '#FF8D8D', fontSize: 12}; 
//   } else {
//     return { color: 'black', fontSize: 12}; 
//   }
// };
//     return (  

//       <div 
//     className=" flex  h-screen w-full    items-center    justify-center   overflow-auto"
//     >
//     <img
//      src={splashDarkImg}
//      className="w-full h-full fixed  z-10 top-0" alt=""
//    />
//    <div

// className="w-full gap-8 z-20   flex flex-col  ">
// <div 
// className="gap-3"
// >
// <h1 
// className="text-lg  text-[#fff]  text-[28px] font-semibold text-center">
// Create account
// </h1>
// <div 
// className="flex-row gap-2 flex- row flex-wrap items-center justify-center flex">
// <h1 
// className="text-lg  text-[#fff]  text-lg  text-center ">
// Already have an account?
// </h1>
// <Link to="/login">
// <h1 
// className="text-lg  text-green     ">
// Log in
// </h1>
// </Link>
// </div>
// </div>
// <Form method="post" onSubmit={handleSubmit}>
// <div 
// className="px-6 gap-8 flex flex-col">
//       <div 
//       className="items-start gap-2 w-full  flex flex-col">
//         <label htmlFor="phone" 
//         className="text-base text-[#fff]">
//             Phone number
//         </label>
//         <div  className={`w-full bg-[#2D312F]  rounded-md border  border-[#444A47] border-2 flex-row px-2 py-1 gap-2 flex  ${errorMessage === 'Please enter only numeric values.' ? 'border-[#ff8d8d]' : ''}  ${errorMessage === 'Number must be more than 9 digits.' ? 'border-[#f7ca18]' : ''} ${errorMessage === 'Phone number is required.' ? 'border-[#ff8d8d]' : ''}  ${errorPhoneMessage ? 'border-[#ff8d8d]' : ''}`}  >
//             <div className="gap-1 items-center flex-row  pr-4 border-r-2 border-[#444A47] flex">
//             <img
//        alt="" src={nigImg}

//    />
//    <h1 className="text-[#fff]  text-base">
//     +234
//    </h1>

//             </div>
//         <input
//  className="text-sm text-[#fff] w-full h-full py-1 px-2    outline-none bg-transparent bg-transparent"
//  name="phone"
//  type="phone"
//  id="phone"
// onBlur={handleChange}
//     maxLength={11} 
//     placeholder="Enter number (max 11 digits)"
//       />
//       {errorMessage? <>{errorMessage === 'Number must be more than 9 digits.' ?( <img src={warningIcon} alt="" className="w-6  h-6 self-center"/> ) : (<img src={dangerIcon} alt="" className="w-6  h-6 self-center"/>)} </> : null}

//         </div>
//         {errorMessage && <h1  style={getErrorMessageStyle(errorMessage)}>{errorMessage}</h1>}
//         {errorPhoneMessage && <h1 className="text-[#FF8D8D]  text-[12px]">Phone number is required.</h1>}
//       </div>
//       <div className="items-start gap-2 w-full flex flex-col">
//         <label className="text-base text-[#fff]" htmlFor="email">
//          Email address
//         </label>
//         <div className={`w-full bg-[#2D312F]  rounded-md border   border-2 flex-row px-2 py-1 gap-2 flex ${errorEmailMessage? 'border-[#ff8d8d]' : 'border-[#444A47]'} `}>

//         <input className="text-sm text-[#fff] w-full h-full py-1 px-2   outline-none bg-transparent"
// type="email"
// name="email"
// id="email"
// />
//  {errorEmailMessage && <img src={dangerIcon} alt="" className="w-6  h-6 self-center"/>}

//         </div>
//         {errorEmailMessage && <h1 className="text-[#FF8D8D]  text-[12px]">{errorEmailMessage}</h1>}
//       </div>
//       <div className="w-full flex-row justify-between gap-2 flex items-start">
//       <div className="items-start gap-1  flex-1 flex flex-col">
//         <label htmlFor="name" className="text-base text-[#fff]">
//          First name
//         </label>
//         <div className={`bg-[#2D312F]  rounded-md border   border-2 flex-row px-1 py-2 gap-2 flex items-center flex-1 w-full  ${errorNameMessage? 'border-[#ff8d8d]' : 'border-[#444A47]'}  `}>

//         <input

 
// className="text-sm text-[#fff]    outline-none bg-transparent w-full flex-1"
// type="text"
// name="name"
// id="name"
//       />
//        {errorNameMessage && <img src={dangerIcon} alt="" className="w-4  h-4 self-center"/>}
//         </div>
// {errorNameMessage && <h1 className="text-[12px] text-[#ff8d8d]">{errorNameMessage}</h1>}
//       </div>
//       <div className="items-start gap-1 flex-1 flex flex-col">
//         <label className=" text-base text-[#fff] outline-none bg-transparent" htmlFor="surname">
//      Surname
//         </label>
//         <div className={`bg-[#2D312F]  rounded-md border   border-2 flex-row px-1 py-2 gap-2 flex flex-1 w-full    `}>

//         <input

//  className="text-sm text-[#fff] w-full h-full   outline-none bg-transparent flex-1"
//  type="text"
// name="surname"
// id="surname"
//       />
      
//         </div>
        
//       </div>
//       </div>
//       <div className="items-start gap-1 w-full flex flex-col">
//         <label htmlFor="password" className="text-base text-[#fff] ">
//       Password
//         </label>
//         <div className={`w-full bg-[#2D312F]  rounded-md border  border-[#444A47] border-2 flex-row px-2 py-1 justify-beeen  items-center flex  ${errorPwdMessage  ? 'border-[#ff8d8d]' : ''}`}>

//         <input className="text-sm text-[#fff] w-full h-full py-1 px-2   outline-none bg-transparent"
//     type={isPasswordVisible ? 'text' : 'password'}
// name="password"
// id="password"
// />

//       <img
//        alt=""  src={isPasswordVisible ? eyeCloseImg : eyeOpenImg}
//   onClick={handleTogglePasswordVisibility}
// className="w-5  h-5"
//    />


//         </div>
//         {errorPwdMessage && <h1 className="text-[12px] text-[#ff8d8d]">{errorPwdMessage}</h1>}
//       </div>


//         <button  type="submit"
//         className="text-base text-[#fff] w-full  py-1 px-2  bg-[#18A551] items-center rounded-md flex justify-center text-white text-base py-2 text-center">
// Continue
//         </button>

//     </div>
// </Form>
// <div  className="px-6 gap-4 items-center flex flex-col">
// <h1 className="text-white text-xs">- OR CREATE ACCOUNT WITH -</h1>

// <Link to="/sign-in" className="w-full">
// <div className="w-full bg-[#C0F8D6] p-4 items-center justify-center gap-2 flex-row rounded-md flex">
//       <img
//        alt="" src={googleImg}
//   className="w-5  h-5"
//    /> 
//    <h1  className="text-base text-[#05662C] font-semibold">   Google</h1>

// </div>
// </Link>
// </div>
// </div>

//    </div>

//     );
// }
//  export {action, loader};
// export default SignUp;git reset --hard rin/main
