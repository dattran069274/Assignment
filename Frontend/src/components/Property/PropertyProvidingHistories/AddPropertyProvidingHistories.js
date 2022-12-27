import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import common from "../../../global/module/common.module.scss";
import FormPropertyProvidingHistories from "./FormPropertyProvidingHistories";

const AddPropertyProvidingHistories = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="col-auto float-end ml-auto">
      <Button className={common.AddBtn} onClick={handleShow}>
        <FaPlus style={{ lineHeight: "38px" }} /> Add Department
      </Button>

      <FormPropertyProvidingHistories
        isNew={true}
        show={show}
        close={handleClose}
      />
    </div>
  );
};

export default AddPropertyProvidingHistories;
