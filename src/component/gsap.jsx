import { useGSAP } from "@gsap/react"
import gsap from 'gsap';
import { useRef } from "react"

export const Gsap = ()=>{
    const container = useRef()
    useGSAP(()=>{
        gsap.from(container.current,{
            y:-10,
            duration:2,
            delay:1,
            opacity:0
        })
    })
    return(
        <>
          <div ref={container} className="box"></div>
        </>
    )
}