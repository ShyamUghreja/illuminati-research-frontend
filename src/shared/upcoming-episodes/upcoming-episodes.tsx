import React, { useEffect, useState } from 'react'
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllCategories, getUpcomingData } from '../../api/posts';
import PostContentLoader from '../post-card/PostContentLoader';
import Pagination from '../Pagination';
import Episodes from '../episodes-card/episodes';
import ContentLoader from 'react-content-loader';
import Tag from '../../assets/tag-1.svg';
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

const Upcomingepisodes = ({ showAll, tagSlug }: { showAll?: boolean, tagSlug?: string }) => {

  const location = useLocation();
  const nav = useNavigate()
  const pathname = location.pathname;
  const [upcomingPost, setUpcomingPost] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [loader, setLoader] = useState(false)
  const [selectedTag, setSelectedTag] = useState<string>("")
  const [categories, setCategories] = useState([])
  const splitLocation = pathname.split("/");
  const isNews = pathname.includes("/news")
  const element = document.getElementById("trending-cmp-id");
  const [catLoader, setCatLoader] = useState(false)

  const getLatestNewsData = async (currentPage: number, tag: string) => {
    try {
      setLoader(true)
      if (showAll) element?.scrollIntoView({ behavior: "smooth" });
      await getUpcomingData(showAll ? currentPage * totalLimit : 0, showAll ? totalLimit : 4, "upcoming", tag, showAll)
        .then(async (res: any) => {
          if (res?.status === 200) {
            let allArticle = res?.data?.data || []
            setUpcomingPost(allArticle)
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

  function toTitleCase(str: any) {
    if (str != undefined && str != "") {
      return str.replace(
        /\w\S*/g,
        function (txt: any) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
      );
    }
  }

  const getCategoriesData = async () => {
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
    getCategoriesData()
  }, [])

  useEffect(() => {
    if (selectedTag) {
      getLatestNewsData(currentPage, selectedTag)
    }
  }, [selectedTag, currentPage, showAll])

  const onChangeSelectedTag = (tag: string) => {
    if (showAll) {
      nav(`/${splitLocation[1]}/upcoming-episodes/${tag}`)
    }
    setSelectedTag(tag)
  }

  const onPageChange = (e: any) => {
    setCurrentPage(e.selected || 0)
  }

  const totalPages = Math.ceil(Number(total) / totalLimit)

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
    <div className='other-main-div'>
      <section id="trending-cmp-id" className='research-card-sec pt-lg-5 pt-3'>
        <Container>
          <div className='d-block d-lg-flex d-md-flex justify-content-between mb-lg-5 mb-3 align-items-center'>
            {/* {pathname === "/news" &&
                <h2 className='heading-2 font-color-black'>Trending News</h2>
              }
              {pathname === "/research" &&
                <h2 className='heading-2 fw-600'>Trending Research</h2>
              } */}
            {pathname === "/podcasts" &&
              <h2 className='heading-2 fw-600'>Upcoming Episodes</h2>
            }
            {/* {showAll ? null :
              <div className='text-center'>
                <button className='primary-btn' onClick={() => nav(`/${splitLocation[1]}/upcoming-episodes/`)}>View All</button>
              </div>
            } */}
          </div>
          {showAll ?
            <>
              <Tab.Container id="left-tabs-example1" activeKey={selectedTag} onSelect={(key: any) => onChangeSelectedTag(key)} >
                {showAll && <>
                  {catLoader ? contentLoader() :
                    <Col lg={12} className='all-research-sec'>
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
                        {!loader && upcomingPost.length ? upcomingPost.map((item: any, index: number) => (
                          <Episodes
                            key={index}
                            slug={item?.attributes?.slug}
                            title={item?.attributes?.title}
                            guest={toTitleCase(item?.attributes?.guest)}
                            host={toTitleCase(item?.attributes?.host)}
                            tags={item?.attributes?.tags}
                          />
                        )) : loader ? null : <Col xs={12} className="mb-10 mt-10"><p className='font-semibold text-lg text-center'>No {isNews ? "news" : "research"} found.</p></Col>}
                      </Row>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Tab.Container >
              {(catLoader || loader || upcomingPost.length === 0) ? null : showAll ? <>
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
              {!loader && upcomingPost.length ? upcomingPost.map((item: any, index: number) => (
                <Episodes
                  key={index}
                  slug={item?.attributes?.slug}
                  title={item?.attributes?.title}
                  guest={toTitleCase(item?.attributes?.guest)}
                  host={toTitleCase(item?.attributes?.host)}
                  tags={item?.attributes?.tags}
                />
              )) : loader ? null : <Col xs={12} className="mb-10 mt-10"><p className='font-semibold text-lg text-center'>No {isNews ? "news" : "research"} found.</p></Col>}
            </Row>
          }
        </Container>
        {showAll && <Pagination
          theme="light"
          page={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />}
      </section>
    </div>
  )
}

export default Upcomingepisodes