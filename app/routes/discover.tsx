
import type { MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import BackgroundPurpleImg from "./../assets/images/BackgroundPurple.png"
import Navbar from "~/components/navbar";
import { LoaderFunction, ActionFunction, json } from "@remix-run/node";
import { authenticator } from "utils/auth.server";
import { getXataClient } from "utils/xata";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!user) {
    return null;
  }

  const xata = getXataClient();
  const resolutions = await xata.db.resolutions.filter({ "user.id": user.id }).getMany();
  console.log("RESOLUTIONS", resolutions);
  return json({ resolutions, user });
};


export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const action = form.get('action');
  const xata = getXataClient();
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login'
  });

  switch (action) {
    case "complete": {
      const id = form.get('id');
      if (typeof id !== 'string') {
        return null;
      }
      const isCompleted = !!form.get('isCompleted');
      const resolution = await xata.db.resolutions.update(id, { isCompleted });
      return json(resolution);
    }
    case "add": {
      const year = Number(form.get('year'));
      const isCompleted = false;
      const resolution = String(form.get('resolution'));
      const newResolution = await xata.db.resolutions.create({
        year, isCompleted, resolution, user
      });
      return json(newResolution);
    }
    case "delete": {
      const id = form.get('id');
      if (typeof id !== 'string') {
        return null;
      }
      const resolution = await xata.db.resolutions.delete(id);
      return json(resolution);
    }
    case "logout": {
      return await authenticator.logout(request, { redirectTo: '/login' });
    }
    default:
      return null;
  }
}



export const meta: MetaFunction = () => {
  return [
    { title: "Discover" },
    { name: "description" },
  ];
};
export default function DiscoverLayout() {
const {user} = useLoaderData();
  return (
  <div className="h-screen  overflow-auto flex items-start">
    <Navbar user={user}/>
              <img
     src={BackgroundPurpleImg}
     className="w-full h-full fixed  z-10 top-0" alt=""
   />
   <div className="z-20 flex items-center justify-center h-full relative">

</div>
        </div>
 
  );
}

