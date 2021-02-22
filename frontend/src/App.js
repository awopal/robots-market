import * as React from 'react';
import Cart from "../src/component/Cart"
import CardItem from '../src/component/CardItem'

import "./App.css"

function App() {

  const onClick = () => {
    console.log("hi")
  }

  return (
    <div className="App">
      <header>Robot Market</header>
      <div className="container">
        <div className="box">
          <CardItem onClick={() => onClick()} />
          <CardItem onClick={() => onClick()} />
          <CardItem onClick={() => onClick()} />
          <CardItem onClick={() => onClick()} />
          <CardItem onClick={() => onClick()} />
          <CardItem onClick={() => onClick()} />
          <CardItem onClick={() => onClick()} />
        </div>
        <Cart />
      </div>
    </div>
  );
}

export default App;
