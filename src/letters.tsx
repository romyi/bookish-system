export const Letters = (props: {w: number, h: number, data: { char: string, textx: number, texty: number, fill: string}[]}) => {
return (
    <svg style={{ position: 'absolute', zIndex: 20, fontFamily: 'monospace', top: 0, left: 0 }} height={props.h} width={props.w}>
        {props.data.map((cell) => {
            return (
                <text
                    key={cell.char}
                    x={cell.textx}
                    y={cell.texty}
                    fill={cell.fill}
                    opacity={.5}
                    fontSize={window.innerWidth * 0.007}
                    >
                    {cell.char}
        </text>
            )
        })}
    </svg>
)
}