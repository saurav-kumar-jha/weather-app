import { useState } from "react"
import { Gsap } from "./gsap"
import { Weather } from "./weather"
import { Weather2 } from "./weatherApi"

export const Home = ()=>{
    // const [count , setcount] = useState(0)
    return(
        <>
         {/* <h1>{count}</h1>
         <button onClick={()=> setcount(count + 2)} >click</button>   */}
         {/* <Gsap/>       */}
         {/* <Weather/> */}
         <Weather2/>
        </>
    )
}