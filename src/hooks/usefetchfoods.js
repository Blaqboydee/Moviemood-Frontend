import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const useFoods = () => {
  const [foodanddrinks, setfoodanddrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchallfoods = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/food/fetchfoods`);
        const allfoods = res.data.data;
        setfoodanddrinks(allfoods);
        console.log(allfoods);
      } catch (error) {
        console.log(error);
        setError(error.message || 'Failed to fetch foods');
      } finally {
        setLoading(false);
      }
    };
    
    fetchallfoods();
  }, [foodanddrinks.length]);

  return {
    allfoods: foodanddrinks,
    foodanddrinks,
    loading,
    error,
    setfoodanddrinks,
    setLoading,
    refetch: () => {
      const fetchallfoods = async () => {
        try {
          setLoading(true);
          setError(null);
          const res = await axios.get(`${API_URL}/food/fetchfoods`);
          const allfoods = res.data.data;
          setfoodanddrinks(allfoods);
        } catch (error) {
          setError(error.message || 'Failed to fetch foods');
        } finally {
          setLoading(false);
        }
      };
      fetchallfoods();
    }
  };
};

export default useFoods;