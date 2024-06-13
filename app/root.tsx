
import {

  Links,
  LiveReload,

  Outlet,
  Scripts,
  ScrollRestoration,


} from "@remix-run/react";
import type { MetaFunction, LinksFunction, LoaderFunction  } from "@remix-run/node";
import tailwindStyles from '~/tailwind.css'
import baseStyles from '~/styles/base.css'
import { FormProvider } from "./components/context";
import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes';
import { ClerkApp } from "@clerk/remix";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
export const loader: LoaderFunction = args => {
  return rootAuthLoader(args, ({ request }) => {
    const { sessionId, userId, getToken } = request.auth;
console.log("sessionId", sessionId);
console.log("userId", userId);
console.log("getToken", getToken);
console.log("request", request);
    return { yourData: 'here' };
  });
};
export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: tailwindStyles },
    { rel: 'stylesheet', href: baseStyles  }
  ]
}

export const meta: MetaFunction = () => {
  return [
    { title: "Graphy" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
       
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

 function App() {

  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
       
        <Links />
      </head>
      <body>
      
          <FormProvider>
        <Outlet />
        
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        </FormProvider>
     
      </body>
    </html>
  );
}

export default ClerkApp(App, {
  appearance: {
    baseTheme: [dark]
  },
});