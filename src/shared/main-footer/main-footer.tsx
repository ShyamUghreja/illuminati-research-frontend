import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { getAllCategories, getNewsData, getPosts } from '../../api/posts'
import Logo from "../../assets/crypto-logo.svg";
import { Link, useLocation } from 'react-router-dom';
import moment from "moment"
import "./main-footer.sass"

const totalLimit = 5

const socialLinks = [
  {
    name: "Twitter",
    icon: <i className="ri-twitter-fill"></i>,
    link: "https://twitter.com/0x_illuminati",
  },
  {
    name: "Linkedin",
    icon: <i className="ri-linkedin-fill"></i>,
    link: "https://www.linkedin.com/company/0x-illuminati",
  },
  // {
  //   name: "Facebook",
  //   icon: facebookIcon,
  //   link: "",
  // },
  // {
  //   name: "Pinterest",
  //   icon: pinterestIcon,
  //   link: "",
  // },
  // {
  //   name: "Instagram",
  //   icon: instagramIcon,
  //   link: "",
  // },
]

const quickLinks = [
  {
    name: "About",
    path: "/about-us",
  },
  {
    name: "Research",
    path: "/research",
  },
  {
    name: "News",
    path: "/news",
  },
  {
    name: "Podcasts",
    path: "/podcasts",
  },
  {
    name: "Advertise with us",
    path: "/advertise",
  },
  {
    name: "Cross Promo",
    path: "/cross-promotion",
  }
]


function MainFooter({ showAll, tagSlug }: { showAll?: boolean, tagSlug?: string }) {
  const location = useLocation()
  const [categories, setCategories] = useState([])
  const [trendingPosts, setTrendingPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(0)


  const getCategorysData = async () => {
    try {
      await getAllCategories()
        .then(async (res: any) => {
          if (res?.status === 200) {
            const data = res?.data?.data || []
            setCategories(data)
            // setSelectedTag(data[0] && data[0]?.attributes && data[0]?.attributes?.slug || '')
          }
        }).catch((err: any) => {
        })
    }
    catch (err: any) {
      return { error: err?.response?.data };
    }
  };
  const getLatestNewsData = async (currentPage: number,) => {
    try {
      // if (showAll) element?.scrollIntoView({ behavior: "smooth" });
      await getNewsData(showAll ? currentPage * totalLimit : 0, showAll ? totalLimit : 5, "Footer-trending", "news", true)
        .then(async (res: any) => {
          if (res?.status === 200) {
            let allArticle = res?.data?.data || []
            setTrendingPosts(allArticle)
            // setTotal(res?.data?.meta?.pagination?.total || 0)
          }
        }).catch((err: any) => {
        })
    }
    catch (err: any) {
      return { error: err?.res?.data };
    }
  };

  useEffect(() => {
    getCategorysData()

  }, [])
  useEffect(() => {
  getLatestNewsData(currentPage)

  }, [])
  const onPageChange = (e: any) => {
    setCurrentPage(e.selected || 0)
}

  return (
    <div className='footer-container bg-black text-white overflow-hidden pt-10 pb-10'>
      <Container>
        <Row>
          <Col xs={12}>
            <img src={Logo} alt="" />
          </Col>
        </Row>
        <hr className='my-4' />
        <Row>
          <Col xs={12} sm={6} md={4}>
            <div className='text-start sm:w-fit sm:m-auto md:m-0'>
              <h5 className="my-4 text-neutral-100">Most Popular</h5>
              <ul className='p-0 m-0'>
                {trendingPosts && trendingPosts.map((post: any, i:number) => {
                  return <li key={i} className='my-3'>
                    <Link className='text-neutral-400 hover:text-inherit no-underline' to={post?.attributes?.slug && `/post/${post?.attributes?.slug}`}>{post?.attributes?.title}</Link>
                  </li>
                })
                }
              </ul>
            </div>
          </Col>

          <Col xs={6} sm={6} md={4}>
            <div className='text-start sm:w-fit sm:m-auto'>
              <h5 className="my-4 text-neutral-100">Categories</h5>
              <ul className='p-0 m-0'>
                {categories.length && categories.map((cat: any, i: number) => {
                  return <li key={i} className='my-3'>
                    <Link className='text-neutral-400 hover:text-inherit no-underline' to={cat?.attributes?.slug && `/research/all/${cat?.attributes?.slug}`}>{cat?.attributes?.name}</Link>
                  </li>
                })}

              </ul>
            </div>
          </Col>
          <Col xs={6} sm={6} md={4}>
            <div className='text-start sm:w-fit sm:m-auto'>
              <h5 className="my-4 text-neutral-100">Quick Links</h5>
              <ul className='p-0 m-0'>
                {
                  quickLinks.map((link:any, i:number) => {
                    return <li key={i} className='my-3'>
                      <Link className='text-neutral-400 hover:text-inherit no-underline' to={link.path && link.path}>{link.name}</Link>
                    </li>
                  })
                }
              </ul>
            </div>
          </Col>

        </Row>
        <hr className='my-4 md:my-5' />
        <Row>
          <Col xs={12} md={6} className='text-start'>
            <span className='text-neutral-400'>@ {moment().format("yyyy")} www.0xilluminati.com. All rights reserved</span>
          </Col>
          <Col xs={12} md={6}>
            <div className='block flex justify-end items-center sm:mt-3 md:mt-0'>
              {/* <span className='mr-3 text-neutral-400'>Social Media :</span> */}
              <span className='flex items-center block'>
                {
                  socialLinks.map((social: any, i: any) => {
                    return <a className='mx-2 text-neutral-400 hover:text-inherit no-underline' key={i} href={social.link && social.link} target='_blank'>{social.icon}</a>
                  })
                }
              </span>

            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default MainFooter