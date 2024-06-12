
import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import BackgroundPurpleImg from "./../assets/images/BackgroundPurple.png"
import Navbar from "~/components/navbar";



export const meta: MetaFunction = () => {
  return [
    { title: "Discover" },
    { name: "description" },
  ];
};
export default function DiscoverLayout() {

  return (
  <div className="h-screen  overflow-auto flex items-start">
    <Navbar/>
              <img
     src={BackgroundPurpleImg}
     className="w-full h-full fixed  z-10 top-0" alt=""
   />
   <div className="z-20 flex items-center justify-center h-full relative">

</div>
        </div>
 
  );
}

