import React from 'react'
import "./about-us.sass"
import Allhero from '../../shared/all-hero/all-hero'
import Offer from '../../shared/offer/offer';
import Footercmp from '../../shared/footercmp/footercmp';


const Aboutus = () => {

  return (
    <>
    <div className='other-main-div'>
      <Allhero />
      <Offer />
      <Footercmp />

    </div>
    </>
  )
}

export default Aboutus