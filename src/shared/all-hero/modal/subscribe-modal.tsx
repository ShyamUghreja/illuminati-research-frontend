import React from 'react'
import './subscribe-modal.sass'
import { Button, Form, Modal } from 'react-bootstrap';
import SubModal from '../../../assets/sub-modal.svg';
interface createModalProps {
    isOpen: boolean,
    toggle: () => void,
    setRefreshData: any,
    removeCross?: Boolean
}

const SubscribeModal = ({ isOpen, toggle, removeCross }: createModalProps) => {
    return (
        <>
            <Modal
                size="lg"
                show={isOpen}
                onHide={toggle}
                className="p-lg-5 p-3 subscribe-modal">
                {removeCross ? null : <Modal.Header closeButton={isOpen}>
                </Modal.Header>}
                <Modal.Body className='p-0'>
                    <div>
                        <div className='d-flex justify-content-between'>
                            <h3 className='heading-3 fw-700'> <span className='fw-400'>Get </span><br /> smarter <br /> about crypto</h3>
                            <img className='img-fluid modelImg' src={SubModal} alt="" />
                        </div>
                        <p className='medium-p my-lg-5 my-3'>Join 250,000+ subscribers and get our 5 min daily newsletter on what matters in crypto</p>
                        <div className='mt-2'>
                            <iframe src="https://embeds.beehiiv.com/2731629b-747b-40f8-9ec2-f344d3a5241d?slim=true" data-test-id="beehiiv-embed" height="52" frameBorder="0" scrolling="no" style={{ margin: "0", borderRadius: "0px !important", background: "transparent" }}></iframe>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default SubscribeModal