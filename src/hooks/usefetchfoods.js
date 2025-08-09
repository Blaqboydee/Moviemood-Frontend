import { useState, useEffect, useRef } from 'react';
import axios from 'axios';


useEffect(() => {
    try {
       const res =  axios.get("http://localhost:6176/food/fetchfoods")
    } catch (error) {
        console.log(error);
        
    }
}, [])