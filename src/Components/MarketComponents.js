import React, { useState, useEffect } from 'react';
import { apiData, getData } from '../Services/api';
import { CircularProgress } from '@mui/material';

const MarketComponents = () => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMarketData = async () => {
      const region = 'US';
      const symbols = 'AMD,IBM,AAPL';

      try {
        const data = await getData(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=${region}&symbols=${symbols}`, apiData);
        setMarketData(data.quoteResponse.result);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    getMarketData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {marketData.map((item, idx) => (
        <div key={idx} style={{
          border: '1px solid #ccc',
          padding: '10px',
          margin: '10px',
          borderRadius: '5px',
          width: '300px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fff',
        }}>
          <h3>{item.shortName}</h3>
          <div>
            <strong>Exchange:</strong> {item.exchange}
          </div>
          <div>
            <strong>Currency:</strong> {item.currency}
          </div>
          <div>
            <strong>Book Value:</strong> {item.bookValue}
          </div>
          <div>
            <strong>Quote Type:</strong> {item.quoteType}
          </div>
          <div>
            <strong>Symbol:</strong> {item.symbol}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketComponents;
