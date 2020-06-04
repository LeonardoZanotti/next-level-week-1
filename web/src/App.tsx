import React from 'react';
import './App.css';

// import { useState } from 'react';
// import Header from './Header';
import Routes from './routes';

function App() {
  return (
    <Routes />
  )

  // const [counter, setCounter] = useState(0);
  
  // function handleButtonClick() {
  //   console.log('oi');
  //   console.log(counter);
  //   setCounter(counter + 1);
  // }

  // return (
  //   <div>
  //     <Header title="Hello World!" />
  //     <Header title="Título 2" />
  //     <Header title={`Contador: ${counter}`} />

  //     <h1>Conteúdo</h1>

  //     <button type="button" onClick={handleButtonClick}>Aumentar</button>
  //   </div>
  // );
}

export default App;
