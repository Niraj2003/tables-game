import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [minNum1, setMinNum1] = useState(11);
  const [maxNum1, setMaxNum1] = useState(30);
  const [num1, setNum1] = useState(generateRandomNumber(minNum1, maxNum1));
  const [num2, setNum2] = useState(generateRandomNumber(1, 10));
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [previousQuestion, setPreviousQuestion] = useState('');
  const [previousAnswer, setPreviousAnswer] = useState('');

  useEffect(() => {
    generateQuestion();
  }, [minNum1, maxNum1]); // Update the question when the range changes

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const generateQuestion = () => {
    setNum1(generateRandomNumber(minNum1, maxNum1));
    setNum2(generateRandomNumber(1, 10));
    setUserAnswer('');
    setIsCorrectAnswer(null); // Reset correctness indicator
  };

  const checkAnswer = () => {
    const correctAnswer = num1 * num2;
    if (parseInt(userAnswer) === correctAnswer) {
      setIsCorrectAnswer(true);
      generateQuestion();
    } else {
      setIsCorrectAnswer(false);
      setPreviousQuestion(`${num1} x ${num2} =`);
      setPreviousAnswer(correctAnswer);
      setUserAnswer(''); // Clear the input field
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };


  const resetTest = () => {
    generateQuestion();
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
            <div className="card p-4">
              <h1 className="mb-4 text-center">Table Test</h1>
              <div className="mb-3">
                <label>Range of Tables :</label>
                <div className="d-flex">
                  <input
                    type="number"
                    value={minNum1}
                    onChange={(e) => setMinNum1(parseInt(e.target.value))}
                    className="form-control mr-2"
                    placeholder="Min"
                  />
                  <input
                    type="number"
                    value={maxNum1}
                    onChange={(e) => setMaxNum1(parseInt(e.target.value))}
                    className="form-control"
                    placeholder="Max"
                  />
                </div>
              </div>
              <h2 className="mb-3 text-center">
                {num1} x {num2} =
              </h2>
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                className={`form-control mb-3 ${
                  isCorrectAnswer === false ? 'is-invalid' : ''
                }`}
                style={{
                  borderColor: isCorrectAnswer === false ? 'red' : '',
                  borderWidth: isCorrectAnswer === false ? '3px' : '',
                }}
              />
              <div className="text-center">
                <button onClick={checkAnswer} className="btn btn-primary mr-2">
                  Submit
                </button>
              </div>
              {isCorrectAnswer === false && (
                <div className="mt-3">
                  <p className="text-center text-danger">
                    Incorrect! Try again.
                  </p>
                  <p className="text-center">
                    Previous Correct Answer: {previousQuestion} {previousAnswer}
                  </p>
                </div>
              )}
            </div>
        </div>
      </div>
    </div>
    
  );
};

export default App;
