import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
  marginBottom: '15px',
  borderRadius: '15px',
  maxWidth: '450px',
  maxHeight: '450px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const StyledImage = styled('img')({
  maxWidth: '70px',
  maxHeight: '70px',
  borderRadius: '50%',
  marginRight: '15px',
});

const ScreenerContent = () => {
  const [screenerData, setScreenerData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/screeners/list-by-ticker',
        params: { ticker: 'AMRN' },
        headers: {
          'X-RapidAPI-Key': '4801d70312mshcfe3f24d1e6ca2bp19179djsn79a5618fa570',
          'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
        },
      };

      try {
        const response = await axios.request(options);
        setScreenerData(response.data.finance.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {screenerData ? (
        <div>
          <h2>Predefined Screeners</h2>
          {screenerData.map((screener) => (
            <StyledCard key={screener.canonicalName}>
              <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                <StyledImage src={screener.iconUrl} alt={screener.name} />
                <div>
                  <Typography variant="h5" component="div">
                    {screener.name}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {screener.canonicalName}
                  </Typography>
                </div>
              </CardContent>
            </StyledCard>
          ))}
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default ScreenerContent;
