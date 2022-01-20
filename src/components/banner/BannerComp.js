import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import TopCenterShape from "../../assets/imgs/shape1.svg";
import RightCenter from "../../assets/imgs/shape2.svg";
import BannerImg from "../../assets/imgs/bannerImg.png";
import {useDispatch, useSelector} from "react-redux";
import {fetchData} from "../../redux/data/dataActions";
import {ResponsiveWrapper, StyledButton, StyledLink, StyledRoundButton, truncate} from "../../styles/styleComponent";
import * as s from "../../styles/globalStyles";
import {connect} from "../../redux/blockchain/blockchainActions";
import HeaderComp from "../header/HeaderComp";
import PrimaryButton from "../primaryButton/PrimaryButton";

import "./BannerComp.scss";

const BannerComp = () => {
  const [buttonName, setButtonName] = useState("JOIN US");
  const [buttonActive, setButtonActive] = useState(false);
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });
  
  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };
  
  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };
  
  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmount(newMintAmount);
  };
  
  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };
  
  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };
  
  useEffect(() => {
    getConfig();
  }, []);
  
  useEffect(() => {
    getData();
  }, [blockchain.account]);
  
  const onJoinUsBtnClick = (e) => {
    setButtonName("Thanks");
    setButtonActive(true);
    e.preventDefault();
    dispatch(connect());
    getData();
  };
  return (
    <Container className="banner-comp comp-height" fluid>
      <img className="top-center-shape" src={TopCenterShape} alt="baby-spell-frog"/>
      <img className="right-center-shape" src={RightCenter} alt="baby-spell-frog"/>
      <HeaderComp/>
      <Container className="banner-comp-container d-flex justify-content-center align-items-center">
        <Row className="banner-comp-content">
          <Col lg={blockchain.account ? 6 : 8} md={blockchain.account ? 6 : 8} sm={12}
               className="left-side d-flex flex-column justify-content-center align-items-center">
            <div className="content-title">
              <h1 data-aos="zoom-in" className="title">welcome to baby spell frog</h1>
            </div>
            <div className="content-subtitle">
              <h2 data-aos="fade-down" className="subtitle">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Commodi cum deleniti
                deserunt error laboriosam odio omnis placeat quos. Blanditiis eos est fugiat, fugit itaque neque quia
                repellat sequi vero voluptas.</h2>
            </div>
            {
              !blockchain.account && (
                <PrimaryButton onBtnClick={onJoinUsBtnClick} buttonActive={buttonActive}
                               buttonName={buttonName}/>
              )
            }
          </Col>
          <Col lg={blockchain.account ? 6 : 4} md={blockchain.account ? 6 : 4} sm={12}
               className="right-side d-flex justify-content-center align-items-center">
            {
              !blockchain.account ? (
                <img data-aos="zoom-in" src={BannerImg} alt="baby-spell-frog"/>
              ) : (
                <ResponsiveWrapper data-aos="zoom-in" flex={1} className="mint-box" test>
                  <s.Container
                    flex={2}
                    jc={"center"}
                    ai={"center"}
                    style={{
                      backgroundColor: "var(--accent)",
                      padding: 24,
                      borderRadius: 24,
                      border: "4px dashed var(--secondary)",
                      boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
                    }}
                  >
                    <s.TextTitle
                      style={{
                        textAlign: "center",
                        fontSize: 50,
                        fontWeight: "bold",
                        color: "var(--accent-text)",
                      }}
                    >
                      {data.totalSupply} / {CONFIG.MAX_SUPPLY}
                    </s.TextTitle>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--primary-text)",
                      }}
                    >
                      <StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
                        {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
                      </StyledLink>
                    </s.TextDescription>
                    <s.SpacerSmall/>
                    {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
                      <>
                        <s.TextTitle
                          style={{textAlign: "center", color: "var(--accent-text)"}}
                        >
                          The sale has ended.
                        </s.TextTitle>
                        <s.TextDescription
                          style={{textAlign: "center", color: "var(--accent-text)"}}
                        >
                          You can still find {CONFIG.NFT_NAME} on
                        </s.TextDescription>
                        <s.SpacerSmall/>
                        <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                          {CONFIG.MARKETPLACE}
                        </StyledLink>
                      </>
                    ) : (
                      <>
                        <s.TextTitle
                          style={{textAlign: "center", color: "var(--accent-text)"}}
                        >
                          1 {CONFIG.SYMBOL} costs {CONFIG.DISPLAY_COST}{" "}
                          {CONFIG.NETWORK.SYMBOL}.
                        </s.TextTitle>
                        <s.SpacerXSmall/>
                        <s.TextDescription
                          style={{textAlign: "center", color: "var(--accent-text)"}}
                        >
                          Excluding gas fees.
                        </s.TextDescription>
                        <s.SpacerSmall/>
                        {blockchain.account === "" ||
                        blockchain.smartContract === null ? (
                          <s.Container ai={"center"} jc={"center"}>
                            <s.TextDescription
                              style={{
                                textAlign: "center",
                                color: "var(--accent-text)",
                              }}
                            >
                              Connect to the {CONFIG.NETWORK.NAME} network
                            </s.TextDescription>
                            <s.SpacerSmall/>
                            {blockchain.errorMsg !== "" ? (
                              <>
                                <s.SpacerSmall/>
                                <s.TextDescription
                                  style={{
                                    textAlign: "center",
                                    color: "var(--accent-text)",
                                  }}
                                >
                                  {blockchain.errorMsg}
                                </s.TextDescription>
                              </>
                            ) : null}
                          </s.Container>
                        ) : (
                          <>
                            <s.TextDescription
                              style={{
                                textAlign: "center",
                                color: "var(--accent-text)",
                              }}
                            >
                              {feedback}
                            </s.TextDescription>
                            <s.SpacerMedium/>
                            <s.Container ai={"center"} jc={"center"} fd={"row"}>
                              <StyledRoundButton
                                style={{lineHeight: 0.4}}
                                disabled={claimingNft ? 1 : 0}
                                onClick={(e) => {
                                  e.preventDefault();
                                  decrementMintAmount();
                                }}
                              >
                                -
                              </StyledRoundButton>
                              <s.SpacerMedium/>
                              <s.TextDescription
                                style={{
                                  textAlign: "center",
                                  color: "var(--accent-text)",
                                }}
                              >
                                {mintAmount}
                              </s.TextDescription>
                              <s.SpacerMedium/>
                              <StyledRoundButton
                                disabled={claimingNft ? 1 : 0}
                                onClick={(e) => {
                                  e.preventDefault();
                                  incrementMintAmount();
                                }}
                              >
                                +
                              </StyledRoundButton>
                            </s.Container>
                            <s.SpacerSmall/>
                            <s.Container ai={"center"} jc={"center"} fd={"row"}>
                              <StyledButton
                                disabled={claimingNft ? 1 : 0}
                                onClick={(e) => {
                                  e.preventDefault();
                                  claimNFTs();
                                  getData();
                                }}
                              >
                                {claimingNft ? "BUSY" : "BUY"}
                              </StyledButton>
                            </s.Container>
                          </>
                        )}
                      </>
                    )}
                  </s.Container>
                </ResponsiveWrapper>
              )
            }
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default BannerComp;