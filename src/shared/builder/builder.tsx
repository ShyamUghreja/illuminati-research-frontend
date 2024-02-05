import React from 'react'
import "./builder.sass"
import { Container } from 'react-bootstrap';
import Logo1 from '../../assets/logo1.svg';
import Logo2 from '../../assets/logo2.svg';
import Logo3 from '../../assets/logo3.svg';
import Logo4 from '../../assets/logo4.svg';
import Logo5 from '../../assets/logo5.svg';

const Builder = () => {
  return (
    <div className=' mb-lg-0 mb-md-0 mb-3'>
      <section className='partner-sec'>
        <Container>
          <div className='partner-img'>
            <img className='img-fluid' src={Logo1} alt="" />
            <img className='img-fluid' src={Logo2} alt="" />
            <img className='img-fluid' src={Logo3} alt="" />
            <img className='img-fluid' src={Logo4} alt="" />
            <img className='img-fluid' src={Logo5} alt="" />
          </div>
        </Container>
      </section>
    </div>
  )
}

export default Builder