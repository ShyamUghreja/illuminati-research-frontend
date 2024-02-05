import React, { useState } from 'react'
import Allhero from '../../shared/all-hero/all-hero'
import TrendingCmp from '../../shared/trending-cmp/trending-cmp'
import Latestproject from '../../shared/latest-project/latest-project'
import Ecosystem from '../../shared/ecosystem/ecosystem'
import Allresearch from '../../shared/all-research/all-research'
import Industryreports from '../../shared/industry-reports/industry-reports'
import { useParams } from 'react-router-dom'
import EcosystemPosts from '../../shared/ecosystem/ecosystem-posts'

const Research = () => {
    const params = useParams()
    const type = params.type || ''
    console.log("type", type)
    const subtype = params.subtype || ''

    if (type === "all" && !!subtype) {
        return <>
            <Allresearch showAll tagSlug={subtype} />
        </>
    } else if (type === "trending") {
        return <>
            <TrendingCmp showAll tagSlug={subtype} />
        </>
    } else if (type === "latest-projects") {
        return <>
            <Latestproject showAll tagSlug={subtype}/>
        </>

    } else if (type === "ecosystem") {
        return <>
            <Ecosystem showAll />
            {subtype &&
                <EcosystemPosts ecosystem={subtype} />
            }
        </>
    } else {
        return (
            <>
                <div className="other-main-div">
                    <Allhero />
                    <TrendingCmp />
                    <Latestproject />
                    <Ecosystem />
                    <Allresearch />
                    {/* <Industryreports /> */}
                </div>
            </>
        )
    }
}

export default Research