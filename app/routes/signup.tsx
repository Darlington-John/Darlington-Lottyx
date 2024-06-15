import type { ActionFunction,  LoaderFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { authenticator } from "utils/auth.server";
import bcrypt from "bcryptjs";
import { getXataClient } from "utils/xata";

const loader: LoaderFunction = async ({ request }) => {
    const user = await authenticator.isAuthenticated(request, {
      successRedirect: '/resolutions'
    });
  
    if (!user) {
      // Return any data necessary for rendering the login page, or null if no data is needed
      return null;
    }
  
    // This point is reached if the user is authenticated and has been redirected
    // The function should never actually reach here if the redirect happens correctly
  };
const action:ActionFunction = async ({request}) => {
    const form = await request.formData();
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    const  salt = await bcrypt.genSalt(10);
    const hashedPassword = await  bcrypt.hash(password, salt);
    const xata = getXataClient();
    const user = await xata.db.users.create({email, password: hashedPassword})
    return await authenticator.authenticate("form", request, {
        successRedirect: "/resolutions",
        failureRedirect: "/login",
        context: {FormData: form} 
    })
}

const SignUp = () => {
    return (  
   <Form method="post" className="p-10 text-center text-white text-base">
<h1 className="text-xl">
Welcome! Sign Up
</h1>
<p>
Already have acct
<Link to="/login" >
Login
</Link>
</p>
<label htmlFor="email">
Email
</label>
<input className="border border-2 rounded-md border-wtaorange  text-wtaorange p-2"
type="email"
name="email"
id="email"
/>
<label htmlFor="password">
Password
</label>
<input className="border border-2 rounded-md border-wtaorange  text-wtaorange p-2"
type="password"
name="password"
id="password"
/>
<button
type="submit"
className="bg-wtaorange text-white p-2"
>
SignUp
</button>
   </Form>
    );
}
 export {action, loader};
export default SignUp;