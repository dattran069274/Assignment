import React from "react";
import { Container, Row } from "react-bootstrap";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MainWrapper, PageWrapper } from "../../global/jsx/common";
import pageHeader from "../../components/PageHeader/pageHeader.module.scss";
import PageHeader from "../../components/PageHeader/PageHeader";
import PerformanceByUser from "../../components/Performance/PerformanceByUser";

const PerformanceSelfReviewPage = () => {
  return (
    <MainWrapper>
      <Header />
      <Sidebar active="self_review" />

      <PageWrapper>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="Self Review" />
            </Row>
          </div>
          <PerformanceByUser />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default PerformanceSelfReviewPage;
