import styled from "styled-components";

export const MainWrapper = styled.div``;

export const PageWrapper = styled.div`
  left: 0;
  margin-left: ${({ isOpen }) => (isOpen ? "230px" : "0px")};
  padding-top: 60px;
  position: relative;
  transition: all 0.2s ease-in-out;
  min-height: 528px;

  & > .content {
    padding: 30px;
  }

  @media screen and (max-width: 767px) {
    margin-left: 0;
  }
`;

export const ViewIcons = styled.div`
  float: right;
  margin-right: 10px;

  .btn {
    background-color: #fff;
    border: 1px solid #e3e3e3;
    color: #888;
    font-size: 18px;
    margin-right: 5px;
    min-width: 40px;
    padding: 4px;

    &.active {
      color: #333;
    }
  }
`;

export const TableComponent = styled.table`
  width: 100%;
  text-align: left;
  border-radius: 2px 2px 0 0;
  border-collapse: separate;
  border-spacing: 0;

  thead > tr > th {
    position: relative;
    padding: 16px 16px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    text-align: left;
    background: #fafafa;
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.3s ease;
  }

  th::before {
    position: absolute;
    top: 50%;
    right: 0;
    width: 1px;
    height: 1.6em;
    background-color: rgba(0, 0, 0, 0.06);
    transform: translateY(-50%);
    transition: background-color 0.3s;
    content: "";
  }

  tbody > tr > td,
  tbody > tr > th,
  tbody > tr > td {
    padding: 10px 8px !important;
  }

  td h2 span {
    color: #888;
    display: block;
    font-size: 12px;
    margin-top: 3px;
  }

  .table-avatar {
    align-items: center;
    display: inline-flex;
    font-size: inherit;
    font-weight: 400;
    margin: 0;
    padding: 0;
    vertical-align: middle;
    white-space: nowrap;
  }

  .ant-table-cell {
    background-color: rgba(255, 255, 255, 0.85) !important;
    border-bottom: 2px solid #dee2e6 !important;
  }
`;

export const TableCell = styled.td`
  background-color: rgba(255, 255, 255, 0.85) !important;
  border-bottom: 2px solid #dee2e6 !important;
`;

export const TableResponsive = styled.div`
  overflow-x: auto;
`;
