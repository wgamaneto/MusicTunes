import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Content from './Content';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Content />
      </BrowserRouter>
    );
  }
}

export default App;
