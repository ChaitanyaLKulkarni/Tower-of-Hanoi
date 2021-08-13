import { useState, useEffect, useCallback } from "react";
import "./App.css";
import Tower from "./Tower";
function App() {
    const [discNos, setDiscNos] = useState(3);
    const [discStacks, setDiscStacks] = useState([
        [...Array(discNos).keys()],
        [],
        [],
    ]);
    const [currentSelected, setCurrentSelected] = useState(null);

    const checkCompleted = useCallback(() => {
        // console.log("Checking for Win");
    }, []);

    useEffect(() => {
        checkCompleted();
    }, [discStacks, checkCompleted]);

    const checkValid = (newSelected) => {
        if (currentSelected === null) {
            if (discStacks[newSelected].length === 0) return false;
            return true;
        }

        if (currentSelected === newSelected) return true;

        if (
            discStacks[newSelected].length === 0 ||
            discStacks[currentSelected][0] < discStacks[newSelected][0]
        )
            return true;

        return false;
    };

    const moveDisc = (newSelected) => {
        if (currentSelected == null) {
            setCurrentSelected(newSelected);
            return;
        }
        if (currentSelected === newSelected) {
            setCurrentSelected(null);
            return;
        }
        const newDiscStacks = [
            ...discStacks.map((discStack) => [...discStack]),
        ];

        const discToMove = newDiscStacks[currentSelected].shift();
        newDiscStacks[newSelected].unshift(discToMove);
        setDiscStacks(newDiscStacks);
        setCurrentSelected(null);
    };

    return (
        <div>
            <input
                type="number"
                onChange={(e) => {
                    const newDiscNo = parseInt(e.target.value);
                    setDiscNos(newDiscNo);
                    setDiscStacks([[...Array(newDiscNo).keys()], [], []]);
                }}
                value={discNos}
                min={1}
            />
            Current Discs : {discNos}
            <div className="container">
                {discStacks.map((discStack, idx) => (
                    <Tower
                        key={`stack-${idx}`}
                        idx={idx}
                        discStack={discStack}
                        onClick={() => {
                            checkValid(idx) && moveDisc(idx);
                        }}
                        selected={currentSelected === idx}
                        discNos={discNos}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
