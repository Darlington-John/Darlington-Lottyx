// // import React from 'react';
// // import { json } from '@remix-run/node';
// // import { useLoaderData } from '@remix-run/react';
// // import { authenticator } from 'utils/auth.server';
// // import { getXataClient } from 'utils/xata';

// // // Import all possible images statically
// // import camera from './../assets/images/camera.png';
// // import product1Image from './../assets/images/Splash.png';
// // import product2Image from './../assets/images/bottle.png';
// // // Import other images as needed

// // // Create a mapping object for images
// // const imageMapping = {
// //   camera: camera,
// //   product1: product1Image,
// //   product2: product2Image,
// //   // Add more products as needed
// // };

// // // Utility function to get the image path
// // const getImagePath = (product) => {
// //   return imageMapping[product] || camera; // Return the mapped image or a default image
// // };

// // export const loader = async ({ request }) => {
// //   const user = await authenticator.isAuthenticated(request, {
// //     failureRedirect: '/login',
// //   });

// //   if (!user) {
// //     return null;
// //   }

// //   const xata = getXataClient();
// //   const resolutions = await xata.db.resolutions.filter({ 'user.id': user.id }).getMany();
// //   const bids = await xata.db.bids.filter({ 'user.id': user.id }).getMany();

// //   console.log('BIDS', bids);
// //   console.log('RESOLUTIONS', resolutions);

// //   return json({ resolutions, user, bids });
// // };

// // const Bids = () => {
// //   const { resolutions, user, bids } = useLoaderData();

// //   return (
// //     <>
// //       <h1 className="text-white text-5xl">Hello {resolutions.resolution}</h1>

// //       {bids.length === 0 ? (
// //         <p className="text-darkOrange text-2xl">{`You made no bids!`}</p>
// //       ) : (
// //         bids.map((bid) => (
// //           <div key={bid.id}>
// //             <h1>{bid.product}</h1>
// //             <img src={getImagePath(bid.product)} alt="" />
// //             {/* Use getImagePath to dynamically load images based on bid.product */}
// //           </div>
// //         ))
// //       )}
// //     </>
// //   );
// // };

// // export default Bids;


// // routes/bids.tsx
// import { Form, Link, useLoaderData } from "@remix-run/react";
// import { LoaderFunction, ActionFunction, json } from "@remix-run/node";

// import NewBid from "~/components/new-bid";
// import { getXataClient } from "utils/xata";
// import { authenticator } from "utils/auth.server";
// import Bid from "~/components/bids";

// export const loader: LoaderFunction = async ({ request }) => {
//   const user = await authenticator.isAuthenticated(request, {
//     failureRedirect: '/login',
//   });

//   if (!user) {
//     return null;
//   }

//   const xata = getXataClient();
//   const bids = await xata.db.bids.filter({ "user.id": user.id }).getMany();
//   return json({ bids, user });
// };

// export const action: ActionFunction = async ({ request }) => {
//   const form = await request.formData();
//   const action = form.get('action');
//   const xata = getXataClient();
//   const user = await authenticator.isAuthenticated(request, {
//     failureRedirect: '/login'
//   });

//   switch (action) {
//     case "addBid": {
//       const productName = form.get('productName');
//       const product = form.get('product');
//       const price = form.get('price');
//       const url = form.get('url');

//       // if (typeof productName !== 'string' || typeof product !== 'string' || isNaN(price) || typeof url !== 'string') {
//       //   return null;
//       // }

//       const newBid = await xata.db.bids.create({
//         productName,
//         product,
//         price,
//         url,
//         user
//       });

//       return json(newBid);
//     }
//     default:
//       return null;
//   }
// };

// const BidsPage = () => {
//   const { bids, user } = useLoaderData();

//   return (
//     <div className="flex items-center justify-center bg-lightOrange text-4xl h-screen w-full text-wtaorange">
//       <Link to="/bids">
//         <h1>{user.phone}</h1>
//       </Link>
//       <Form method="post">
//         <button type="submit" name="action" value='logout' className="bg-white text-wtaorange p-2">Logout</button>
//       </Form>
//       <div className="grid grid-flow-row gap-y-10">
//         <NewBid />
//         <div className="grid grid-cols-[repeat(4,auto)] justify-start items-center gap-x-8 gap-y-4">
//           {bids.length === 0 ? (
//             <p className="text-darkOrange text-2xl">{`No bids placed!`}</p>
//           ) : (
//             bids.map((bid) => {
//               return <Bid key={bid.id} bid={bid} />
//             })
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BidsPage;
