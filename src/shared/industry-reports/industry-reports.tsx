import React, { useEffect, useState } from 'react'
import "./industry-reports.sass"
import { Col, Container, Row } from 'react-bootstrap'
import NoImage from '../../assets/no-img.webp';
import { getPdfs } from '../../api/posts';

const reportData = [
    {
        id: 1,
        image: NoImage
    },
    {
        id: 2,
        image: NoImage
    },
    {
        id: 3,
        image: NoImage
    },
]

const Industryreports = () => {

    const [reports, setReports] = useState([])
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setLoader(true)
        getPdfs().then(data => {
            setLoader(false)
            setReports(data)
        }).catch(err => {
            setLoader(false)
        })
    }, [])

    console.log(reports, "reports")

    return (
        <>
            <div>
                <section className='industry-reports-sec'>
                    <Container>
                        <div className='report-bg'>
                            <Row className='justify-center'>
                                <Col lg={12}>
                                    <div className='text-center'>
                                        <h2 className='heading-2 color-white'>Industry Reports</h2>
                                    </div>
                                </Col>
                                {reports && reports.map((item: any, i: number) => (
                                    <Col lg={4} key={i}>
                                        <div className='reportImg mt-lg-5 mt-3'>
                                            <img className='img-fluid' src={NoImage} alt="" />
                                        </div>
                                        <div className='text-center'>
                                            <button className='downloadbtn mt-lg-4 mt-3' onClick={() => window.open(item.path)}><i className="ri-download-cloud-2-line me-2"></i>Download</button>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Container>
                </section>
            </div>
        </>
    )
}

export default Industryreports