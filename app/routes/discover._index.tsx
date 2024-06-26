import Cards from "~/components/cards";
import styleImg from "~/assets/images/style.png"
import smileMan  from "~/assets/images/smile-man.png"
import { useState } from "react";
import ProductsView from "~/components/products-view";
import { hotproducts} from "~/components/data/hot-products";
import { categories } from "~/components/data/categories";

const Discover = () => {
    const [showInfo, setShowInfo] = useState(true);
    const hideInfo = () => {
        setShowInfo(false);
      };
    return ( <div className="w-full flex flex-col  gap-5" >
   {showInfo && (       <Cards  background={styleImg} annoucement  close  info="NEXT JACKPOT IN…" countdown  herobg  hero={smileMan} onClick={hideInfo} moreInfo/>)}
<ProductsView products={hotproducts} header='These products are  hot!'  pad="24px" width="screen"   pWidth="170px"/>
<ProductsView products={categories} header='Product categories' wrap="flex-wrap grid grid-cols-2  justify-between" width="full" pWidth=""   pad="0" />
    </div> );
}
 
export default Discover;