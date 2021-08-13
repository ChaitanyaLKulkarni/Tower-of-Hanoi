import React from "react";
import colors from "./colors";

const DISC_WIDTH = 90;
const DISC_HEIGHT = 15;
function Tower({ idx, discStack, onClick, selected, discNos }) {
    const dHeight = DISC_HEIGHT; /// discNos;
    const dWidth = DISC_WIDTH / discNos;
    return (
        <div
            className={`tower ${selected ? "selected" : ""}`}
            onClick={onClick}
        >
            {selected}
            <svg viewBox="0 0 200 300" width="400">
                <g>
                    <rect
                        x={0}
                        y={290}
                        width={200}
                        height={10}
                        fillOpacity={0.8}
                    />
                    <rect
                        x={95}
                        y={50}
                        width={10}
                        height={240}
                        fillOpacity={0.8}
                    />
                </g>
                <g>
                    {discStack.map((disc, idx) => (
                        <rect
                            key={`disc-${disc}`}
                            x={100 - dWidth - dWidth * disc}
                            y={
                                298 -
                                (discStack.length - idx) * dHeight -
                                dHeight / 2
                            }
                            height={dHeight - 1}
                            width={(dWidth + dWidth * disc) * 2}
                            fill={colors[disc]}
                            // fillOpacity={0.9}
                        />
                    ))}
                </g>
            </svg>
        </div>
    );
}

export default Tower;
