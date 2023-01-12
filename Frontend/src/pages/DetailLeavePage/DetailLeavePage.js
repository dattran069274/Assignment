import React from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import DetailLeave from "../../components/Leave/DetailLeave";
import PageHeader from "../../components/PageHeader/PageHeader";
import pageHeader from "../../components/PageHeader/pageHeader.module.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import { isOpenSelector } from "../../features/sidebar/sidebarSlice";
import { MainWrapper, PageWrapper } from "../../global/jsx/common";

const DetailLeavePage = () => {
  const { id } = useParams();
  const isOpenSidebar = useSelector(isOpenSelector);

  return (
    <MainWrapper>
      <Header />
      <Sidebar active="leave" />

      <PageWrapper isOpen={isOpenSidebar}>
        <Container fluid className="content">
          <div className={pageHeader.PageHeader}>
            <Row className="align-items-center">
              <PageHeader title="Detail Leave" />
            </Row>
          </div>
          <DetailLeave idRequest={id} />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default DetailLeavePage;
