import { Form, Link, useSubmit } from "@remix-run/react";
import { ChangeEventHandler, FC } from "react";
import { Resolutions } from "utils/xata";

type ResolutionProps = {
    resolution: Resolutions
}
const Resolution: FC<ResolutionProps> =({resolution}) =>{
    const  submit = useSubmit();
    const handleChange: ChangeEventHandler<HTMLFormElement> = event => {
submit(event.currentTarget)
    }
    return (
        <div>
            {/* <p>  {resolution.isCompleted.toString()}</p>
         <p>{resolution.resolution}</p>
         <p>{resolution.year}</p> */}
         <Link className="font-semibold text-xl"  to={`/resolutions?year=${resolution.year}`}>
         {resolution.year}
         </Link>
         <Form method="post" onChange={handleChange} className="leading-[0]">
<input  type="checkbox"
name="isCompleted"
id="isCompleted"
checked={resolution.isCompleted}
readOnly
className="w-5 h-5 "
/>
<input type="hidden" name="id" value={resolution.id}/>
<input type="hidden" name="action" value="complete"/>
         </Form>
         <span className={resolution.isCompleted ? "line-through" : "no-underline" }>
{resolution.resolution}
         </span>
         <Form method="post">
<button type="submit"
name="action"
value="delete"
className="bg-lightMagenta p-3 text-white rounded-md"
>
Delete
</button>
<input type="hidden" name="id" value={resolution.id}/>
         </Form>
        </div>
      );
}
 
export default Resolution;