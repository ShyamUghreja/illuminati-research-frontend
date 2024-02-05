import React, { useEffect, useState } from 'react'
import "./trending-cmp.sass"
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllCategories, getNewsData, getPodcastData } from '../../api/posts';
import Post, { IPost } from '../post-card/Post';
import PostContentLoader from '../post-card/PostContentLoader';
import Pagination from '../Pagination';
import Allhero from '../all-hero/all-hero';
import ContentLoader from 'react-content-loader';
import Tag from '../../assets/tag-1.svg';
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

const totalLimit = 20

const TrendingCmp = ({ showAll, tagSlug }: { showAll?: boolean, tagSlug?: string }) => {
  const location = useLocation();
  const nav = useNavigate()
  const pathname = location.pathname;
  const splitLocation = pathname.split("/");
  const [trendingPosts, setTrendingPosts] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [loader, setLoader] = useState(false)
  const [catLoader, setCatLoader] = useState(false)
  const [selectedTag, setSelectedTag] = useState<string>("")
  const [categories, setCategories] = useState([])
  const isNews = pathname.includes("/news")
  const isPodcasts = pathname.includes("/podcasts")
  const isTrending = pathname.includes("/trending")
  const element = document.getElementById("trending-cmp-id");

  const getAllPodcastData = async (currentPage: number, tag: string) => {
    try {
      setLoader(true)
      if (showAll) element?.scrollIntoView({ behavior: "smooth" });
      await getPodcastData(showAll ? currentPage * totalLimit : 0, showAll ? totalLimit : 4, "Podcast", true, tag, showAll)
        .then(async (res: any) => {
          if (res?.status === 200) {
            let allArticle = res?.data?.data || []
            console.log("allArticle", allArticle);
            // allArticle && allArticle.map((item: any, index: number) => (
            //   setTimeout(() => {
            //     const elm = window.document.getElementById(index+'')
            //     if (elm) {
            //       elm.innerHTML = item?.attributes?.description || ''
            //     }
            //   })
            // ))
            setTrendingPosts(allArticle)
            setTotal(res?.data?.meta?.pagination?.total || 0)
            {
              const elm = window.document.getElementById(`initial-news-post`)
              if (elm) {
                elm.innerHTML = allArticle?.attributes?.contentFree || ''
              }
            }
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

  const getLatestNewsData = async (currentPage: number, tag: string) => {
    try {
      setLoader(true)
      if (showAll) element?.scrollIntoView({ behavior: "smooth" });
      await getNewsData(showAll ? currentPage * totalLimit : 0, showAll ? totalLimit : 4, "Trending", isNews ? "news" : "research", true, tag, showAll)
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
    if (isPodcasts) {
      if (selectedTag) {
        getAllPodcastData(currentPage, selectedTag)
      }
    } else {
      if (selectedTag) {
        getLatestNewsData(currentPage, selectedTag)
      }
    }
  }, [selectedTag, currentPage, showAll])

  const onChangeSelectedTag = (tag: string) => {
    if (showAll) {
      nav(`/${splitLocation[1]}/trending/${tag}`)
    }
    setSelectedTag(tag)
  }

  const onPageChange = (e: any) => {
    setCurrentPage(e.selected || 0)
  }

  const totalPages = Math.ceil(Number(total) / totalLimit)

  console.log("trendingPoststrendingPosts", trendingPosts)
  const contentLoader = () => {
    return <>
      {[1, 2, 3, 4, 5, 6].map((item, i: number) => <Col key={i} xs={6} md={4} lg={2}>
        <ContentLoader viewBox="0 0 600 200" height={130} width={"100%"}>
          <rect x="20" y="0" rx="5" ry="5" width="100%" height="100px" />
        </ContentLoader>
      </Col>)}
    </>
  }

  return (
    <>
      {isTrending && <Allhero />}
      <div className='other-main-div'>
        <section id="trending-cmp-id" className='all-research-sec research-card-sec pt-lg-5 pt-3'>
          <Container>
            <div className='d-flex justify-content-between mb-lg-5 mb-3 align-items-center'>
              {pathname === "/news" &&
                <h2 className='heading-2 font-color-black'>Trending News</h2>
              }
              {pathname === "/research" &&
                <h2 className='heading-2 fw-600'>Trending Research</h2>
              }
              {pathname === "/podcasts" &&
                <h2 className='heading-2 fw-600'>Trending podcasts</h2>
              }
              {showAll ? null :
                <div className='text-center'>
                  <button className='primary-btn' onClick={() => nav(`/${splitLocation[1]}/trending/${selectedTag}`)}>View All</button>
                </div>
              }
            </div>
            {showAll ?
              <>
                <Tab.Container id="left-tabs-example1" activeKey={selectedTag} onSelect={(key: any) => onChangeSelectedTag(key)} >
                  {showAll && <>
                    {catLoader ? contentLoader() :
                      <Col lg={12}>
                        <Nav variant="pills" className="curated-buttons justify-content-lg-center my-lg-5 my-3 gap-lg-3 gap-md-2 gap-1">
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
                          {!loader && trendingPosts.length ? trendingPosts.map((post: any, index: number) => (
                            <Post
                              key={index}
                              indexPosition={index}
                              slug={post?.attributes?.slug}
                              title={post?.attributes?.title}
                              subTitle={isPodcasts ? post?.attributes?.description : post?.attributes?.subtitle}
                              author={post?.attributes?.author}
                              tags={post?.attributes?.tags}
                              thumbnailUrl={isPodcasts ? post?.attributes?.imageUrl : post?.attributes?.thumbnailUrl}
                              imageUrl={post?.attributes?.imageUrl}
                              publishDate={post?.attributes?.publishDate}
                              published={isPodcasts ? post?.attributes?.published : post?.attributes?.published}
                            />
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
              <Row>
                {loader && <PostContentLoader />}
                {!loader && trendingPosts.length ? trendingPosts.map((item: any, index: number) => (
                  <Post
                    key={index}
                    indexPosition={index}
                    slug={item?.attributes?.slug}
                    title={item?.attributes?.title}
                    subTitle={isPodcasts ? item?.attributes?.description : item?.attributes?.subtitle}
                    author={item?.attributes?.author}
                    tags={item?.attributes?.tags}
                    thumbnailUrl={item?.attributes?.thumbnailUrl}
                    imageUrl={item?.attributes?.imageUrl}
                    publishDate={item?.attributes?.publishDate}
                    published={item?.attributes?.published}
                  />
                )) : loader ? null : <Col xs={12} className="mb-10 mt-10"><p className='font-semibold text-lg text-center'>No {isNews ? "news" : "research"} found.</p></Col>}
              </Row>
            }
          </Container>
        </section>
      </div>
    </>
  )
}

export default TrendingCmp