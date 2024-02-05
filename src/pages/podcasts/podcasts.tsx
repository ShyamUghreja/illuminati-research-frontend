import React from 'react'
import Allhero from '../../shared/all-hero/all-hero'
import TrendingCmp from '../../shared/trending-cmp/trending-cmp'
import Podcastscard from '../../shared/podcasts-card/podcasts-card'
import Upcomingepisodes from '../../shared/upcoming-episodes/upcoming-episodes'
import Allresearch from '../../shared/all-research/all-research'
import Latestproject from '../../shared/latest-project/latest-project'
import Ecosystem from '../../shared/ecosystem/ecosystem'
import EcosystemPosts from '../../shared/ecosystem/ecosystem-posts'
import { useParams } from 'react-router-dom'

const Podcasts = () => {

    const params = useParams()
    const type = params.type || ''
    const subtype = params.subtype || ''

    if (type === "all-podcasts" && !!subtype) {
        return <>
            <Podcastscard showAll tagSlug={subtype} />
        </>
    } else if (type === "trending") {
        return <>
            <TrendingCmp showAll tagSlug={subtype}/>
        </>
    } else if (type === "upcoming-episodes") {
        return <>
            <Upcomingepisodes showAll tagSlug={subtype}/>
        </>
    } else if (type === "latest") {
        return <>
            <Latestproject showAll />
        </>
    } else if (type === "ecosystem" && !!subtype) {
        return <>
            <Ecosystem />
            <EcosystemPosts ecosystem={subtype} />
        </>
    } else {
        return (
            <>
                <div className="other-main-div">
                    <Allhero />
                    <TrendingCmp />
                    <Podcastscard />
                    <Upcomingepisodes />
                </div>
            </>
        )
    }
}

export default Podcasts