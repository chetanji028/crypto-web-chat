 
import axios from 'axios';

const API_BASE = 'https://api.coingecko.com/api/v3';

export const getPrice = async (coinId) => {
  const response = await axios.get(`${API_BASE}/simple/price`, {
    params: { ids: coinId, vs_currencies: 'usd' }
  });
  return response.data[coinId].usd;
};