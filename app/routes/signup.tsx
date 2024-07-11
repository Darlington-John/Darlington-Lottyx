import { createCookie, type ActionFunction,  type LoaderFunction } from "@remix-run/node";
import { authenticator } from "utils/auth.server";
import bcrypt from "bcryptjs";
import { getXataClient } from "utils/xata";
import splashDarkImg from "./../assets/images/splashDark.png"
import nigImg from "./../assets/icons/nig.png"
import imageImg from '~/assets/icons/image.png'
import leftIcon from '~/assets/icons/chevron-right.png'
import arrDownImg from "./../assets/icons/arrDown.png"
import eyeOpenImg from "./../assets/icons/eyeOpen.png"
import eyeCloseImg from "./../assets/icons/eyeClose.png"
import dangerIcon from "./../assets/icons/danger.svg"
import warningIcon from "./../assets/icons/warning.svg"
import googleImg from "./../assets/icons/google.png"
import {  useCallback, useState, useRef} from 'react';
import { cloudinary } from "./../../cloudinary.server"

import { Link,  Form, json, useLoaderData, redirect } from "@remix-run/react"
const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    successRedirect: '/discover'
  });

  if (!user) {
    // Optionally return null or any data necessary for the login page
    return json({ user: null });
  }

  return json({ user });
};

const action: ActionFunction = async ({ request }) => {
  try {
    const form = await request.formData();
    const email = form.get('email') as string;
    const password = form.get('password') as string;
    const phone = form.get('phone') as string;
    const name = form.get('name') as string;
    const surname = form.get('surname') as string;
    const profileFile = form.get('profile') as File;

    const xata = getXataClient();

    // Check if user already exists
    const existingUser = await xata.db.users.filter({ email }).getFirst();
    if (existingUser) {
      return redirect("/signup?error=user-exists");
    }

    // Upload profile image to Cloudinary
    let profileUrl = '';
    if (profileFile) {
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ folder: 'profiles' }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
        const reader = profileFile.stream().getReader();
        const push = async ({ done, value }) => {
          if (done) {
            uploadStream.end();
            return;
          }
          uploadStream.write(value);
          reader.read().then(push);
        };
        reader.read().then(push);
      });

      profileUrl = uploadResult.secure_url;
    }

    // Hash password and create user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await xata.db.users.create({ email, password: hashedPassword, phone, name, surname, profile: profileUrl });

    // Redirect to login for authentication
    return redirect("/login");

  } catch (error) {
    console.error('Error in action function:', error);
    throw error;
  }
};

