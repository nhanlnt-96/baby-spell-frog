import React from "react";
import { Container, Row } from "react-bootstrap";
import { collectionData } from "../../configs/collectionData";
import TitleComp from '../title/TitleComp';
import WavesComps from '../waves/WavesComp';

import './CollectionComp.scss';

const CollectionComp = () => {
  return (
    <Container fluid className="collection-comp">
      <Container className="collection-comp-container">
        <TitleComp title="Collection" />
        <Row className="collection-img">
          {
            collectionData.map((val, index) => (
              <img data-aos="zoom-in" src={val} key={index} alt="collection-frog" />
            ))
          }
        </Row>
      </Container>
      <div className='comp-wave'>
        <WavesComps />
      </div>
    </Container>
  )
}

export default CollectionComp;