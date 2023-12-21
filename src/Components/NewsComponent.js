import React, { useState, useEffect } from 'react';
import { apiData, getData } from '../Services/api';

const NewsComponent = () => {
  const [newsData, setNewsData] = useState([]);
  const [visibleCards, setVisibleCards] = useState(8); // Number of initially visible cards
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDataapi = async () => {
      const region = 'US';
      const category = 'generalnews';

      try {
        const data = await getData(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/list?region=${region}&category=${category}`, apiData);
        setNewsData(data.items.result);
      } catch (error) {
        setError('Failed to fetch data. Please try again later.');
      }
    };

    getDataapi();
  }, []);

  const loadMore = async () => {
    setLoading(true);

    // Simulate an API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setVisibleCards((prevVisibleCards) => prevVisibleCards + 4);
    setLoading(false);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Yahoo Finance News</h2>
      {newsData.slice(0, visibleCards).map((item, index) => (
        <div key={index} style={{
          border: '1px solid #ddd',
          padding: '10px',
          margin: '10px',
          borderRadius: '5px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}>
          <h3>{item.title}</h3>
          {item.image && <img src={item.image} alt={item.title} style={{ maxWidth: '100%', height: 'auto' }} />}
          <p>{item.summary}</p>
          <p>Publisher: {item.publisher}</p>
          <p>Link: <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a></p>
        </div>
      ))}
      {visibleCards < newsData.length && (
        <button onClick={loadMore} disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default NewsComponent;
