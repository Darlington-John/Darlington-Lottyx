// components/NewBid.tsx
import { Form } from "@remix-run/react";

const NewBid = () => {
    return (
        <Form method="post" className="flex  justify-start items-center flex-col">
            <label className="font-semibold mr-2" htmlFor="productName">Product Name</label>
            <input type="text" name="productName" id="productName" className="border-2 rounded-md mr-8 px-3 py-1" required />
            
            <label className="font-semibold mr-2" htmlFor="product">Product Image URL</label>
            <input type="text" name="product" id="product" className="border-2 rounded-md mr-8 px-3 py-1" required />

            <label className="font-semibold mr-2" htmlFor="price">Price</label>
            <input type="text" name="price" id="price" className="border-2 rounded-md mr-8 px-3 py-1" required />
            
            <label className="font-semibold mr-2" htmlFor="url">Product URL</label>
            <input type="text" name="url" id="url" className="border-2 rounded-md mr-8 px-3 py-1" required />

            <button type="submit" name="action" value="addBid" className="bg-wtaorange text-white py-1 px-3 rounded-md font-semibold">
                Place Bid
            </button>
        </Form>
    );
}

export default NewBid;
