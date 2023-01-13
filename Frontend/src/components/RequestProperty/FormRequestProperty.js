import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  editRequestProperty,
  newRequestProperty,
} from "../../features/requestProperty/requestPropertySlice";
import { SubmitSection } from "../Department/department";
import Select from "react-select";
import {
  fetchPropertiesGroup,
  propertiesGroupSelector,
} from "../../features/propertyGroup/propertyGroupSlice";
import { optionSelect2 } from "../../common/hooks/hooks";

const FormRequestProperty = ({ isNew, show, close }) => {
  const dispatch = useDispatch();
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const propertiesGroup = useSelector(propertiesGroupSelector);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchPropertiesGroup());
  }, [dispatch]);

  const handleNewProperty = () => {
    const data = {
      request_type: watch("type").value,
      reason: watch("reason"),
      group_property_id: watch("propertyGroup").value,
      description: watch("description"),
      status: 0,
    };
    dispatch(newRequestProperty(data));
    close(true);
  };

  const handleEditProperty = () => {
    const data = {
      reason: watch("reason"),
      description: watch("description"),
    };

    dispatch(editRequestProperty(data));
    close(true);
  };

  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>{isNew ? "Add Request" : "Update Request"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={handleSubmit(
            isNew ? handleNewProperty : handleEditProperty
          )}
        >
          <Form.Group>
            <Form.Label>Type</Form.Label>
            <Controller
              control={control}
              name="type"
              rules={{ required: "Select Type" }}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  options={[
                    { value: 1, label: "Account" },
                    { value: 0, label: "Device" },
                  ]}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  name={name}
                  ref={ref}
                  placeholder="Select Type"
                />
              )}
            />

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.type?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Group properties</Form.Label>
            <Controller
              control={control}
              name="propertyGroup"
              rules={{ required: "Select Type" }}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Select
                  options={optionSelect2(propertiesGroup, "name")}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  name={name}
                  ref={ref}
                  placeholder="Select Group"
                />
              )}
            />

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.propertyGroup?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Reason</Form.Label>
            <Form.Control
              defaultValue={reason}
              onChange={(e) => setReason(e.target.value)}
              {...register("reason", { required: "Reason is required" })}
            ></Form.Control>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.reason?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Detail</Form.Label>
            <FloatingLabel controlId="floatingTextarea2">
              <Form.Control
                as="textarea"
                placeholder="Enter here..."
                style={{ height: "100px" }}
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={description}
                {...register("description", {
                  required: "Description is required",
                })}
              />
            </FloatingLabel>

            <Form.Control.Feedback type="invalid" className="d-block">
              {errors.description?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <SubmitSection>
            <Button className="submit-btn" type="submit">
              {isNew ? "Submit" : "Update"}
            </Button>
          </SubmitSection>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormRequestProperty;
