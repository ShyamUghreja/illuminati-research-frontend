import React, { useEffect, useState } from 'react'
import "./research-hub.sass"
import { Col, Container, Row } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { getAllCategories, getNewsData } from '../../api/posts';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from "moment"
import LatestContentLoader from '../latest-project/LatestContentLoader';
import SquareRed from '../../assets/icons/square-red.svg';
import Pagination from '../Pagination';

const totalLimit = 20

const Research = ({ showAll, tagSlug }: { showAll?: boolean, tagSlug?: string }) => {
    const nav = useNavigate()

    const [researchHub, setResearchHub] = useState([])
    const [loader, setLoader] = useState(false)
    const [categories, setCategories] = useState([])
    const [selectedTag, setSelectedTag] = useState<string>("")
    const location = useLocation()
    const pathname = location.pathname;
    const [total, setTotal] = useState(0)
    const isNews = pathname.includes("/news")
    const element = document.getElementById("reseach-hub-id");
    const [currentPage, setCurrentPage] = useState(0)
    const [catLoader, setCatLoader] = useState(false)

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

    const getLatestNewsData = async (tag: string) => {
        try {
            setLoader(true)
            if (showAll) element?.scrollIntoView({ behavior: "smooth" });
            await getNewsData(showAll ? currentPage * totalLimit : 0, showAll ? totalLimit : 9, "Research-hub", "research", false, tag)
                .then(async (res: any) => {
                    if (res?.status === 200) {
                        let allArticle = res?.data?.data || []
                        setResearchHub(allArticle)
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
    }, [selectedTag])

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

    return (
        <div>
            <section className='research-sec position-relative mt-5' id='reseach-hub-id'>
                <Container>
                    <div className='research-news'>
                        <h2 className='heading-2 color-black text-center fw-700'>Research Hub</h2>
                        <div className='research-tabview mt-lg-5 mt-3'>
                            <Tabs
                                id="fill-tab-example"
                                className="mb-4 justify-content-lg-center justify-content-start"
                                fill
                                activeKey={selectedTag}
                                onSelect={(key: any) => onChangeSelectedTag(key)}
                            >
                                {categories && categories?.map((cat: any, index) => {
                                    return <Tab key={index} eventKey={cat?.attributes?.slug} title={cat?.attributes?.name}>
                                        <Row>
                                            {loader && <LatestContentLoader />}
                                            {!loader && researchHub.length ? researchHub?.map((item: any, i: any) => {
                                                // const tagsArr = (item?.attributes?.tags && item?.attributes?.tags.split(",")) || []
                                                return (
                                                    <Col lg={4} md={6} xs={12} className='mb-4' key={i} onClick={() => nav(`/post/${item?.attributes?.slug}`)}>
                                                        <div className="latest-card latest-card-bg" role="button">
                                                            <div>
                                                                <div className="d-flex justify-content-between">
                                                                    <div className='d-flex overflow-hidden gap-1'>
                                                                        {item?.attributes ? item?.attributes?.tags.map((tag: any, i: number) => <button key={i} className='button-small'>{tag?.name}</button>) 
                                                                        : <button className='button-small'>No tag available</button>}
                                                                    </div>
                                                                </div>
                                                                <h6 className='heading-6 color-black'>{item?.attributes?.title}</h6>
                                                            </div>
                                                            {/* <div className="position-relative"> */}
                                                            <div className="d-flex by-date align-items-center">
                                                                <p className='by-them paragraph-smaller color-black'>by <span className='bold-subhead color-black fw-500'>{item?.attributes?.author || "Unknown"}</span></p>
                                                                {/* <div className='mx-3'>|</div> */}
                                                                <p className='article-date paragraph-smaller bold-subhead color-black'>{(item?.attributes?.publishDate && moment(item?.attributes?.publishDate).format("MMM DD, yyyy")) || "-"}</p>
                                                            </div>
                                                            {/* </div> */}
                                                        </div>
                                                    </Col>
                                                )
                                            }) : loader ? null : <Col xs={12}><p className='font-semibold text-lg text-center mt-5 color-black'>No research data found.</p></Col>}
                                        </Row>
                                    </Tab>
                                })
                                }
                                {(catLoader || loader || researchHub.length === 0) ? null : showAll ? <>
                                    <Pagination
                                        page={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={onPageChange}
                                    />
                                </>
                                    : ""}
                            </Tabs>
                        </div>
                    </div>
                </Container>
                <img src={SquareRed} className='img-fluid square-red-1' alt="" />
                <img src={SquareRed} className='img-fluid square-red-2' alt="" />
                <img src={SquareRed} className='img-fluid square-red-3' alt="" />
                <img src={SquareRed} className='img-fluid square-red-4' alt="" />
                <img src={SquareRed} className='img-fluid square-red-5' alt="" />
                <img src={SquareRed} className='img-fluid square-red-8' alt="" />
                <img src={SquareRed} className='img-fluid square-red-6' alt="" />
                <img src={SquareRed} className='img-fluid square-red-7' alt="" />
            </section>
        </div>
    )
}

export default Research