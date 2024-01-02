import React, { useState } from 'react';

export default function Useref() {
    const [state, setState] = useState([]);
    const [currentInput, setCurrentInput] = useState('');
    const [showBox, setShowBox] = useState(false);

    const toggleContent = (index) => {
        setState((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, hideContent: !item.hideContent } : item
            )
        );
    };

    function storeInput(e) {
        if (e.code === 'Enter') {
            const newValue = e.target.value;
            if (newValue) {
                setCurrentInput(newValue);
                setState((prev) => [
                    ...prev,
                    { id: state.length, val: newValue, hideContent: false },
                ]);
                setShowBox(true);
            }
        }
    }

    return (
        <div>
            <input type="text" onKeyDown={(e) => storeInput(e)} />
            {showBox ? (
                state.map((item, index) => (
                    <div key={index} className="box">
                        {item.hideContent ? (
                            <h2 className="text">The content is hidden</h2>
                        ) : (
                            <h2 className="text">{item.val}</h2>
                        )}
                        <button
                            className="toggle"
                            onClick={() => toggleContent(index)}
                        >
                            Toggle
                        </button>
                    </div>
                ))
            ) : (
                ''
            )}
        </div>
    );
}