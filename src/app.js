import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';

function App() {
  return (
    <Router>
      <Header />
      <Route path="/" exact component={Home} />
      <Footer />
    </Router>
  );
}

export default App;
