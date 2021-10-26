import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {

  const [listItems, setListItems] =  useState();
  useEffect(() => {
    // Test Will Delete Later
    axios.get('/items').then((i) => {
      console.log('Test Route recieved- delete later', i?.data);
      setListItems(i?.data);
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Init front end
        </p>
        {/* Test Will Delete Later */}
        { listItems ?
        listItems.map((items) => {
          return (
            <div>
              Item Name: {items?.itemName}
            </div>
          )
        })

        : 'Spinner'}
        {/* Test Will Delete Later */}
      </header>
    </div>
  );
}

export default App;
