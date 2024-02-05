import React, { useEffect } from 'react'
import { Col } from 'react-bootstrap'
import moment from "moment"
import "./post.sass"
import { useLocation, useNavigate } from 'react-router-dom'


export interface IPost {
  indexPosition: number,
  slug: string,
  title: string,
  subTitle: string,
  author: string,
  tags: any,
  thumbnailUrl: string,
  imageUrl: string,
  publishDate: string,
  published: string
}

function Post(props: IPost) {
  const { indexPosition, slug, imageUrl, title, subTitle, author, tags, thumbnailUrl, publishDate, published } = props
  const nav = useNavigate()
  const location = useLocation();
  const pathname = location.pathname;
  const isPodcasts = pathname.includes("/podcasts")

  useEffect(() => {
    if(isPodcasts){
      setTimeout(() => {
        const elm = window.document.getElementById(indexPosition+'')
        if (elm) {
          elm.innerHTML = subTitle || ''
        }
      })
    }
  }, [subTitle])

  return (
    <Col lg={3} md={6} xs={12} role="button" onClick={() => isPodcasts ? nav(`/podcasts-details/${slug}`) : nav(`/post/${slug}`) }>
      <div className="crypto-card-container">
        <div className="card-image">
          <img src={isPodcasts ? imageUrl : thumbnailUrl} alt="" className='img-fluid' />
        </div>
        <div className="card-content">
          <div>
            <div className="content-heading">
              <div className='d-flex justify-end gap-1 overflow-hidden'>
                {tags.length ? tags.map((tag: any, i: number) => <button key={i} className='button-small'>{tag && tag?.name}</button>)
                :<button className='button-small'>No tag available</button>}
              </div>
            </div>
            <hr className='m-0' />
            <p className='mt-2 mb-2 medium-p heading color-white'>{title}</p>
            <div className='paragraph-disc discription color-white' id={indexPosition+''}>{!isPodcasts ? subTitle : ""}</div>
          </div>
          <div className="by-date">
            <p className='by-them paragraph-smaller color-white'>by <span className='color-white fw-500'>{author || "Unknown"}</span></p>
            <p className='article-date paragraph-smaller fw-500'>{publishDate ? moment(publishDate).format("MMM DD, yyyy") : published ? moment.unix(Math.ceil(Number(published) / 1000)).format("MMM DD, YYYY") : "-"}</p>
          </div>
        </div>
      </div>
    </Col>
  )
}

export default Post