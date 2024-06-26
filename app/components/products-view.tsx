import Cards from "./cards";



const ProductsView = (props: any) => {
    const products = props.products || [];
    return ( <div className="flex flex-col items-start w-full gap-4">
<h1 className="text-[17px] font-semibold">{props.header}</h1>
<div className={`flex gap-2 items-start overflow-scroll w-${props.width} flow   ${props.wrap} `} style={{ paddingRight: `${props.pad}`}}>
    {products.map((data, index)=> (
        <Cards  products={true}  key={index} data={data} {...data}  pWidth={props.pWidth} link={`/discover/products/${data.url}`}/>
    ))}

</div>
    </div> );
}
 
export default ProductsView;