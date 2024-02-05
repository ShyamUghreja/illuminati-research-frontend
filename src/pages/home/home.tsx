import React from 'react'
import "./home.sass"
import Hero from '../../shared/hero/hero';
import Builder from '../../shared/builder/builder';
import Latestnews from '../../shared/latest-news/latest-news';
import Twitterblogs from '../../shared/twitter-blogs/twitter-blogs';
import ResearchHub from '../../shared/research/research-hub';
import Offer from '../../shared/offer/offer';
import { useParams } from 'react-router-dom';
import Footercmp from '../../shared/footercmp/footercmp';

const Home = () => {
    const params = useParams()
    const type = params.type || ''
    const subtype = params.subtype || ''

    if (type === "all-crypto-news" && !!subtype) {
        return <>
            {/* <Allhero /> */}
            <Latestnews showAll tagSlug={subtype} />
        </>
    } else {
        return (
            <>
                <div className="main-div">
                    <Hero />
                    <Builder />
                    <Latestnews />
                    <Twitterblogs />
                    <ResearchHub />
                    <Offer />
                    <Footercmp />
                </div>
            </>
        )
    }
}

export default Home