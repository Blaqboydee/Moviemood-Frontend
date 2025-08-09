import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useUpload = () => {
  const [formData, setFormData] = useState({
    title: "",
    genre: [],
    description: "",
    price: "",
    trailer: "",
    movieImage: "",
    movieBackdrop: "",
    language: "",
    releasedate: "",
    duration: "",
    status: "",
    cast: [
      { name: "", image: "" },
      { name: "", image: "" },
      { name: "", image: "" },
      { name: "", image: "" },
    ],
  });

  const toTitleCase = (str) =>
    str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const toArray = (input) =>
    input
      .split(',')
      .map((item) => toTitleCase(item.trim()))
      .filter((g) => g);

  const convertToEmbedURL = (url) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue;

    if (name === 'genre') {
      formattedValue = toArray(value);
    } else if (name === 'title') {
      formattedValue = toTitleCase(value);
    } else {
      formattedValue = value;
    }

    if (name.startsWith("showtimes.")) {
      const field = name.split(".")[1]; // 'date' or 'times'
      setFormData((prev) => ({
        ...prev,
        showtimes: {
          ...prev.showtimes,
          [field]: field === "times" ? toArray(formattedValue) : formattedValue,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    }
  };

  const handleImageUpload = (e, fieldName) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: e.target.result,
      }));
    };
    reader.readAsDataURL(imageFile);
  };

  const handleCastChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedCast = [...prev.cast];
      updatedCast[index][field] = value;
      return {
        ...prev,
        cast: updatedCast,
      };
    });
  };

  const handleCastImageUpload = (e, index) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      handleCastChange(index, 'image', e.target.result);
    };
    reader.readAsDataURL(imageFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      trailer: convertToEmbedURL(formData.trailer),
    };

    console.log('Movie Data:', updatedFormData);

    axios
      .post("http://localhost:6176/movie/upload", updatedFormData)
      .then((response) => {
        console.log("Response Status:", response.status);
        console.log("Response Data:", response.data);
        toast.success("Movie upload successful!");
        setFormData({
          title: "",
          genre: [],
          showtimes: {
            date: "",
            times: []
          },
          description: "",
          price: "",
          trailer: "",
          movieImage: "",
          movieBackdrop: "",
          language: "",
          releasedate: "",
          duration: "",
          status: "",
          cast: [
            { name: "", image: "" },
            { name: "", image: "" },
            { name: "", image: "" },
            { name: "", image: "" },
          ],
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log("Error Status:", error.response.status);
          console.log("Error Data:", error.response.data);
        } else {
          console.error("Network or Server Error:", error.message);
        }
      });
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleImageUpload,
    handleSubmit,
    handleCastChange,
    handleCastImageUpload,
  };
};
