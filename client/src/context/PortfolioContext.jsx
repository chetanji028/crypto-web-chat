 
import React, { createContext, useState, useEffect } from 'react';
import { getPrice } from '../utils/api';

export const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState({ eth: 0 });
  const [portfolioValue, setPortfolioValue] = useState(0);

  useEffect(() => {
    const updatePortfolioValue = async () => {
      if (portfolio.eth > 0) {
        const price = await getPrice('ethereum');
        setPortfolioValue(portfolio.eth * price);
      }
    };
    updatePortfolioValue();
    const interval = setInterval(updatePortfolioValue, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [portfolio]);

  const addToPortfolio = (amount) => {
    setPortfolio((prev) => ({ ...prev, eth: prev.eth + amount }));
  };

  return (
    <PortfolioContext.Provider value={{ portfolio, portfolioValue, addToPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
};