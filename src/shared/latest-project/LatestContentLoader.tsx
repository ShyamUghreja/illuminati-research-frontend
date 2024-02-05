import React from 'react'
import { Col } from 'react-bootstrap';
import ContentLoader from 'react-content-loader';

function LatestContentLoader() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((z, index) => {
        return <Col key={index} lg={4} md={6} xs={12}>
          <ContentLoader
            width={"100%"}
            backgroundColor={'#333'}
            foregroundColor={'#999'}
            height={175}
          >
            <rect x="0" y="0" rx="0" ry="0" height="15px" width="28px" />
            <rect x="40" y="0" rx="0" ry="0" height="15px" width="28px" />
            <rect x="0" y="40" rx="0" ry="0" height="15px" width="100%" />
            <rect x="0" y="70" rx="0" ry="0" height="15px" width="100%" />
            <rect x="0" y="100" rx="0" ry="0" height="15px" width="100px" />
            <rect x="140" y="100" rx="0" ry="0" height="15px" width="80px" />
          </ContentLoader>
        </Col>
      })}
    </>
  )
}

export default LatestContentLoader