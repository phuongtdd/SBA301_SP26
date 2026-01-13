import { useState } from "react";

export default function TestCount() {
    const [count, setCount] = useState(0);
    const handleCount = () => {
        setCount(count + 1);
    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick = {handleCount}>Increase</button>
        </div>
    )
};
