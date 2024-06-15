import { ActionFunction } from "@remix-run/node";
import type {LoaderFunction} from "@remix-run/node"
import { Form, Link } from "@remix-run/react";
import { authenticator } from "utils/auth.server";
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
   await authenticator.authenticate("form", request, {
    successRedirect: '/resolutions',
    failureRedirect: '/login'
   })
}

const Login = () => {
    return (  
   <Form method="post" className="p-10 text-center text-white text-base">
<h1 className="text-xl">
Welcome! Login to continue
</h1>
<p>
Need to create acct
<Link to="/signup" >
Signup
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
Login
</button>
   </Form>
    );
}
 export {action, loader};
export default Login;