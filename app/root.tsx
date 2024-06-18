
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
import { rootAuthLoader } from "@clerk/remix/ssr.server";
// Import ClerkApp
import { ClerkApp } from "@clerk/remix";
export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: tailwindStyles },
    { rel: 'stylesheet', href: baseStyles  }
  ]
}

export const meta: MetaFunction = () => {
  return [
    { title: "Lotty" },
  ];
};

export const loader: LoaderFunction = (args) => rootAuthLoader(args);

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


export default ClerkApp(App);