import { useState } from 'react';
import { faker } from '@faker-js/faker';
import './searchTab.scss'; // Your SASS file for styling

const SearchTab = () => {
  const [inputFocused, setInputFocused] = useState(false);
  
  // Generate trending items using faker
  const trends = new Array(4).fill(null).map(() => ({
    image: faker.image.fashion(),
    name: faker.commerce.productName(),
  }));

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Search"
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
      />
      {inputFocused && (
        <div className="trends-container">
          <h2>Latest Trends</h2>
          <div className="trend-items">
            {trends.map((trend, index) => (
              <div key={index} className="trend-item">
                <img src={trend.image} alt={trend.name} />
                <p>{trend.name}</p>
              </div>
            ))}
          </div>
          {/* Similar implementation for Popular suggestions */}
        </div>
      )}
    </div>
  );
};

export default SearchTab;
