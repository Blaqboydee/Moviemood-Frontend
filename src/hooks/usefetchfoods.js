import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;


useEffect(() => {
    try {
       const res =  axios.get(`${API_URL}/food/fetchfoods`)
    } catch (error) {
        console.log(error);
        
    }
}, [])