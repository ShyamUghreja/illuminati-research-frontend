import React, { useEffect, useState } from 'react'
import "./all-research.sass"
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap'
// import HeroImg from '../../assets/HeroImg.svg';
import Tag from '../../assets/tag-1.svg';
// import Tag2 from '../../assets/tag-2.svg';
// import Tag3 from '../../assets/tag-3.svg';
// import Tag4 from '../../assets/tag-4.svg';
// import Tag5 from '../../assets/tag-5.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import Post from '../post-card/Post';
import { getAllCategories, getNewsData } from '../../api/posts';
import PostContentLoader from '../post-card/PostContentLoader';
import ContentLoader from 'react-content-loader';
import Pagination from '../Pagination';
import Allhero from '../all-hero/all-hero';

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
import othersLogo from '../../assets/icons/other-icon.svg'; //set when logo comes

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

const totalLimit = 10

const Allresearch = ({ showAll, tagSlug }: { showAll?: boolean, tagSlug?: string }) => {
  const location = useLocation();
  const nav = useNavigate()
  const pathname = location.pathname;

  const [AllResearchData, setallResearchData] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [loader, setLoader] = useState(false)
  console.log("currentPage",currentPage)

  const [categories, setCategories] = useState([])
  const [catLoader, setCatLoader] = useState(false)
  const [selectedTag, setSelectedTag] = useState<string>("")

  const element = document.getElementById("research-section");

  const isNews = pathname.includes("/news")

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

  const getLatestNewsData = async (tag: string) => {
    try {
      setLoader(true)
      if (showAll) element?.scrollIntoView({ behavior: "smooth" });
      
      await getNewsData(showAll ? currentPage * totalLimit : 0, showAll ? totalLimit : 8, "Research-hub", isNews ? "news" : "research", false, tag, showAll)
        .then(async (res: any) => {
          if (res?.status === 200) {
            let allArticle = res?.data?.data || []
            setallResearchData(allArticle)
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
      getLatestNewsData(selectedTag)
    }
  }, [selectedTag, currentPage, showAll])

  const onChangeSelectedTag = (tag: string) => {
    if (showAll) {
      nav(`/${isNews ? "news" : "research"}/all/${tag}`)
    }
    setSelectedTag(tag)
  }

  const onPageChange = (e: any) => {
    setCurrentPage(e.selected || 0)
  }

  const totalPages = Math.ceil(Number(total) / totalLimit)
  console.log('totalPages', totalPages);
  
  const contentLoader = () => {
    return <>
      {[1, 2, 3, 4, 5, 6].map((item, i) => <Col key={i} xs={6} md={4} lg={2}>
        <ContentLoader viewBox="0 0 600 200" height={130} width={"100%"}>
          <rect x="20" y="0" rx="5" ry="5" width="100%" height="100px" />
        </ContentLoader>
      </Col>)}
    </>
  }

  return (
    <>{showAll && <Allhero />}
      <div id="research-section" className={showAll ? 'other-main-div pb-5' : 'other-main-div py-5'} >
        <section className='all-research-sec pt-lg-5'>
          <Container>
            <Row>
              {showAll ? null :
                <Col lg={12}>
                  <div className='text-center'>
                    {isNews ?
                      <h2 className='heading-2 font-color-black'>Browse All News</h2> :
                      <h2 className='heading-2 font-color-black'>Browse All Research</h2>
                    }
                  </div>
                </Col>
              }
              <Tab.Container id="left-tabs-example1" activeKey={selectedTag} onSelect={(key: any) => onChangeSelectedTag(key)}>
                {catLoader ? contentLoader() : <Col lg={12}>
                  <Nav variant="pills" className="curated-buttons justify-content-lg-center my-lg-5 my-3 gap-lg-3 gap-md-2 gap-2">
                    {categories && categories?.map((item: any, i: any) => (
                      <Nav.Item key={i}>
                        <Nav.Link eventKey={item?.attributes?.slug}><img src={logos[item?.attributes?.slug.replaceAll(' ', '')] || Tag} className="img-fluid" alt="" /><span className='button-name all-tags'>{item?.attributes?.name}</span></Nav.Link>
                      </Nav.Item>
                    ))}
                  </Nav>
                </Col>}
                <Tab.Content id="tabs-content">
                  {categories && categories?.map((item: any, i: any) => (
                    <Tab.Pane key={i} eventKey={item?.attributes?.slug}>
                      <Row>
                        {loader && <PostContentLoader showAll />}
                        {!loader && AllResearchData.length ? AllResearchData.map((post: any, index: number) => (
                          <Post
                            key={index}
                            indexPosition={index}
                            slug={post?.attributes?.slug}
                            title={post?.attributes?.title}
                            subTitle={post?.attributes?.subtitle}
                            author={post?.attributes?.author}
                            tags={post?.attributes?.tags}
                            thumbnailUrl={post?.attributes?.thumbnailUrl}
                            imageUrl={post?.attributes?.imageUrl}
                            publishDate={post?.attributes?.publishDate}
                            published={post?.attributes?.published}
                          />
                        )) : loader ? null : <Col xs={12} className="mb-10 mt-10"><p className='font-semibold text-lg text-center'>No {isNews ? "news" : "research"} found.</p></Col>}
                      </Row>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Tab.Container >

              {(catLoader || loader || AllResearchData.length === 0) ? null : showAll ? <>
                <Pagination
                  page={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                />
              </>
                : <div className='text-center'>
                  <button className='primary-btn' onClick={() => nav(`/${isNews ? "news" : "research"}/all/${selectedTag}`)}>View All</button>
                </div>}
            </Row>
          </Container>
        </section>
      </div>
    </>
  )
}

export default Allresearch