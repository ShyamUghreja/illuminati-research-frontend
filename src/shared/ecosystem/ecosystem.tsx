import React, { useEffect, useState } from 'react'
import "./ecosystem.sass"
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getEcosystem } from '../../api/posts';
import ContentLoader from 'react-content-loader';

import ethereumLogo from '../../assets/eth-logo.svg';
import polygonLogo from '../../assets/polygen-logo.svg';
import bitcoinLogo from '../../assets/icons/ecosystem/bitcoin-logo.webp';
import arbitrumLogo from '../../assets/icons/ecosystem/arbitrum-logo.png';
import aptosLogo from '../../assets/icons/ecosystem/aptos-logo.webp';
import suiLogo from '../../assets/icons/ecosystem/sui-logo.svg';
import fantomLogo from '../../assets/icons/ecosystem/fantom-logo.png';
import muxLogo from '../../assets/icons/ecosystem/mux-logo.svg';
import pendulumLogo from '../../assets/icons/ecosystem/pendulum-logo.svg';
import cosmosLogo from '../../assets/icons/ecosystem/cosmos-logo.svg';
import zksyncLogo from '../../assets/icons/ecosystem/ZKSYNC-logo.svg';
import starkwareLogo from '../../assets/icons/ecosystem/starkware-logo.svg';

const logos: any = {
  ethereum: ethereumLogo,
  polygon: polygonLogo,
  bitcoin: bitcoinLogo,
  arbitrum: arbitrumLogo,
  aptos: aptosLogo,
  sui: suiLogo,
  fantom: fantomLogo,
  mux: muxLogo,
  pendulum: pendulumLogo,
  cosmos: cosmosLogo,
  zksync: zksyncLogo,
  starkware: starkwareLogo,
}

const Ecosystem = ({ showAll, tagSlug }: { showAll?: boolean, tagSlug?: string }) => {
  const location = useLocation();
  const nav = useNavigate()
  const [ecosystem, setEcosystem] = useState([])
  const [loader, setLoader] = useState(false)
  const { subtype = '' } = useParams()

  console.log("ecosystem", ecosystem)
  const pathname = location.pathname;
  const isNews = pathname === "/news"

  useEffect(() => {
    getEcosystemData()
  }, [])

  const getEcosystemData = () => {
    setLoader(true)
    getEcosystem().then(eco => {
      setLoader(false)
      setEcosystem(eco?.data && eco?.data || [])
    }).catch(err => {
      setLoader(false)
    })
  }

  const contentLoader = () => {
    return <Row className='max-w-3xl pt-10'>
      {[1, 2, 3, 4].map((item, i) => <Col key={i} xs={6} md={3} >
        <ContentLoader height={180} width={"100%"}>
          <rect x="20" y="0" rx="5" ry="5" width="100%" height="100%" />
        </ContentLoader>
      </Col>)}
    </Row>
  }

  return (
    <>
      <div>
        <section className='ecosystem-sec mt-5'>
          <Container>
            <Row>
              <Col lg={12}>
                <div className='text-center'>
                  {!isNews ?
                    <h2 className='heading-2 font-color-black'>Research by Ecosystem</h2> :
                    <h2 className='heading-2 font-color-black'>News by Ecosystem</h2>
                  }
                </div>
              </Col>
              {loader && contentLoader()}
              <div className="Resources-all-card mt-lg-5 mt-3">
                {showAll ?
                  <>
                    {!loader && ecosystem.length ? ecosystem.map((item: any, i: any) => (
                      <div style={{ border: subtype === item?.attributes?.slug ? "2px solid #43b6b2" : "" }} className="crypto-card" role="button" key={i} onClick={() => nav(`/${isNews ? "news" : "research"}/ecosystem/${item?.attributes && item?.attributes?.slug}`)}>
                        <div className="card-image">
                          <img src={logos[item?.attributes?.slug.replaceAll(' ', '')]} alt="" className='img-fluid mx-auto' />
                        </div>
                        <div className='mt-2'>
                          <p className='color-black fw-600'>{item?.attributes?.name}</p>
                        </div>
                      </div>
                    )) : loader ? null : <Col xs={12} className="mb-10 mt-10"><p className='font-semibold text-lg text-center'>No {isNews ? "news" : "research"} found.</p></Col>}
                  </> :
                  <>
                    {!loader && ecosystem.length ? ecosystem.slice(0, 10).map((item: any, i: any) => (
                      <div style={{ border: subtype === item?.attributes?.slug ? "2px solid #43b6b2" : "" }} className="crypto-card" role="button" key={i} onClick={() => nav(`/${isNews ? "news" : "research"}/ecosystem/${item?.attributes && item?.attributes?.slug}`)}>
                        <div className="card-image">
                          <img src={logos[item?.attributes?.slug.replaceAll(' ', '')]} alt="" className='img-fluid mx-auto' />
                        </div>
                        <div className='mt-2'>
                          <p className='color-black fw-600'>{item?.attributes?.name}</p>
                        </div>
                      </div>
                    )) : loader ? null : <Col xs={12} className="mb-10 mt-10"><p className='font-semibold text-lg text-center'>No {isNews ? "news" : "research"} found.</p></Col>}
                  </>
                }

              </div>
              {!showAll &&
                <>
                  {ecosystem && ecosystem?.length > 10 ?
                    <Col lg={12}>
                      <div className='text-center'>
                        <button className='primary-btn' onClick={() => nav(`/${isNews ? "news" : "research"}/ecosystem`)} >View All</button>
                      </div>
                    </Col> : ""
                  }
                </>
              }
            </Row>
          </Container>
        </section>
      </div>
    </>
  )
}

export default Ecosystem