import { useEffect, useRef } from "react";
import { Grid } from "./grid";

export function App() {
    const cs = useRef<HTMLCanvasElement>(null);
    const o = useRef<OffscreenCanvas>(null);
    useEffect(() => {
        const w = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module'});
        if (!o.current && w && cs.current) {
            //@ts-expect-error write in ref avoid rerender
            o.current = cs.current?.transferControlToOffscreen()
            w.postMessage({ canvas: o.current }, [o.current])
        }
    }, [])
    return (
        <>
        <canvas ref={cs} style={{
            zIndex: 1,
            top: 0,
            left: 0,
            position: 'absolute',
            width: window.innerWidth,
            height: window.innerWidth * 0.8
        }} width={window.innerWidth * 5} height={window.innerWidth * 0.8 * 5} ></canvas>
        <Grid w={window.innerWidth} h={window.innerWidth * 0.8} />
        </>
    )
}