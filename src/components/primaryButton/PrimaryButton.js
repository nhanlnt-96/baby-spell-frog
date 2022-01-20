import React from "react";
import ConnectGif from "../../assets/gifs/loading.gif";

import './PrimaryButton.scss';

const PrimaryButton = ({onBtnClick,buttonActive,buttonName}) => {
  return (
    <div className="comp-primary-button">
      <button onClick={onBtnClick} className={`button-item ${buttonActive ? "active" : ""}`}>
        <p className="button-name">{buttonName}</p>
        <div className="button-icon d-flex justify-content-center align-items-center">
          <img src={ConnectGif} alt="connecting-to-wallet-frog" />
        </div>
      </button>
    </div>
  )
}

export default PrimaryButton;