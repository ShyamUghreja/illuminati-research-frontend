import React from 'react'
import { Col } from 'react-bootstrap';
import ContentLoader from 'react-content-loader';

function PostContentLoader({ showAll }: { showAll?: boolean }) {
  return (
    <>
      {[...new Array(showAll ? 8 : 4)].map((z, index) => {
        return <Col key={index} lg={3} md={6} xs={12}>
          <ContentLoader height={400} width={"100%"} >
            <rect x="0" y="0" rx="0" ry="0" width="100%" height="150" />
            <rect x="60" y="169" rx="0" ry="0" width="100%" height="15" />
            <rect x="0" y="201" rx="0" ry="0" width="100%" height="18" />
            <rect x="0" y="225" rx="0" ry="0" width="100%" height="18" />
            <rect x="0" y="260" rx="0" ry="0" width="100%" height="14" />
            <rect x="0" y="280" rx="0" ry="0" width="100%" height="14" />
            <rect x="0" y="330" rx="0" ry="0" width="30%" height="14" />
            <rect x="70%" y="330" rx="0" ry="0" width="30%" height="14" />
          </ContentLoader>
        </Col>
      })}
    </>
  )
}

export default PostContentLoader