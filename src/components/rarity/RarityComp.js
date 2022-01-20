import React from "react";
import {Container} from "react-bootstrap";
import {rarityData} from "../../configs/rarityData";
import TitleComp from "../title/TitleComp";

import "./RarityComp.scss";

const RarityComp = () => {
  return (
    <Container fluid className="rarity-comp comp-height">
      <Container className="rarity-comp-container">
        <TitleComp title={"RARITY"}/>
        {
          rarityData.map((val, index) => (
            <div data-aos="zoom-in" className="rarity-box d-flex flex-column justify-content-center align-items-center">
              <div className="rank-name">
                <p className="name">{val.rank}</p>
              </div>
              <div className="rank-img d-flex justify-content-center align-items-center">
                <img src={val.ava} alt="rarity-frog"/>
              </div>
              <div className="progress-container">
                <div className="progress-percent" style={{width: val.percent}}/>
              </div>
            </div>
          ))
        }
      </Container>
    </Container>
  );
};

export default RarityComp;