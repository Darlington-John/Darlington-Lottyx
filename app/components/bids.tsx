// components/Bid.tsx
import {  Link } from "@remix-run/react";
import { FC } from "react";
import { Bids } from "utils/xata";

type BidProps = {
    bid: Bids
}

const Bid: FC<BidProps> = ({ bid }) => {
    return (
        <div className="bid-item">
            <Link to={bid.url} target="_blank" className="font-semibold text-xl">
                {bid.productName}
            </Link>

            <p className="text-gray-600">{`Price: $${bid.price}`}</p>
        </div>
    );
}

export default Bid;
