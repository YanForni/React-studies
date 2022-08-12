import { useState } from "react";

export function Counter() {

    const [counter, setCounter] = useState(0);
    function increment() {
        setCounter(counter + 1);
        console.log('incrementing');
    }
    return (
        <>
            <h2>{counter}</h2>
            <button type="button" onClick={increment} >Increment +1</button>
        </>)
    
}