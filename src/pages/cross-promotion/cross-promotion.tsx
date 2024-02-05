import React from 'react'
import "./cross-promotion.sass"
import Allhero from '../../shared/all-hero/all-hero'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Promotionbg from '../../assets/promotion.svg';
import Footercmp from '../../shared/footercmp/footercmp';


const CrossPromotion = () => {
    return (
        <div>
            <Allhero />
            <Footercmp />
        </div>
    )
}

export default CrossPromotion