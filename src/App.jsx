import React from 'react';
import Quiz from './components/quiz.jsx';

function App() {
  return (
     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-blue-700">Simple Quiz App</h1>
        <Quiz />
      </div>
    </div>
  );
}

export default App;
