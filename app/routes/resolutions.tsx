
import { Form, Link, useLoaderData } from "@remix-run/react";
import { LoaderFunction, ActionFunction, json } from "@remix-run/node";

import Resolution from "~/components/resolutions";
import NewResolution from "~/components/new-resolution";
import { getXataClient } from "utils/xata";
import { authenticator } from "utils/auth.server";


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


const ResolutionPage = () => {
  const { resolutions, user } = useLoaderData();

  return (
    <div className="flex items-center justify-center bg-lightOrange text-4xl h-screen w-full text-wtaorange">
      <Link to="/resolutions">
        <h1>{user.phone}</h1>
      </Link>
      <Form method="post">
        <button type="submit"
          name="action"
          value='logout'
          className="bg-white text-wtaorange p-2">
          Logout
        </button>
      </Form>
      <div className="grid grid-flow-row gap-y-10">
        <NewResolution />
        <div className="grid grid-cols-[repeat(4,auto)] justify-start items-center gap-x-8 gap-y-4">
          {resolutions.length === 0 ? (
            <p className="text-darkOrange text-2xl">{`You made no resolutions!`}</p>
          ) : (
            resolutions.map((resolution) => {
              return <Resolution key={resolution.id} resolution={resolution} />
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default ResolutionPage;
