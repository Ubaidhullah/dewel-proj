import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import {
  Breadcrumb,
  Button,
  DatePicker,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Modal,
  Select,
  Table,
  Typography,
  message,
} from "antd";
import React, { useState } from "react";
import {
  GET_ALL_LOCATIONS,
  GET_ALL_TRIPS,
  GET_ALL_TRIPS_REQ,
  GET_ALL_REQUESTER,
} from "../../GraphQL/Queries";
import {
  ADD_TRIP,
  ADD_TRIP_REQ,
  DELETE_TRIP,
  DELETE_TRIP_REQ,
  UPDATE_TRIP,
  UPDATE_TRIP_REQ,
} from "../../GraphQL/Mutations";
const { Title } = Typography;

function TripRequests() {
  const { loading, error, data } = useQuery(GET_ALL_TRIPS_REQ);
  if (error) {
    message.error("could not fetch locations");
  }



  const [isModalOpen, setisModalOpen] = useState(false);
  const [departureDate, setdepartureDate] = useState("");
  const [returnDate, setreturnDate] = useState("");
  const [destination, setdestination] = useState("");
  const [requester, setrequester] = useState("");
  const [editingTrip, seteditingTrip] = useState(null);
  const formRef = React.useRef<FormInstance>(null);

  const [addTrip] = useMutation(ADD_TRIP_REQ, {
    refetchQueries: () => [
      {
        query: GET_ALL_TRIPS_REQ,
      },
    ],
  });
  const createTrip = async (e) => {
    e.preventDefault();
    await addTrip({
      variables: {
        requester: `${requester}`,
        destination: `${destination}`,
        departureDate: new Date(departureDate),
        returnDate: new Date(returnDate),
      },
    });
    setisModalOpen(false);
  };
  const [updateTrip] = useMutation(UPDATE_TRIP_REQ, {
    refetchQueries: () => [
      {
        query: GET_ALL_TRIPS_REQ,
      },
    ],
  });
  const editTrip = async (e) => {
    e.preventDefault();
    await updateTrip({
      variables: {
        id: editingTrip,
        requester: `${requester}`,
        destination: `${destination}`,
        departureDate: new Date(departureDate),
        returnDate: new Date(returnDate),
      },
    });
    setisModalOpen(false);
  };
  const [removeTrip] = useMutation(DELETE_TRIP_REQ, {
    refetchQueries: () => [
      {
        query: GET_ALL_TRIPS_REQ,
      },
    ],
  });
  const deleteTrip = async (id: any) => {
    await removeTrip({
      variables: {
        id: id,
      },
    });
  };
  return (
    <div>
      <div
        style={{
          background: "white",
          minHeight: 100,
          padding: 24,
          margin: "8px 0px",
        }}
      >
        <Title>Trip Requests</Title>
        <Breadcrumb style={{ margin: "8px 0" }}>
          <Breadcrumb.Item>Trip Requests</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
        <Button
          onClick={() => {
            setisModalOpen(true);
          }}
          icon={<PlusCircleOutlined />}
          shape="round"
          type="primary"
        >
          Add Trip Request
        </Button>
      </div>
      <div style={{ padding: 24, background: "white", minHeight: "60vh" }}>
        <Table
          pagination={false}
          sticky
          rowKey="id"
          columns={[
            { title: "Destination", dataIndex: "destination" },
            { title: "Requester", dataIndex: "requester" },
            {
              title: "Departure date",
              dataIndex: "departureDate",
              render: (departureDate) => {
                return <>{new Date(departureDate).toLocaleString()}</>;
              },
            },
            {
              title: "Return date",
              dataIndex: "returnDate",
              render: (returnDate) => {
                return <>{new Date(returnDate).toLocaleString()}</>;
              },
            },
            {
              title: "Manage",
              align: "center",
              dataIndex: "id",
              key: "id",
              render: (id) => {
                return (
                  <>
                    <Button
                      icon={<EditOutlined />}
                      type="link"
                      style={{ marginRight: "0.5rem" }}
                      onClick={() => {
                        seteditingTrip(id);
                        let selectedTrip = data.tripreqs.find(
                          (elm: any) => elm.id === id
                        );
                        setisModalOpen(true);
                      }}
                    ></Button>
                    <Button
                      danger
                      onClick={() => {
                        deleteTrip(id);
                      }}
                      icon={<DeleteOutlined />}
                    />
                  </>
                );
              },
            },
          ]}
          dataSource={data?.tripreqs}
          loading={false}
          style={{ overflowY: "scroll", maxHeight: "60vh" }}
          size="small"
          scroll={{ scrollToFirstRowOnChange: true }}
        />
      </div>
      <Modal
        title={editingTrip ? "Edit Trip Request" : "Add Trip Request"}
        onOk={(e) => {
          if (editingTrip) {
            editTrip(e);
          } else {
            createTrip(e);
          }
          formRef.current?.resetFields();
          seteditingTrip(null);
          setisModalOpen(false);
        }}
        onCancel={() => {
          setisModalOpen(false);
          formRef.current?.resetFields();
          seteditingTrip(null);
        }}
        open={isModalOpen}
      >
        <Form ref={formRef}>
          <Form.Item label="Destination">
            <Select
              loading={loading}
              showSearch
              style={{ width: 200 }}
              placeholder="Search to Select"
              filterOption={(input, option) =>
                `${option?.label ?? ""}`.includes(input)
              }
              options={data?.locations.map((locn: any) => ({
                label: locn.island,
                value: locn.id,
              }))}
              onSelect={(val) => {
                setdestination(val);
              }}
            />{" "}
          </Form.Item>
        <Form.Item label="Requester">
        <Select
              loading={loading}
              showSearch
              style={{ width: 200 }}
              placeholder="Search to Select"
              filterOption={(input, option) =>
                `${option?.label ?? ""}`.includes(input)
              }
              options={data?.requesters.map((req: any) => ({
                label: req.name,
                value: req.id,
              }))}
              onSelect={(val) => {
                setrequester(val);
              }}
              />{" "}
        </Form.Item>
          <Form.Item label="Departure">
            <DatePicker
              showTime
              onChange={(date, dateString) => {
                console.log("---newdate", date, dateString);
                setdepartureDate(dateString);
              }}
            />
          </Form.Item>
          <Form.Item label="Return">
            <DatePicker
              showTime
              onChange={(date, dateString) => {
                console.log("---newdate", date, dateString);
                setreturnDate(dateString);
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default TripRequests;
