import React from 'react'
import "./footercmp.sass"
import { Container, Row, Col, Button } from 'react-bootstrap'
import FoterImg from "../../assets/footer-img.webp"
import { useLocation, useNavigate } from 'react-router-dom';
import SquareRed from '../../assets/icons/square-red.svg';


function Footercmp() {

  const location = useLocation();
  const pathname = location.pathname;
  const nav = useNavigate()

  return (
    <div>
      {pathname === "/" &&
        <section className='footer-sec position-relative pt-3 pt-lg-5 pt-md-4 main-div'>
          <Container>
            <div className='footer-news text-center'>
              {/* <div className="footer-img">
                
              </div> */}
              <Row>
                <Col lg={6}>
                  <div className='text-start'>
                    <h2 className='heading-2 fw-600 mb-lg-5 mb-md-4 mb-3 '> <p className='fw-500 heading-4'>Partner With Us </p> Hire The Crypto Illuminati community of degens</h2>
                    <div className="text-center d-lg-block d-none">
                      <img className='img-fluid m-lg-0 m-md-0 m-auto' src={FoterImg} alt="" />
                    </div>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className='footer-card-1 mb-lg-5 mb-3'>
                    <div className='text-bg'>
                      <p className='paragraph-large fw-400 '>We are a DAO that brings together the best, brightest, & most influential minds in crypto to provide the following services to crypto projects and ecosystems:</p>
                      <ul className='mt-4'>
                        <li className='paragraph-large'>Research Articles</li>
                        <li className='paragraph-large'>Twitter Threads</li>
                        <li className='paragraph-large'>Industry Reports</li>
                        <li className='paragraph-large'>AMA Twitter Spaces</li>
                      </ul>
                    <button className='footer-btn'>Contact for advertising</button>
                    </div>
                    {/* </div>
                  <div className='footer-card-1'> */}
                    {/* <p className='medium-p fw-400 text-bg'>Contact us about our bespoke research services for investment firms (VCs, family offices, PE, TradFi)</p> */}
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
          <img src={SquareRed} className='img-fluid square-red-1' alt="" />
          <img src={SquareRed} className='img-fluid square-red-2' alt="" />
          <img src={SquareRed} className='img-fluid square-red-3' alt="" />
          <img src={SquareRed} className='img-fluid square-red-4' alt="" />
          <img src={SquareRed} className='img-fluid square-red-5' alt="" />
          <img src={SquareRed} className='img-fluid square-red-6' alt="" />
          <img src={SquareRed} className='img-fluid square-red-7' alt="" />
        </section>
      }
      {pathname === "/about-us" &&
        <section className='footer-sec position-relative pt-lg-5 other-main-div'>
          <Container>
            <div className='footer-news text-center'>
              {/* <div className="footer-img">
                <img className='img-fluid' src={FoterImg} alt="" />
              </div> */}
              <Row>
                <Col lg={6}>
                  <div className='text-start'>
                    <h2 className='heading-2 fw-600 mb-lg-5 mb-md-4 mb-3'>Contact us</h2>
                    <div className="content-position-img">
                      <img className='img-fluid m-auto d-lg-block d-none' src={FoterImg} alt="" />
                    </div>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className='footer-card-1 mb-lg-5 mb-3'>
                    <div className='text-bg'>
                      <h4 className='heading-4'>Help us get better</h4>
                      <p className='medium-p '>Have a tip, suggestion, or request?</p>
                      <Button className='footer-btn mt-3'>Contact our editorial team</Button>
                    </div>
                    {/* </div>
                  <div className='footer-card-1 mb-lg-5'> */}
                    <div className='text-bg'>
                      <h4 className='heading-4'>Advertise with The Crypto Illuminati</h4>
                      <p className='medium-p '>Ready to grow your brand? Let’s talk.</p>
                      <Button className='footer-btn mt-3' onClick={() => nav("/advertise")}>Contact for advertising</Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
          <img src={SquareRed} className='img-fluid square-red-1' alt="" />
          <img src={SquareRed} className='img-fluid square-red-2' alt="" />
          <img src={SquareRed} className='img-fluid square-red-3' alt="" />
          <img src={SquareRed} className='img-fluid square-red-4' alt="" />
          <img src={SquareRed} className='img-fluid square-red-5' alt="" />
          <img src={SquareRed} className='img-fluid square-red-6' alt="" />
          <img src={SquareRed} className='img-fluid square-red-7' alt="" />
        </section>
      }
      {pathname === "/advertise" &&
        <section className='footer-sec position-relative pt-lg-5 other-main-div'>
          <Container>
            <div className='footer-news text-center'>
              {/* <div className="footer-img">
                <img className='img-fluid' src={FoterImg} alt="" />
              </div> */}
              <Row>
                <Col lg={6}>
                  <div className='text-start'>
                    {/* <h2 className='heading-2 fw-600 '>Contact us</h2> */}
                    <div className="content-position-img">
                      <img className='img-fluid m-auto d-lg-block d-none' src={FoterImg} alt="" />
                    </div>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className='footer-card-1 mb-lg-5 mb-3'>
                    <div className='text-bg'>
                      <h4 className='heading-4'>Our Audience</h4>
                      <p className='medium-p '>The Crypto Illuminati is a fast-growing publication focused on crypto. Our readership includes over 4,000 executives, investors, founders, and crypto enthusiasts.</p>
                      <Button className='footer-btn mt-3' onClick={()=> window.open("https://o7fat38478c.typeform.com/to/PuGmfJ8I", "_blank")}>Advertise</Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
          <img src={SquareRed} className='img-fluid square-red-1' alt="" />
          <img src={SquareRed} className='img-fluid square-red-2' alt="" />
          <img src={SquareRed} className='img-fluid square-red-3' alt="" />
          <img src={SquareRed} className='img-fluid square-red-4' alt="" />
          <img src={SquareRed} className='img-fluid square-red-5' alt="" />
          <img src={SquareRed} className='img-fluid square-red-6' alt="" />
          <img src={SquareRed} className='img-fluid square-red-7' alt="" />
        </section>
      }
      {pathname === "/cross-promotion" &&
        <section className='footer-sec position-relative pt-lg-5 pt-md-4 pt-3 other-main-div'>
          <Container>
            <div className='footer-news text-center'>
              {/* <div className="footer-img">
                <img className='img-fluid' src={FoterImg} alt="" />
              </div> */}
              <Row>
                <Col lg={6}>
                  <div className='text-start'>
                    <h2 className='heading-2 fw-600 mb-lg-5 mb-md-4 mb-3'> Contact us</h2>
                    <div className="content-position-img">
                      <img className='img-fluid m-auto d-lg-block d-none' src={FoterImg} alt="" />
                    </div>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className='footer-card-1 mb-lg-5 mb-md-4 mb-3'>
                    <div className='text-bg'>
                      <p className='paragraph-medium'>Promote your newsletter to our community of crypto professionals</p>
                      <p className='medium-p my-3'><span className='fw-700'>The Crypto Illuminati </span> is a fast-growing publication focused on crypto. Our readership includes over 4,000 executives, investors, founders, and crypto enthusiasts.</p>
                      <p className='medium-p '>Cross-promotions are a simple but effective growth strategy. You give a shout-out to your partner. In return, they give a shout-out to you. Simple. And free.</p>
                      <Button className='footer-btn mt-3' onClick={()=> window.open("https://o7fat38478c.typeform.com/to/SSyV7aNo", "_blank")}>Contact our editorial team</Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
          <img src={SquareRed} className='img-fluid square-red-1' alt="" />
          <img src={SquareRed} className='img-fluid square-red-2' alt="" />
          <img src={SquareRed} className='img-fluid square-red-3' alt="" />
          <img src={SquareRed} className='img-fluid square-red-4' alt="" />
          <img src={SquareRed} className='img-fluid square-red-5' alt="" />
          <img src={SquareRed} className='img-fluid square-red-6' alt="" />
          <img src={SquareRed} className='img-fluid square-red-7' alt="" />
        </section>
      }
    </div>
  )
}

export default Footercmp