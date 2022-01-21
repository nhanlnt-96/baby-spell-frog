import React, {useEffect, useLayoutEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import TopCenterShape from "../../assets/imgs/shape1.svg";
import RightCenter from "../../assets/imgs/shape2.svg";
import DesktopBanner from "../../assets/imgs/desktopBanner.png";
import MobileBanner from "../../assets/imgs/mobileBanner.png";
import {useDispatch, useSelector} from "react-redux";
import {fetchData} from "../../redux/data/dataActions";
import {ResponsiveWrapper, StyledButton, StyledLink, StyledRoundButton, truncate} from "../../styles/styleComponent";
import * as s from "../../styles/globalStyles";
import {connect} from "../../redux/blockchain/blockchainActions";
import HeaderComp from "../header/HeaderComp";
import PrimaryButton from "../primaryButton/PrimaryButton";

import "./BannerComp.scss";

export const useWindowSize = () => {
  const [currentWidth, setCurrentWidth] = useState(0);
  useLayoutEffect(() => {
    const updateSize = () => {
      setCurrentWidth(window.innerWidth);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return currentWidth;
};


const BannerComp = () => {
  const currentScreen = useWindowSize();
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
      <Container className="banner-comp-container d-flex flex-column justify-content-center align-items-center">
        <Row className="banner-comp-img">
          <img data-aos="zoom-in" src={currentScreen < 768 ? MobileBanner : DesktopBanner} alt="baby-spell-frog"/>
        </Row>
        <Row className="banner-comp-content">
          <Col lg={blockchain.account ? 6 : 12} md={blockchain.account ? 6 : 12} sm={12}
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
          {
            blockchain.account && (
              <Col data-aos="fade-left" lg={6} md={6} sm={12}
                   className="right-side d-flex justify-content-center align-items-center">
                <ResponsiveWrapper data-aos="zoom-in" flex={1} className="mint-box" test>
                  <s.Container
                    flex={2}
                    jc={"center"}
                    ai={"center"}
                    style={{
                      backgroundColor: "#fff",
                      padding: 24,
                      borderRadius: 10,
                      boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
                    }}
                  >
                    <s.TextTitle
                      style={{
                        textAlign: "center",
                        fontSize: 50,
                        fontWeight: "bold",
                        color: "#000",
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
                          style={{textAlign: "center", color: "#000"}}
                        >
                          The sale has ended.
                        </s.TextTitle>
                        <s.TextDescription
                          style={{textAlign: "center", color: "#000"}}
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
                          style={{textAlign: "center", color: "#000"}}
                        >
                          1 {CONFIG.SYMBOL} costs {CONFIG.DISPLAY_COST}{" "}
                          {CONFIG.NETWORK.SYMBOL}.
                        </s.TextTitle>
                        <s.TextDescription
                          style={{textAlign: "center", color: "#000"}}
                        >
                          Excluding gas fees.
                        </s.TextDescription>
                        {blockchain.account === "" ||
                        blockchain.smartContract === null ? (
                          <s.Container ai={"center"} jc={"center"}>
                            <s.SpacerSmall/>
                            {blockchain.errorMsg !== "" ? (
                              <>
                                <s.SpacerSmall/>
                                <s.TextDescription
                                  style={{
                                    textAlign: "center",
                                    color: "#000",
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
                                color: "#000",
                              }}
                            >
                              {feedback}
                            </s.TextDescription>
                            <s.SpacerMedium/>
                            <s.Container ai={"center"} jc={"center"} fd={"row"}>
                              <s.TextDescription
                                style={{
                                  color: "#000",
                                  border: "1px solid rgba(0,0,0,.6)",
                                  width: "200px",
                                  borderRadius: 5,
                                  padding: 10,
                                  fontWeight: "bold",
                                  position: "relative"
                                }}
                              >
                                <s.TextDescription style={{
                                  color: "rgba(0,0,0,.6)",
                                  backgroundColor: "#fff",
                                  position: "absolute",
                                  lineHeight: "26px",
                                  top: "-13px",
                                  padding: "0 5px"
                                }}>
                                  Quantity
                                </s.TextDescription>
                                {mintAmount}
                              </s.TextDescription>
                            </s.Container>
                            <s.SpacerMedium/>
                            <s.Container ai={"center"} jc={"center"} fd={"row"}>
                              <StyledRoundButton
                                style={{
                                  borderRadius: 5,
                                  color: "#A02D2D",
                                  border: ".5px solid rgba(0,0,0,.6)",
                                  backgroundColor: "transparent",
                                  width: 60,
                                  padding: 10
                                }}
                                disabled={claimingNft ? 1 : 0}
                                onClick={(e) => {
                                  e.preventDefault();
                                  decrementMintAmount();
                                }}
                              >
                                Less
                              </StyledRoundButton>
                              <s.SpacerMedium/>
                              <StyledRoundButton
                                style={{
                                  borderRadius: 5,
                                  color: "#139C94",
                                  border: ".5px solid rgba(0,0,0,.6)",
                                  backgroundColor: "transparent",
                                  width: 60,
                                  padding: 10
                                }}
                                disabled={claimingNft ? 1 : 0}
                                onClick={(e) => {
                                  e.preventDefault();
                                  incrementMintAmount();
                                }}
                              >
                                More
                              </StyledRoundButton>
                            </s.Container>
                            <s.SpacerSmall/>
                            <s.Container ai={"center"} jc={"center"} fd={"row"}>
                              <StyledButton
                                style={{backgroundColor: "#139C94"}}
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
              </Col>
            )
          }
        </Row>
      </Container>
    </Container>
  );
};

export default BannerComp;