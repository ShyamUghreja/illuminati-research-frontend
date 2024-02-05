import React from 'react'
import "./hero.sass"
import { Col, Container, Row } from 'react-bootstrap';
import HeroImg from '../../assets/hero-img.webp';
import SquareRed from '../../assets/icons/square-red.svg';

const Hero = () => {
    return (
        <div>
            <section className='home-hero-sec position-relative'>
                <Container>
                    <Row>
                        <Col className='align-self-end' lg={6} md={6}>
                            <div className='hero-text'>
                                <h1 className='heading-1'>The <br /> Degens <br /> Behind <span>Crypto</span></h1>
                                <p className='paragraph-large mt-lg-4 mt-3 me-lg-5'>Subscribe and get our weekly newsletter curating the best educational content in crypto.</p>
                                <div className='mt-3 home-ifreme'>
                                    <iframe src="https://embeds.beehiiv.com/2731629b-747b-40f8-9ec2-f344d3a5241d?slim=true" data-test-id="beehiiv-embed" height="52" frameBorder="0" scrolling="no" style={{ margin: "0", borderRadius: "0px !important", background: "transparent" }}></iframe>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} md={6} className='position-relative'>
                            <div className='text-end mb-4 mb-md-0 mb-lg-0 hero-section-image'>
                                <img className='img-fluid ml-auto' src={HeroImg} alt="" />
                            </div>
                        </Col>
                    </Row>
                </Container>
                <img src={SquareRed} className='img-fluid square-red-1' alt="" />
                <img src={SquareRed} className='img-fluid square-red-2' alt="" />
                <img src={SquareRed} className='img-fluid square-red-3' alt="" />
                <img src={SquareRed} className='img-fluid square-red-4' alt="" />
                <img src={SquareRed} className='img-fluid square-red-5' alt="" />
                <img src={SquareRed} className='img-fluid square-red-6' alt="" />
                <img src={SquareRed} className='img-fluid square-red-7' alt="" />
            </section>
        </div>
    )
}

export default Hero