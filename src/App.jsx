import React from 'react';
// Yahan hum aapki nayi file ko 'import' kar rahe hain
import Permissions from './Permissions'; 

function App() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>BaseKey Startup Tools 🛠️</h1>
      
      {/* Ye line aapke saare buttons ko screen par le aayegi */}
      <Permissions /> 
      
    </div>
  );
}

export default App;

