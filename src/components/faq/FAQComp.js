import React from "react";
import {Accordion, Container, Row} from "react-bootstrap";
import {faqData} from "../../configs/faqData";
import TitleComp from "../title/TitleComp";

import "./FAQComp.scss";

const FaqComp = () => {
  return (
    <Container fluid className="faq-comp">
      <Container className="faq-comp-container">
        <TitleComp title={"FAQ"}/>
        <Accordion className="accordion-custom">
          {
            faqData.map((main, index) => (
              <Accordion.Item data-aos={index === faqData.length - 1 ? null :'fade-up'} key={index}
                              eventKey={index.toString()}>
                <Accordion.Header>{main.question}</Accordion.Header>
                <Accordion.Body>
                  {
                    main.answer.map((item, key) => (
                      <p key={key} className="answer-content">{item}</p>
                    ))
                  }
                </Accordion.Body>
              </Accordion.Item>
            ))
          }
        </Accordion>
      </Container>
    </Container>
  );
};

export default FaqComp;