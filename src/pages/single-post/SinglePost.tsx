import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getNextNewsArticle, getPostById } from '../../api/posts'
import Arrow from '../../assets/Arrow.svg';
import ContentLoader from 'react-content-loader';
import { Col, Button, Container, Form } from 'react-bootstrap';
import "./single-post.sass"
import Scrolcon from '../../assets/icons/infinite-scroll-icon.svg';

function getScrollPercent() {
  // e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
  var h: any = document.documentElement,
    b: any = document.body,
    st: any = "scrollTop",
    sh: any = "scrollHeight";
  return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
}

function SinglePost() {
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()
  const nav = useNavigate()
  const [loader, setLoader] = useState(false)
  const slug = params.slug as string
  const nextPostLoaderRef = useRef(false)
  const excludeSlugRef = useRef('')
  const categorySlugRef = useRef('')
  const [openScrollModel, setOpenScrollModel] = useState(false)

  const onHandleScroll = () => {
      if (!nextPostLoaderRef.current && getScrollPercent() > 90) {
        getNextPostBy()
        setOpenScrollModel(true)
      }
      if (!nextPostLoaderRef.current && getScrollPercent() > 80) {
        setOpenScrollModel(true)
      }
  }

  const getNextPostBy = () => {
    nextPostLoaderRef.current = true
    setIsLoading(prev => !prev)
    if(categorySlugRef.current && excludeSlugRef.current){
      setLoader(true)
      getNextNewsArticle(categorySlugRef.current, excludeSlugRef.current).then(dataset => {
        setOpenScrollModel(false)
        setIsLoading(prev => !prev)
        let data : any = dataset?.data || {}
        setLoader(false)
        setTimeout(() => {
          const nextDiv = document.createElement("div");
          const divider = document.createElement("hr");
          const postContainerElm = document.getElementById("news-post-container")
          if (Object.keys(data).length && postContainerElm) {
            nextPostLoaderRef.current = false
            nextDiv.innerHTML = data.attributes.content || ''
            excludeSlugRef.current = excludeSlugRef.current + "," + data.attributes.slug
            postContainerElm?.appendChild(divider);
            postContainerElm?.appendChild(nextDiv);
          } else {
            window.removeEventListener("scroll", onHandleScroll)
          }
        })
      }).catch(err => setLoader(false))
    }
  }

  useEffect(() => {
    if (slug) {
      setLoader(true)
      setIsLoading(true)
      getPostById(slug).then(dataset => {
        console.log('datadata',dataset);
        let data : any = dataset?.data
        setIsLoading(false)
        setLoader(false)
        setTimeout(() => {
          const elm = window.document.getElementById("initial-news-post")
          if (elm) {
            elm.innerHTML = data?.attributes?.content || ''
            excludeSlugRef.current = data?.attributes?.slug || ''
            categorySlugRef.current = data?.attributes?.tags ? data?.attributes?.tags[0]?.slug : ""
            setOpenScrollModel(false)
          }
        })
      }).catch(err => setLoader(false))
    }
  }, [slug])

  useEffect(() => {
    window.addEventListener("scroll", onHandleScroll)
    return () => {
      window.removeEventListener("scroll", onHandleScroll)
    }
  }, [])

  if ((window as any)?.twttr!) {
    (window as any).twttr?.widgets?.load()
  }

  const contentLoader = () => {
    return <>
      <Col xs={12}>
        <ContentLoader height={630} width="100%">
          <rect x="0" y="30" rx="5" ry="5" width="100%" height="30px" />
          <rect x="0" y="80" rx="5" ry="5" width="100%" height="30px" />
          <rect x="0" y="150" rx="5" ry="5" width="60%" height="20px" />
          <circle cx="30" cy="250" r="24" />
          <rect x="60" y="235" rx="5" ry="5" width="80px" height="10px" />
          <rect x="60" y="255" rx="5" ry="5" width="80px" height="10px" />
          <circle cx="80%" cy="255" r="16" />
          <circle cx="88%" cy="255" r="16" />
          <circle cx="96%" cy="255" r="16" />
          <rect x="0" y="400" rx="5" ry="5" width="60%" height="14px" />
          <rect x="0" y="420" rx="5" ry="5" width="100%" height="14px" />
          <rect x="0" y="440" rx="5" ry="5" width="100%" height="14px" />
          <rect x="0" y="460" rx="5" ry="5" width="100%" height="14px" />
          <rect x="0" y="480" rx="5" ry="5" width="20%" height="14px" />
          <rect x="0" y="540" rx="5" ry="5" width="100%" height="14px" />
          <rect x="0" y="560" rx="5" ry="5" width="100%" height="14px" />
          <rect x="0" y="580" rx="5" ry="5" width="100%" height="14px" />
          <rect x="0" y="600" rx="5" ry="5" width="60%" height="14px" />
        </ContentLoader>
      </Col>
    </>
  }

  return (
    <>
    <div className="single-card-sec">
      {openScrollModel &&
            <div className="news-post-scroll">
              <p>Scroll down to continue reading! </p>
              <img src={Scrolcon} className='img-fluid' alt="" />
            </div>
          } 
        <section className='article-section'>
          <Container>
            <>
              <div className="text-end d-flex justify-content-between mb-3">
                <button className='default-button' data-back="Back" onClick={() => { nav(-1) }}><i className="ri-arrow-left-line"></i><span className='margin-span'>Back</span></button>
              </div>
              <div id="news-post-container">
                <div id="initial-news-post" />
              </div>
              {isLoading && contentLoader()}
            </>
          </Container>
        </section>
        </div>
    </>
  )
}

export default SinglePost