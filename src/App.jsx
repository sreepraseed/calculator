// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleCalculate = () => {
    try {
      setResult(eval(input).toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleBackspace = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [input]);

  const handleKeyDown = (event) => {
    const key = event.key;

    if (/[0-9.+\-*/]/.test(key)) {
      setInput((prevInput) => prevInput + key);
    } else if (key === 'Enter') {
      handleCalculate();
    } else if (key === 'Escape') {
      handleClear();
    } else if (key === 'Backspace') {
      handleBackspace();
    }
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="input">{input}</div>
        <div className="result">{result}</div>
      </div>
      <div className="buttons">
        {[7, 8, 9, '/'].map((value) => (
          <button key={value} onClick={() => handleButtonClick(value)}>
            {value}
          </button>
        ))}
        {[4, 5, 6, '*'].map((value) => (
          <button key={value} onClick={() => handleButtonClick(value)}>
            {value}
          </button>
        ))}
        {[1, 2, 3, '-'].map((value) => (
          <button key={value} onClick={() => handleButtonClick(value)}>
            {value}
          </button>
        ))}
        {[0, '.', '=', '+'].map((value) => (
          <button key={value} onClick={() => (value === '=' ? handleCalculate() : handleButtonClick(value))}>
            {value}
          </button>
        ))}
        <button className="clear-button" onClick={handleClear}>
          C
        </button>
        <button onClick={handleBackspace} className="backspace-button">
          ←
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Calculator />
    </div>
  );
}

export default App;
