import React from "react";

interface GridProps {
    w: number,
    h: number
}

const leftoffset = 0.062;
const topoffset = 0.094;

const cols = 20;
const rows = 20;

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function Grid({ w, h }: GridProps) {
    const cellwidth = (w - (w * leftoffset * 2)) / cols;
    const cellheight = (h - (h * topoffset * 2)) / rows;
    return (
        <svg style={{ position: 'absolute', zIndex: 20, fontFamily: 'monospace', top: 0, left: 0 }} height={h} width={w}>
            {Array.from({length: cols * rows }).map((_,i) => {
                const row = Math.floor(i / rows) + 1;
                const col = i % cols + 1;
                const xaligner = cellwidth * 0.35
                const yaligner = cellheight * 0.55
                const x = (w * leftoffset) + (col - 1) * ((w - w * leftoffset * 2) / cols);
                const y = (h * topoffset) + (row - 1) * ((h - h * topoffset * 2) / rows);
                const matched = false
                return (
                    <React.Fragment key={i}>
                        {matched && (
                            <rect
                                opacity={0.4}
                                fill="white"
                                x={x}
                                y={y}
                                width={(w - (w * leftoffset * 2)) / cols}
                                height={(h - (h * topoffset * 2)) / rows}
                            />
                        )}
                        <text 
                            x={x + xaligner}
                            y={y + yaligner}
                            fill="black"
                            opacity={.4}
                            fontSize={window.innerWidth * 0.01}
                            >
                            {alphabet.charAt(row - 1)}{col}
                        </text>
                        </React.Fragment>
                )
            })}
        </svg>
    )
}