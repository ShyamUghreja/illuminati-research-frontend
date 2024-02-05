import React, { useEffect, useState } from 'react'
import "./twitter-blogs.sass"
import { Col, Container, Row } from 'react-bootstrap';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { getTweets } from '../../api/posts';
import ContentLoader from 'react-content-loader';
import SquareRed from '../../assets/icons/square-red.svg';


const Twitterblogs = () => {

    const [tweets, setTweets] = useState([])
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setLoader(true)
        getTweets().then((data) => {
            setLoader(false)
            setTweets(data.data || [])
        }).catch(err => {
            setLoader(false)
        })
    }, [])

    const contentLoader = () => {
        return <>
            {
                [...new Array(3)].map((item, i) => {
                    return <Col xs={12} sm={6} md={4} lg={4} key={i}>
                        <ContentLoader height={250} width={"100%"} backgroundColor='#dbdbdb'>
                            <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
                        </ContentLoader>
                    </Col>
                })
            }
        </>
    }

    return (
        <div>
            <section className='twitter-sec'>
                <Container>
                    <div className='mt-lg-5 mt-md-4 mt-3'>
                        <div className=''>
                            <h2 className='heading-2 font-color-black'>What we’re saying on <span className='fw-700'>Twitter</span></h2>
                        </div>
                        <div className='mt-lg-4 mt-3'>
                            <Row>
                                {loader && contentLoader()}
                                {!loader && tweets.length ? tweets.map((item: any, i: any) => (
                                    <Col xs={12} sm={6} md={6} lg={6} key={i} className='mt-3'>
                                        <div role='button' className="say-on-twitter-card" >
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <div className='twitter-heading'>
                                                    <h4 className='heading-4 mb-0 color-white'>{item?.attributes?.name}</h4>
                                                    <a className='medium-p ' href={item?.attributes?.profileUrl} rel="noreferrer" target='_blank'>@{item?.attributes?.username}</a>
                                                </div>
                                                <div className="twitter-icon">
                                                    <i className="ri-twitter-fill"></i>
                                                </div>
                                            </div>
                                            <a className='paragraph-small color-white no-underline' rel="noreferrer" href={item?.attributes?.tweetUrl} target='_blank'>{item?.attributes?.tweet}</a>
                                        </div>
                                    </Col>

                                )) : !loader ? <div className='my-10 mt-10' ><p className='text-center font-bold'>No Tweets found</p></div> : null}
                            </Row>
                        </div>
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
        </div>
    )
}

export default Twitterblogs