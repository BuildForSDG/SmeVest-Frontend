import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import SignUp from './components/SignUp/SignUp';

function App() {
  return (
    <Router>
      <Header />
      <Route path="/" exact component={Home} />
      <Route path="/signup" component={SignUp} />
      <Footer />
    </Router>
  );
}

export default App;
