import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AllTrains from './AllTrains';
import SingleTrain from './SingleTrain';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" component={AllTrains} />
          <Route path="/train/:trainNumber" component={SingleTrain} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
