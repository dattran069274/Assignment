import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { TiArrowUnsorted } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import FormRequestProperty from "./FormRequestProperty";
import staff from "../Staff/staff.module.scss";
import {
  destroyRequestProperty,
  fetchRequestProperties,
  requestPropertiesSelector,
  RequestPropertyByStatus,
  searchRequestProperty,
  showRequestProperty,
} from "../../features/requestProperty/requestPropertySlice";
import { Table } from "../Staff/staff";
import { Link } from "react-router-dom";
import Select from "react-select";
import {
  allStaffSelector,
  fetchAllStaff,
  fetchStaffChart,
  staffChartSelector,
} from "../../features/staff/staffSlice";
import {
  TableCell,
  TableComponent,
  TableResponsive,
} from "../../global/jsx/common";
import TableHead from "../Table/TableHead";
import ActionColumn from "../Table/ActionColumn";
import {
  getRoleSelector,
  getUserSelector,
} from "../../features/auth/authSlice";
import { optionSelect2 } from "../../common/hooks/hooks";

const RequestProperty = () => {
  const dispatch = useDispatch();
  const requestProperties = useSelector(requestPropertiesSelector);
  const staffs = useSelector(allStaffSelector);
  const role = useSelector(getRoleSelector);
  const currentUser = useSelector(getUserSelector);

  const [show, setShow] = useState(false);
  const [idStaff, setIdStaff] = useState(null);
  const statusList = [
    { label: "Pending", value: 0 },
    { label: "Approve", value: 1 },
    { label: "Cancel", value: 2 },
  ];
  useEffect(() => {
    if (!currentUser) return;

    if (!role) {
      dispatch(searchRequestProperty(currentUser?.id));
    } else {
      dispatch(fetchRequestProperties());
      dispatch(fetchAllStaff());
    }
  }, [dispatch, role, currentUser]);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    dispatch(showRequestProperty(id));
    setShow(true);
  };

  const handleDelete = (id) => {
    dispatch(destroyRequestProperty(id));
  };

  const handleFilter = (val) => {
    dispatch(RequestPropertyByStatus(val));
  };

  return (
    <>
      {role && (
        <Row className="justify-content-end mb-4">
          <Col lg={3} md={6} sm={6}>
            <Form.Group>
              <Select
                options={statusList}
                placeholder="Select Status"
                onChange={(e) => handleFilter(e.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      )}

      <Row>
        <Col md={12}>
          <TableResponsive>
            <TableComponent>
              <thead>
                <tr>
                  <TableHead title="STT" />
                  <TableHead title="Requester" />
                  <TableHead title="Type" />
                  <TableHead title="status" centerTitle={true} />
                  <TableHead title="Action" centerTitle={true} />
                </tr>
              </thead>
              <tbody>
                {requestProperties?.map((item, index) => {
                  const { id, requester, request_type, status } =
                    item.attributes;
                  return (
                    <tr key={id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Link to={item.id}>{requester.fullname}</Link>
                      </TableCell>
                      <TableCell>{request_type}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant={
                            status === "pending"
                              ? "outline-warning"
                              : status === "approved"
                              ? "outline-success"
                              : "outline-danger"
                          }
                        >
                          {status}
                        </Button>
                      </TableCell>

                      <TableCell>
                        <div className="d-flex justify-content-evenly">
                          <RiDeleteBinLine onClick={() => handleDelete(id)} />
                        </div>
                      </TableCell>
                    </tr>
                  );
                })}
              </tbody>
            </TableComponent>
          </TableResponsive>
        </Col>

        <FormRequestProperty isNew={false} show={show} close={handleClose} />
      </Row>
    </>
  );
};

export default RequestProperty;
