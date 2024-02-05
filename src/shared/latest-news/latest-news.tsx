/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import "./latest-news.sass"
import { Col, Container, Row, Tab, Nav } from 'react-bootstrap';
import { getAllCategories, getNewsData } from '../../api/posts';
import moment from "moment"
import { useLocation, useNavigate } from 'react-router-dom';
import ContentLoader from 'react-content-loader';
import HeroImg from '../../assets/no-img.webp';
import Pagination from '../Pagination';
import Tag from '../../assets/tag-1.svg';
import Allhero from '../all-hero/all-hero';
import PostContentLoader from '../post-card/PostContentLoader';

import defiLogo from '../../assets/icons/DeFi-logo-img.png';
import cryptoLogo from '../../assets/icons/crypto-logo-img.png';
import researchLogo from '../../assets/tag-1.svg'; // not in category
import metaverseLogo from '../../assets/icons/Metaverse-logo-img.png';
import daosLogo from '../../assets/icons/DAOs-logo-img.png';
import regulationLogo from '../../assets/icons/Regulation-logo-img.png';
import dogecoinLogo from '../../assets/tag-1.svg'; // not in category
import cryptogamingLogo from '../../assets/icons/crypto-gaming-logo.png';
import web3Logo from '../../assets/icons/Web3-logo-img.png';
import nftsLogo from '../../assets/icons/NFTs-logo-img.png';
import degenLogo from '../../assets/icons/Degen-logo-img.png';
import othersLogo from '../../assets/icons/other-icon.svg';

const logos: any = {
  defi: defiLogo,
  crypto: cryptoLogo,
  research: researchLogo,
  metaverse: metaverseLogo,
  daos: daosLogo,
  regulation: regulationLogo,
  cryptogaming: cryptogamingLogo,
  dogecoin: dogecoinLogo,
  web3: web3Logo,
  nfts: nftsLogo,
  degen: degenLogo,
  others: othersLogo,
}

const totalLimit = 18

