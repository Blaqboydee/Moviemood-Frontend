import React from 'react'
import "../pages/Landing.css"
import ChangeBackdrop from '../components/ChangeBackdrop'
import MoviesLoop from "../components/MoviesLoop"
import DisplayMovies from '../components/DisplayMovies'

const LandingPage = () => {
  return (
   <div className='Landingpage'>
  <MoviesLoop />
  <ChangeBackdrop />
  <div id="movies-section">
    <DisplayMovies />
  </div>
</div>

  )
}

export default LandingPage