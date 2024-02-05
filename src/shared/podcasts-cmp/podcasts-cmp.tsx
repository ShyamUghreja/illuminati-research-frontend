import React from 'react'
import "./podcasts-cmp.sass"
import { useNavigate } from 'react-router-dom'
import NoImage from '../../assets/no-img.webp';

export interface IPost {
    slug: string,
    title: string,
    tags: string,
    thumbnailUrl: string,
    duration: string,
    author: string,
    guest: string
}

const Podcastscmp = (props: IPost) => {
    const { slug, title, tags, thumbnailUrl, duration, author, guest } = props
    console.log("thumbnailUrl", thumbnailUrl)
    const tagsArr = tags
    const nav = useNavigate()

    return (
        <>
            <div className='d-block d-lg-flex d-md-flex mb-3 w-100' role="button" onClick={() => slug && nav(`/podcasts-details/${slug}`)}>
                <img className='card-img' src={thumbnailUrl || NoImage} alt="" />
                <div className='card-text w-100'>
                    <h4 className='heading-4 color-black mb-3 mb-lg-0 mb-md-0'>{title || "No title available"}</h4>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex'>
                            <div>
                                <p className='paragraph-smaller color-primary fw-400'>Host</p>
                                <p className='paragraph-small color-black'>{author || "Unknown"}</p>
                            </div>
                            <div className='host-line'></div>
                            <div>
                                <p className='paragraph-smaller color-primary fw-400'>Guest</p>
                                <p className='paragraph-small color-black'>{guest || "Unknown"}</p>
                            </div>
                        </div>
                        <div className='time fw-500'><p className='paragraph-small'>{duration || "-"}</p></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Podcastscmp