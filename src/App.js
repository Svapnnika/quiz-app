import React from 'react';
import './App.css';
import Quiz from './components/Quiz';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Quiz App</h1>
      </header>
      <main>
        <Quiz />
      </main>
      <footer>
        <p>© 2025 Quiz App</p>
      </footer>
    </div>
  );
}

export default App;