const Signup = () => {
  const { user } = useLoaderData();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
 
  const [errorEmailMessage, setErrorEmailMessage] = useState<string | null>(null);
  const [errorPhoneMessage, setErrorPhoneMessage] = useState<string | null>(null);
  const [errorPwdMessage, setErrorPwdMessage] = useState<string | null>(null);
  const [errorNameMessage, setErrorNameMessage] = useState<string | null>(null);
  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = (form: FormData) => {
    let valid = true;
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const phone = form.get("phone") as string;
    const name = form.get("name") as string;
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

    if (!phone || phone.trim() === '') {
      setErrorPhoneMessage('Phone number is required.');
      valid = false;
    } else if (phone.length < 10 || phone.length > 11) {
      setErrorPhoneMessage('Phone number must be between 10 and 11 digits.');
      valid = false;
    } else {
      setErrorPhoneMessage(null);
    }

    if (!password || password.trim() === '') {
      setErrorPwdMessage('Password is required.');
      valid = false;
    } else {
      setErrorPwdMessage(null);
    }
    if (!name || name.trim() === '') {
      setErrorNameMessage('Name is required.');
      valid = false;
    } else {
      setErrorNameMessage(null);
    }

    setIsFormValid(valid);
    return valid;
  };
  const handleChange = (e) => {
    const text = e.target.value;
    const onlyNumbers = text.replace(/[^0-9]/g, '');
    const newNumber = onlyNumbers.slice(0, 11);


    if (text !== newNumber) {
      setErrorPhoneMessage('Please enter only numeric values.');
    } else if (newNumber.length !== 11) {
      setErrorPhoneMessage('Number must be more than 9 digits.');
    } else {
      setErrorPhoneMessage(null);
    }
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget.form as HTMLFormElement;
    const form = new FormData(formElement);
    const isValid = validateForm(form);

    if (isValid) {
      // Trigger the form submission programmatically
      const hiddenSubmitButton = formElement.querySelector("button[type=submit]") as HTMLButtonElement;
      hiddenSubmitButton.click();
    }
  };
  const getErrorMessageStyle = (message) => {
  
    if (message === 'Please enter only numeric values.') {
      return { color: '#FF8D8D', fontSize: 12}; 
    } else if (message === 'Number must be more than 9 digits.') {
      return { color: '#F7CA18', fontSize: 12}; 
    }
    else if (message === 'Phone number is required.') {
      return { color: '#FF8D8D', fontSize: 12}; 
    } else {
      return { color: 'black', fontSize: 12}; 
    }
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click
    }
  };
  const [profileFile, setProfileFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfileFile(file); // Set the file directly
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
Create an account

</h1>
<div 
className="flex-row gap-2 flex- row flex-wrap items-center justify-center flex">
<h1 
className="text-lg  text-[#fff]  text-lg  text-center ">
Already have an account?
</h1>
<Link to="/login">
<h1 
className="text-lg  text-green     ">
Log in
</h1>
</Link>
</div>
</div>
     <Form method="post" className="px-6 gap-8 flex flex-col" encType="multipart/form-data" >
     <div 
      className="items-start gap-2 w-full  flex flex-col">

        <label htmlFor="phone" 
        className="text-base text-[#fff]">
            Phone number
        </label>
        <div  className={`w-full bg-[#2D312F]  rounded-md border  border-[#444A47] border-2 flex-row px-2 py-1 gap-2 flex  ${errorPhoneMessage === 'Please enter only numeric values.' ? 'border-[#ff8d8d]' : ''}  ${errorPhoneMessage === 'Number must be more than 9 digits.' ? 'border-[#f7ca18]' : ''} ${errorPhoneMessage === 'Phone number is required.' ? 'border-[#ff8d8d]' : ''}  $`}  >
            <div className="gap-1 items-center flex-row  pr-4 border-r-2 border-[#444A47] flex">
            <img
       alt="" src={nigImg}

   />
   <h1 className="text-[#fff]  text-base">
    +234
   </h1>

            </div>
        <input
 className="text-sm text-[#fff] w-full h-full py-1 px-2    outline-none bg-transparent bg-transparent"
 name="phone"
 type="phone"
 id="phone"
onBlur={handleChange}
    maxLength={11} 
    placeholder="Enter number (max 11 digits)"
      />
      {errorPhoneMessage? <>{errorPhoneMessage === 'Number must be more than 9 digits.' ?( <img src={warningIcon} alt="" className="w-6  h-6 self-center"/> ) : (<img src={dangerIcon} alt="" className="w-6  h-6 self-center"/>)} </> : null}

        </div>
        {errorPhoneMessage && <h1  style={getErrorMessageStyle(errorPhoneMessage)}>{errorPhoneMessage}</h1>}
        
      </div>
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
      <div className="w-full flex-row justify-between gap-2 flex items-start">
      <div className="items-start gap-1  flex-1 flex flex-col">
        <label htmlFor="name" className="text-base text-[#fff]">
         First name
        </label>
        <div className={`bg-[#2D312F]  rounded-md border   border-2 flex-row px-1 py-2 gap-2 flex items-center flex-1 w-full  ${errorNameMessage? 'border-[#ff8d8d]' : 'border-[#444A47]'}  `}>

        <input

 
className="text-sm text-[#fff]    outline-none bg-transparent w-full flex-1"
type="text"
name="name"
id="name"
      />
       {errorNameMessage && <img src={dangerIcon} alt="" className="w-4  h-4 self-center"/>}
        </div>
{errorNameMessage && <h1 className="text-[12px] text-[#ff8d8d]">{errorNameMessage}</h1>}
      </div>
      <div className="items-start gap-1 flex-1 flex flex-col">
        <label className=" text-base text-[#fff] outline-none bg-transparent" htmlFor="surname">
     Surname
        </label>
        <div className={`bg-[#2D312F]  rounded-md border   border-2 flex-row px-1 py-2 gap-2 flex flex-1 w-full    `}>

        <input

 className="text-sm text-[#fff] w-full h-full   outline-none bg-transparent flex-1"
 type="text"
name="surname"
id="surname"
      />
      
        </div>
        
      </div>
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
      <div className="items-start gap-1 w-full flex flex-col">
        <div className="flex items-center justify-between w-full  rounded-lg  h-[40px] bg-[#2D312F] px-2 border  border-[#444A47]" onClick={ handleDivClick}>
<div className="flex items-center gap-2" >
<img src={imageImg} alt=""/>
<h1>Profile image</h1>
</div>
<img src={leftIcon} alt=""/>
        </div>
        <div className={`w-full bg-[#2D312F]  rounded-md border  border-[#444A47] border-2 flex-row px-2 py-1 justify-beeen  items-center flex  hidden`}>

        <input className="text-sm text-[#fff] w-full h-full py-1 px-2   outline-none bg-transparent"
   type="file"
   accept="image/*"
   name="profile"
   onChange={handleFileChange}
   ref={fileInputRef}
/>



        </div>
        {errorPwdMessage && <h1 className="text-[12px] text-[#ff8d8d]">{errorPwdMessage}</h1>}
      </div>
      <button   type="button" 
        onClick={handleButtonClick}
        className="text-base text-[#fff] w-full  py-1 px-2  bg-[#18A551] items-center rounded-md flex justify-center text-white text-base py-2 text-center"  >
Continue
        </button>

        <button type="submit" style={{ display: "none" }}>Submit</button>
   </Form>
</div>
</div>

    );
}
 export {action, loader};
export default Signup;