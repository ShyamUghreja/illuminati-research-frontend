import moment from 'moment'
import React, { useEffect, useState } from 'react'
import "./podcasts-single.sass"
import { Col, Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import AudioPlayer from "react-h5-audio-player";
import { getPodcastData } from '../../api/posts'
import NoImage from '../../assets/no-img.webp';
import 'react-h5-audio-player/lib/styles.css';
import ContentLoader from 'react-content-loader'
const PodcastsSingle = () => {

    const [loader, setLoader] = useState(false)
    const [singlePodcasts, setSinglePodcasts] = useState<any>({})
    console.log("singlePodcasts", singlePodcasts)
    const [isLoading, setIsLoading] = useState(false)


    const params = useParams()
    const slug = params.slug || ''
    console.log(slug, "slug")
    // const subtype = params.subtype || ''


    const getSinglePodcastsData = async () => {
        try {
            setLoader(true)
            await getPodcastData(0, 1, "single-podcasts", false, "", false, slug)
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        let allArticle = res?.data?.data || []
                        setSinglePodcasts(allArticle)
                        // setTotal(res?.data?.meta?.pagination?.total || 0)
                        setTimeout(() => {
                            const elm = window.document.getElementById("podcasts-details")
                            if (elm) {
                                elm.innerHTML = allArticle?.attributes?.description || ''
                            }
                        })
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
        if (slug) {
            getSinglePodcastsData()
        }
    }, [slug])

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
            <div className='other-main-div'>
                <div className="podcasts-details-page primary-bg-background">
                    <section className='player-section padding-section'>
                        <div className=''>
                            <Container >
                            {!loader &&
                            <>
                                <div className='top-img mb-lg-4 mb-3'>
                                    {singlePodcasts && singlePodcasts?.attributes?.imageUrl ?
                                        <img src={singlePodcasts && singlePodcasts?.attributes?.imageUrl} alt="" /> :
                                        <img src={NoImage} alt="" />
                                    }
                                </div>
                                <section className='podcastsDetails-section'>
                                    <h3 className='heading-3 fw-600'>{singlePodcasts && singlePodcasts?.attributes?.title || "this is title"}</h3>
                                    <div className='large fw-500 mt-3' id="podcasts-details">No content available</div>
                                    <div className='mt-md-4 mt-3 d-flex'>
                                        <div className=''>
                                            <p className='normal'>{moment(singlePodcasts && singlePodcasts?.attributes?.publishDate).format("MMM DD, YYYY")} <span className='mx-2'>|</span> {singlePodcasts && singlePodcasts?.attributes?.duration}</p>
                                        </div>
                                    </div>
                                    <hr className='my-md-3 my-2' />
                                </section>
                                <div className='player-name mb-lg-4 mb-md-4 mb-3'>
                                    <div>
                                        <p className='medium color-secondary'>Hosted by</p>
                                        <h5 className='large mt-2 fw-500'>{singlePodcasts && singlePodcasts?.attributes?.author || "Unknown"}</h5>
                                    </div>
                                    <div>
                                        <p className='medium color-secondary'>Guests</p>
                                        <h5 className='large mt-2 fw-500'>{singlePodcasts && singlePodcasts?.attributes?.guest || "Unknown"}</h5>
                                    </div>
                                </div>
                                <div className='audio-player'>
                                    <AudioPlayer
                                        style={{ border: "0" }}
                                        src={singlePodcasts && singlePodcasts?.attributes?.fileUrl}
                                        showFilledVolume={false}
                                        loop={false}
                                        layout="horizontal-reverse"
                                        progressJumpStep={10000}
                                    />
                                </div>
                                </>
                                }
                                {loader && contentLoader()}
                            </Container>
                        </div>
                    </section>
                </div>
            </div>

        </>
    )
}

export default PodcastsSingle