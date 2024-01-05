import React, { useReducer, useRef } from 'react';

const initialState = {
  data: [],
  currentInput: '',
  showBox: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        data: [
          ...state.data,
          { id: state.data.length, val: action.payload, hideContent: false },
        ],
        currentInput: action.payload,
        showBox: true,
      };
    case 'TOGGLE_CONTENT':
      return {
        ...state,
        data: state.data.map((item, index) =>
          index === action.payload
            ? { ...item, hideContent: !item.hideContent }
            : item
        ),
      };
    default:
      return state;
  }
};

export default function Useref() {
  const inputRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleContent = (index) => {
    dispatch({ type: 'TOGGLE_CONTENT', payload: index });
  };

  function storeInput(e) {
    if (e.code === 'Enter') {
      const newValue = e.target.value;
      if (newValue) {
        dispatch({ type: 'ADD_ITEM', payload: newValue });
      }
    }
  }

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <input type="text" onKeyDown={(e) => storeInput(e)} ref={inputRef} />
      {state.showBox ? (
        <>
          {state.data.map((item, index) => (
            <div key={index} className="box">
              {item.hideContent ? (
                <h2 className="text">The content is hidden</h2>
              ) : (
                <h2 className="text">{item.val}</h2>
              )}
              <button className="toggle" onClick={() => toggleContent(index)}>
                Toggle
              </button>
            </div>
          ))}
          <button className="focus-btn" onClick={focusInput}>
            Get back writing
          </button>
        </>
      ) : (
        ''
      )}
    </div>
  );
      }