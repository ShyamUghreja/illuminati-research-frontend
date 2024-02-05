import React from 'react'
import { Col} from 'react-bootstrap'
import "./episodes.sass"
import { useNavigate } from 'react-router-dom'


export interface IPost {
    slug: string,
    title: string,
    host: string,
    guest: string,
    tags: any,
}

function Episodes(props: IPost) {
    const { slug, title, host, guest, tags } = props
    const nav = useNavigate()
    console.log("tagstagstags", tags.data)

    return (
       
        <Col lg={3} md={6} xs={12} role="button">
            <div className="episodes-container">
                <div className="card-content">
                    <div className="content-heading">
                        <div className='d-flex justify-start gap-1 overflow-hidden'>
                            { tags.data?.length ? tags.data.map((tag: any, i: number) => <button key={i} className='button-small-secondary'>{tag?.attributes?.name}</button>)
                            : <button className='button-small-secondary'>No tag available</button>}
                        </div>
                    </div>
                    <p className='mt-2 mb-2 medium-p heading color-white'>{title && title || "On-chain Perpetual Swaps Trends in 2022 and Post-FTX"}</p>
                    <div className='d-block  by-date'>
                        <div className='d-flex justify-content-between'>
                            <div className='d-flex align-items-center'>
                                <p className='paragraph-smaller color-primary fw-400 mt-1 mr-1'>Host</p>
                                <p className=''>{host || "Unknown"}</p>
                            </div>
                            <div className='host-line'></div>
                            <div className='d-flex align-items-center'>
                                <p className='paragraph-smaller color-primary fw-400 mt-1 mr-1'>Guest</p>
                                <p className=''>{guest || "Unknown"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Col>
    )
}

export default Episodes