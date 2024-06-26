// components/Bid.tsx
import { Form, Link } from "@remix-run/react";
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
            {/* <img src={bid.product} alt={bid.productName} className="w-20 h-20" /> */}
            <p className="text-gray-600">{`Price: $${bid.price}`}</p>
        </div>
    );
}

export default Bid;