const Latestnews = ({ showAll, tagSlug }: { showAll?: boolean, tagSlug?: string }) => {
    const nav = useNavigate()
    const [posts, setPosts] = useState([])
    const [loader, setLoader] = useState(false)
    const [total, setTotal] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [trendingPosts, setTrendingPosts] = useState([])
    const location = useLocation()
    const pathname = location.pathname || ''
    const isNews = pathname.includes("/news")
    const splitLocation = pathname.split("/");

    const element = document.getElementById("all-news-id");
    const [catLoader, setCatLoader] = useState(false)
    const [selectedTag, setSelectedTag] = useState<string>("")
    const [categories, setCategories] = useState([])
    const startingCounter = useRef(0);
    let apiRequestDataSetLimit = 4

    const getLatestNewsData = async (currentPage: number, tag: string) => {
        try {
            setLoader(true)
            if (showAll) element?.scrollIntoView({ behavior: "smooth" });
            await getNewsData(showAll ? currentPage * totalLimit : 0, showAll ? totalLimit : 4, "Crypto-news", "news", false, tag, showAll)
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        let allArticle = res?.data?.data || []
                        setTrendingPosts(allArticle)
                        setTotal(res?.data?.meta?.pagination?.total || 0)
                        setLoader(false)
                    }
                }).catch((err: any) => {
                    setLoader(false)
                })
        }
        catch (err: any) {
            setLoader(false)
            return { error: err?.res?.data };
        }
    };

    const getCategorysData = async () => {
        try {
            setLoader(true)
            await getAllCategories()
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        const data = res?.data?.data || []
                        setCategories(data)
                        setSelectedTag(data[0] && data[0]?.attributes && data[0]?.attributes?.slug || '')
                        setLoader(false)
                    }
                }).catch((err: any) => {
                    setLoader(false)
                })
        }
        catch (err: any) {
            setLoader(false)
            return { error: err?.response?.data };
        }
    };

    useEffect(() => {
        getCategorysData()
    }, [])

    useEffect(() => {
        if (selectedTag) {
            getLatestNewsData(currentPage, selectedTag)
        }
    }, [selectedTag, currentPage, showAll])

    const onChangeSelectedTag = (tag: string) => {
        if (showAll) {
            nav(`/all-crypto-news/${tag}`)
        }
        setSelectedTag(tag)
    }

    const onPageChange = (e: any) => {
        setCurrentPage(e.selected || 0)
    }

    const totalPages = Math.ceil(Number(total) / totalLimit)

    const contentLoader = () => {
        return <>
            {[...new Array(4)].map((z, index) => {
                return <div key={index}>
                    <ContentLoader
                        width={"100%"}
                        backgroundColor={'#333'}
                        foregroundColor={'#999'}
                        height={175}
                    >
                        <rect x="0" y="40" rx="0" ry="0" height="15px" width="80%" />
                        <rect x="0" y="70" rx="0" ry="0" height="15px" width="50%" />
                        <rect x="0" y="100" rx="0" ry="0" height="15px" width="100px" />
                        <circle cx="96%" cy="65" r="24" />
                    </ContentLoader>
                </div>
            })}
        </>
    }

    return (
        <div className={showAll ? 'other-main-div' : ""}>
            {showAll && <Allhero />}
            <section className='latest-news-sec mt-5' id='all-news-id'>
                <Container>
                    <div className='latest-news'>

                        <>
                            <div className='mb-lg-4 mb-md-3 mb-2 d-lg-flex d-md-flex d-block justify-content-between align-items-center'>
                                <h2 className='heading-2 color-black mb-3 mb-lg-0 mb-md-0'>Latest <span className='fw-800'>Crypto</span> News</h2>
                                {showAll ? null :
                                    <div>
                                        <button className='view-button-white' onClick={() => nav(`/all-crypto-news/${selectedTag}`)}>See All News <i className="ri-arrow-right-line"></i></button>
                                    </div>
                                }
                            </div>
                            <hr className='color-black mb-4' />
                        </>
 
                        {showAll ?
                            <>
                                <Tab.Container id="left-tabs-example1" activeKey={selectedTag} onSelect={(key: any) => onChangeSelectedTag(key)} >
                                    {showAll && <>
                                        {catLoader ? contentLoader() :
                                            <Col className='all-research-sec' lg={12}>
                                                <Nav variant="pills" className="curated-buttons white-bg justify-content-lg-center my-lg-5 my-3 gap-lg-3 gap-md-2 gap-1">
                                                    {categories && categories?.map((item: any, i: any) => (
                                                        <Nav.Item key={i}>
                                                            <Nav.Link eventKey={item?.attributes?.slug}><img src={logos[item?.attributes?.slug.replaceAll(' ', '')] || Tag} className="img-fluid" alt="" /><span className='button-name all-tags'>{item?.attributes?.name}</span></Nav.Link>
                                                        </Nav.Item>
                                                    ))}
                                                </Nav>
                                            </Col>}
                                    </>
                                    }
                                    <Tab.Content id="tabs-content">
                                        {categories && categories?.map((item: any, i: any) => (
                                            <Tab.Pane key={i} eventKey={item?.attributes?.slug}>
                                                <Row>
                                                    {loader && <PostContentLoader showAll />}
                                                    {!loader && trendingPosts.length ? trendingPosts.map((post: any, i: number) => (
                                                        <React.Fragment key={i}>
                                                            <div className="d-block d-lg-flex d-md-flex align-items-end mb-4">
                                                                <div className="news-image">
                                                                    <img src={post?.attributes && post?.attributes?.thumbnailUrl || HeroImg} className='img-fluid' alt="" />
                                                                </div>
                                                                <hr className='my-2 color-black d-block d-lg-none d-md-none' />
                                                                <div className="w-100">
                                                                    <div className='d-flex justify-content-between align-items-center'>
                                                                        <div className='news-content'>
                                                                            <h4 className="heading-4 mb-0 color-black" >{post?.attributes?.title}</h4>
                                                                            <p className='medium-p mt-2 color-light-black'>{post?.attributes?.publishDate && moment(post?.attributes?.publishDate).format("MMM DD, yyyy") || "-"}</p>
                                                                        </div>
                                                                        <div className='news-btn'>
                                                                            <i className="ri-arrow-right-line" onClick={() => nav(`/post/${post?.attributes?.slug}`)}></i>
                                                                        </div>
                                                                    </div>
                                                                    <hr className='mt-3 mb-0 color-black d-none d-lg-flex d-md-flex' />
                                                                </div>
                                                            </div>
                                                        </React.Fragment>
                                                    )) : loader ? null : <Col xs={12} className="mb-10 mt-10"><p className='font-semibold text-lg text-center'>No {isNews ? "news" : "research"} found.</p></Col>}
                                                </Row>
                                            </Tab.Pane>
                                        ))}
                                    </Tab.Content>
                                </Tab.Container >
                                {(catLoader || loader || trendingPosts.length === 0) ? null : showAll ? <>
                                    <Pagination
                                        page={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={onPageChange}
                                    />
                                </>
                                    : ""}
                            </>
                            :
                            <div>
                                {!loader && trendingPosts.length ? trendingPosts.map((item: any, i) => {
                                    return <React.Fragment key={i}>
                                        <div className="d-block d-lg-flex d-md-flex align-items-end mb-4">
                                            <div className="news-image">
                                            <img src={item?.attributes && item?.attributes?.thumbnailUrl || HeroImg} className='img-fluid' alt="" />
                                            </div>
                                            <hr className='my-2 color-black d-block d-lg-none d-md-none' />
                                            <div className="w-100">
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <div className='news-content'>
                                                        <h4 className="heading-4 mb-0 color-black" >{item?.attributes?.title}</h4>
                                                        <p className='medium-p mt-2 color-light-black'>{item?.attributes?.publishDate && moment(item?.attributes?.publishDate).format("MMM DD, yyyy") || "-"}</p>
                                                    </div>
                                                    <div className='news-btn'>
                                                        <i className="ri-arrow-right-line" onClick={() => nav(`/post/${item?.attributes?.slug}`)}></i>
                                                    </div>
                                                </div>
                                                <hr className='mt-3 mb-0 color-black d-none d-lg-flex d-md-flex' />
                                            </div>
                                        </div>
                                    </React.Fragment>
                                }) : loader ? null : <Col xs={12} className="mb-10 mt-10"><p className='font-semibold text-lg text-center color-black'>No {isNews ? "news" : "research"} found.</p></Col>}
                            </div>
                        }
                    </div>
                </Container>
            </section>
        </div>
    )
}

export default Latestnews