import React, { useEffect, useState } from 'react'
import "./podcasts-card.sass"
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import PodcastsHero from '../../assets/no-img.webp';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllCategories, getPodcastData } from '../../api/posts';
import ContentLoader from 'react-content-loader';
import PostContentLoader from '../post-card/PostContentLoader';
import Pagination from '../Pagination';
import Podcastscmp from '../podcasts-cmp/podcasts-cmp';
import Allhero from '../all-hero/all-hero';

import defiLogo from '../../assets/icons/DeFi-logo-img.png';
import cryptoLogo from '../../assets/icons/crypto-logo-img.png';
import researchLogo from '../../assets/tag-1.svg';
import metaverseLogo from '../../assets/icons/Metaverse-logo-img.png';
import daosLogo from '../../assets/icons/DAOs-logo-img.png';
import regulationLogo from '../../assets/icons/Regulation-logo-img.png';
import dogecoinLogo from '../../assets/tag-1.svg';
import cryptogamingLogo from '../../assets/icons/crypto-gaming-logo.png';
import web3Logo from '../../assets/icons/Web3-logo-img.png';
import nftsLogo from '../../assets/icons/NFTs-logo-img.png';
import degenLogo from '../../assets/icons/Degen-logo-img.png';
import othersLogo from '../../assets/icons/other-icon.svg';

const totalLimit = 20

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

const Podcastscard = ({ showAll, tagSlug }: { showAll?: boolean, tagSlug?: string }) => {

    const location = useLocation();
    const nav = useNavigate()
    const pathname = location.pathname;
    const [trendingPosts, setTrendingPosts] = useState([])
    const [total, setTotal] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [loader, setLoader] = useState(false)
    const [catLoader, setCatLoader] = useState(false)
    const [categories, setCategories] = useState([])
    const [selectedTag, setSelectedTag] = useState<string>("")
    const element = document.getElementById("trending-cmp-id");
    const isAllPodcasts = pathname.includes("/all-podcasts")

    const getCategorysData = async () => {
        try {
            setLoader(true)
            await getAllCategories()
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        const data = res?.data?.data || []
                        setCategories(data)
                        setSelectedTag(tagSlug || data[0] && data[0]?.attributes && data[0]?.attributes?.slug || '')
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
    
    const getLatestPodCastsData = async (tag: string) => {
        try {
            setLoader(true)
            if (showAll) element?.scrollIntoView({ behavior: "smooth" });
            await getPodcastData(showAll ? currentPage * totalLimit : 0, showAll ? totalLimit : 8, "all-podcasts", false, tag, showAll)
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
    
    useEffect(() => {
        getCategorysData()
    }, [])
    
    useEffect(() => {
        if (selectedTag) {
            getLatestPodCastsData(selectedTag)
        }
    }, [selectedTag])
    
    const onChangeSelectedTag = (tag: string) => {
        if (showAll) {
            nav(`Podcast/all/${tag}`)
        }
        setSelectedTag(tag)
    }
    
    const onPageChange = (e: any) => {
        setCurrentPage(e.selected || 0)
    }
    
    
    const totalPages = Math.ceil(Number(total) / totalLimit)
    const contentLoader = () => {
        return <>
            {[1, 2, 3, 4, 5, 6].map((item, i) => <Col key={i} xs={6} md={4} lg={9}>
                <ContentLoader
                    speed={2}
                    width="100%"
                    height={160}
                    viewBox="0 0 400 160"
                    backgroundColor="#d1d1d1"
                    foregroundColor="#e3e3e3"
                >
                    <rect x="42.84" y="9.93" rx="5" ry="5" width="143.55" height="86.59" />
                    <rect x="192.84" y="9.67" rx="0" ry="0" width="148.72" height="12.12" />
                    <rect x="192.84" y="25.67" rx="0" ry="0" width="89" height="9" />
                    <rect x="42.84" y="107" rx="5" ry="5" width="143.55" height="86.59" />
                    <rect x="192.84" y="107" rx="0" ry="0" width="148.72" height="12.12" />
                    <rect x="192.84" y="123" rx="0" ry="0" width="89" height="9" />
                </ContentLoader>
            </Col>)}
        </>
    }
    return (
        <>
            <div>
                <section className= {isAllPodcasts ? 'Podcastscard-sec all-Podcastscard-sec all-research-sec pt-lg-5 pt-3' : "Podcastscard-sec all-research-sec pt-lg-5 pt-3"}>
                    <Container>
                        <div className='podcast-bg'>
                        {showAll ? <Allhero/> :
                            <h2 className='heading-2 color-black text-center'>Browse All Podcasts</h2>
                        }
                            <div className='mt-lg-5'>
                                <Tab.Container id="left-tabs-example1" activeKey={selectedTag} onSelect={(key: any) => onChangeSelectedTag(key)}>
                                    <Row>
                                        {catLoader ? contentLoader() : <Col lg={3}>
                                            <Nav variant="pills" className="podcasts-buttons curated-buttons justify-content-lg-center gap-lg-3 gap-md-2 gap-1 my-lg-0 my-3">
                                                {categories && categories?.map((item: any, i: any) => (
                                                    <Nav.Item key={i}>
                                                        <Nav.Link eventKey={item?.attributes?.slug}><img src={logos[item?.attributes?.slug.replaceAll(' ', '')] || researchLogo} className="img-fluid" alt="" /><span className='button-name all-tags'>{item?.attributes?.name}</span></Nav.Link>
                                                    </Nav.Item>
                                                ))}
                                            </Nav>
                                        </Col>}
                                        <Col lg={9}>
                                            <Tab.Content id="tabs-content">
                                                {categories && categories?.map((item: any, i: any) => (
                                                    <Tab.Pane key={i} eventKey={item?.attributes?.slug}>
                                                        {/* <Row> */}
                                                            {loader && <PostContentLoader showAll />}
                                                            {!loader && trendingPosts.length ? trendingPosts.map((post: any, index: number) => (
                                                                <Podcastscmp
                                                                    key={index}
                                                                    slug={post?.attributes?.slug}
                                                                    title={post?.attributes?.title}
                                                                    tags={post?.attributes?.tags}
                                                                    thumbnailUrl={post?.attributes?.imageUrl}
                                                                    duration={post?.attributes?.duration}
                                                                    author={post?.attributes?.author}
                                                                    guest={post?.attributes?.guest}
                                                                />
                                                            )) : loader ? null : <Col xs={12} className="mb-10 mt-10"><p className='font-semibold text-lg color-black text-center'>No podcasts found.</p></Col>}
                                                        {/* </Row> */}
                                                    </Tab.Pane>
                                                ))}
                                            </Tab.Content>
                                        </Col>
                                    </Row>
                                </Tab.Container >
                                {(catLoader || loader || trendingPosts.length === 0) ? null : showAll ? <>
                                    <Pagination
                                        page={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={onPageChange}
                                    />
                                </>
                                    : <div className='text-center'>
                                        <button className='primary-btn' onClick={() => nav(`/podcasts/all-podcasts/${selectedTag}`)}>View All</button>
                                    </div>}
                            </div>
                        </div>
                    </Container>
                </section>
            </div>
        </>
    )
}

export default Podcastscard