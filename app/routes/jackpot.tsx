
import type { MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData, useLocation } from "@remix-run/react";
import BackgroundPurpleImg from "./../assets/images/BackgroundPurple.png"
import Navbar from "~/components/navbar";
import { LoaderFunction,  json } from "@remix-run/node";
import { authenticator } from "utils/auth.server";
import { getXataClient } from "utils/xata";
import BottomBar from "~/components/bottom-bar";

import useForm from "~/components/hooks/useForm";

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





export const meta: MetaFunction = () => {
  return [
    { title: "Jackpot" },
    { name: "description" },
  ];
};

export default function JackpotLayout() {
const {user, pots} = useLoaderData();
const {handlePotsSubmit, resetToDefault, togglePayPopup} = useForm();
const location = useLocation();
  return (
  <div className="h-screen  overflow-hidden  flex items-start flex-col justify-between">
    
    <Navbar user={user}  handleClick={togglePayPopup} cancel={resetToDefault}/>
              <img
     src={BackgroundPurpleImg}
     className="w-full h-full fixed  z-10 top-0" alt=""
   />

   <div className={`z-20 flex  h-full  relative w-full px-5 py-3  overflow-x-hidden  ${location.pathname === '/jackpot/play' ? 'overflow-y-hidden' : 'overflow-y-auto'}`} style={{ height: 'calc(100% - 137px)' }}>
<Outlet />
</div>
<BottomBar pots={pots}/>
        </div>
 
  );
}

