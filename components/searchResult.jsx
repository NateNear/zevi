import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import './SearchResult.scss';

const Star = ({ filled, onSelect }) => (
  <span onClick={onSelect} className={`star ${filled ? 'filled' : ''}`}>
    ★
  </span>
);

const SearchResult = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState(new Set());
  const [starFilter, setStarFilter] = useState(0);
  const [priceFilter, setPriceFilter] = useState('All');

  useEffect(() => {
    const generatedProducts = Array.from({ length: 10 }, () => ({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      image: faker.image.fashion(),
      rating: faker.datatype.number({ min: 1, max: 5 })
    }));
    setProducts(generatedProducts);
  }, []);

  const toggleWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      const newWishlist = new Set(prevWishlist);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  const handleStarFilter = (rating) => {
    setStarFilter(starFilter === rating ? 0 : rating);
  };

  const handlePriceFilter = (e) => {
    setPriceFilter(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const matchStars = starFilter === 0 || product.rating === starFilter;
    const matchPrice =
      priceFilter === 'All' ||
      (priceFilter === 'Under 500' && parseFloat(product.price) < 500) ||
      (priceFilter === '500 to 1000' &&
        parseFloat(product.price) >= 500 &&
        parseFloat(product.price) <= 1000);
    return matchStars && matchPrice;
  });

  return (
    <div className="search-results-container">
      <div className="filters-section">
        <h2>Filters</h2>
        {/* Price filter */}
        <select onChange={handlePriceFilter}>
          <option value="All">All Prices</option>
          <option value="Under 500">Under 500</option>
          <option value="500 to 1000">500 to 1000</option>
        </select>
        {/* Star rating filter */}
        {[1, 2, 3, 4, 5].map((rating) => (
          <Star
            key={rating}
            filled={starFilter >= rating}
            onSelect={() => handleStarFilter(rating)}
          />
        ))}
      </div>
      <div className="products-section">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Star
                    key={rating}
                    filled={rating <= product.rating}
                    onSelect={() => {}}
                  />
                ))}
              </div>
              <button
                className={`wishlist-button ${wishlist.has(product.id) ? 'in-wishlist' : ''}`}
                onClick={() => toggleWishlist(product.id)}
              >
                Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
