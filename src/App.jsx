// import React from 'react';
import './App.scss'; // Import your main SASS file here
import SearchTab from '../components/searchTab';
import SearchResult from '../components/searchResult';

function App() {
  return (
    <div className="App">
      <SearchTab />
      <SearchResult />
    </div>
  );
}

export default App;
