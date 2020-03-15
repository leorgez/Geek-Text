import React from 'react';
import './App.css';
import BooksList from './components/BooksList';
import BookDetail from './components/BookDetail';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/books/:id">
              <BookDetail />
          </Route>
          <Route path="/">
            <BooksList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
