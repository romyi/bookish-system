import { useEffect, useRef, useState } from "react";
import { TypeHint } from "./hints/type-hint";
import { Keypad } from "./keypad";
import { Letters } from "./letters";

const isTouch = navigator.maxTouchPoints > 0;
const scale = isTouch ? 1.6 : 1;
const densy = isTouch ? 8 : 2

export function App() {
    const cs = useRef<HTMLCanvasElement>(null);
    const o = useRef<OffscreenCanvas>(null);
    const wo = useRef<Worker>(new Worker(new URL('./worker.ts', import.meta.url), { type: 'module'}))
    const [ data, setdata ] = useState();
    useEffect(() => {
        if (!o.current && cs.current) {
            //@ts-expect-error write in ref avoid rerender
            o.current = cs.current?.transferControlToOffscreen()
            wo.current.postMessage({ canvas: o.current, w: window.innerWidth * scale, h: window.innerWidth * scale * 0.8 }, [o.current])
            wo.current.onmessage = function (e) {
                if (e.data.cells) {
                    setdata(e.data.cells)
                }
            }
        }
        () => {
            wo.current?.terminate()
        }
    }, []);
    return (
        <>
        <TypeHint />
        <Keypad />
        <canvas ref={cs} style={{
            zIndex: 1,
            top: 0,
            left: 0,
            position: 'absolute',
            width: window.innerWidth * scale,
            height: window.innerWidth * scale * 0.8
        }} width={window.innerWidth * densy} height={window.innerWidth * 0.8 * densy} ></canvas>
        {data && <Letters data={data} w={window.innerWidth * scale} h={ window.innerWidth * scale * 0.8}  />}
        </>
    )
}