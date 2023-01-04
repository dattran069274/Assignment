import React from "react";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import DetailLeaveApplication from "../../components/LeaveApplication/DetailLeaveApplication";
import Sidebar from "../../components/Sidebar/Sidebar";
import { MainWrapper, PageWrapper } from "../../global/jsx/common";
import pageHeader from "../../components/PageHeader/pageHeader.module.scss";
import PageHeader from "../../components/PageHeader/PageHeader";

const DetailLeaveApplicationPage = () => {
  const { id } = useParams();
  return (
    <MainWrapper>
      <Header />
      <Sidebar active="leave_application" />

      <PageWrapper>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="Detail Leave" />
            </Row>
          </div>
          <DetailLeaveApplication idRequest={id} />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default DetailLeaveApplicationPage;
