import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,  } from '@mui/material';
import axios from 'axios';
import { apiData, getData } from '../Services/api';


const ConversationsList = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getConversations = async () => {
      const q = 'tesla';
      const region = 'US';

      try {
        const data = await getData(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?q=${q}&region=${region}`, apiData);
        setConversations(data.quotes);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    getConversations();
  }, []);

 
  console.log(conversations);

  return (
    <TableContainer component={Paper}>
      <Table className="styled-table" aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Exchange</StyledTableCell>
            <StyledTableCell>Symbol</StyledTableCell>
            <StyledTableCell>Long Name</StyledTableCell>
            <StyledTableCell>Quote Type</StyledTableCell>
            <StyledTableCell>Score</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {conversations.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.exchange}</TableCell>
              <TableCell>{item.symbol}</TableCell>
              <TableCell>{item.longname}</TableCell>
              <TableCell>{item.quoteType}</TableCell>
              <TableCell>{item.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Define a styled TableCell for the header
const StyledTableCell = ({ children }) => (
  <TableCell style={{ background: '#000', color: '#fff', fontWeight: 'bold' }}>{children}</TableCell>
);

export default ConversationsList;
