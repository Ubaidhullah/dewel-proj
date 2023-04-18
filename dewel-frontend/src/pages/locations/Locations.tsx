import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import {
  Breadcrumb,
  Button,
  Form,
  FormInstance,
  Input,
  Modal,
  Table,
  Typography,
  message,
} from "antd";
import React, { useState } from "react";
import { GET_ALL_LOCATIONS } from "../../GraphQL/Queries";
import {
  ADD_LOCATION,
  DELETE_LOCATION,
  UPDATE_LOCATION,
} from "../../GraphQL/Mutations";
const { Title } = Typography;

function Locations() {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [editingLocation, seteditingLocation] = useState(null);
  const { loading, error, data } = useQuery(GET_ALL_LOCATIONS);
  if (error) {
    message.error("could not fetch locations");
  }
  const [island, setIsland] = useState("");
  const [description, setDescrription] = useState("");
  const formRef = React.useRef<FormInstance>(null);

  const [addLocation] = useMutation(ADD_LOCATION, {
    refetchQueries: () => [
      {
        query: GET_ALL_LOCATIONS,
      },
    ],
  });
  const createLocation = async (e) => {
    e.preventDefault();
    await addLocation({
      variables: {
        island: island,
        description: description,
      },
    });
    setisModalOpen(false);
  };
  const [updateLocation] = useMutation(UPDATE_LOCATION, {
    refetchQueries: () => [
      {
        query: GET_ALL_LOCATIONS,
      },
    ],
  });
  const editLocation = async (e) => {
    e.preventDefault();
    await updateLocation({
      variables: {
        id: editingLocation,
        island: island,
        description: description,
      },
    });
    setisModalOpen(false);
  };
  const [removeLocation] = useMutation(DELETE_LOCATION, {
    refetchQueries: () => [
      {
        query: GET_ALL_LOCATIONS,
      },
    ],
  });
  const deleteLocation = async (id: any) => {
    await removeLocation({
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
        <Title>Locations</Title>
        <Breadcrumb style={{ margin: "8px 0" }}>
          <Breadcrumb.Item>Locations</Breadcrumb.Item>
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
          Add Location
        </Button>
      </div>
      <div style={{ padding: 24, background: "white", minHeight: "60vh" }}>
        <Table
          pagination={false}
          sticky
          rowKey="id"
          columns={[
            { title: "Island", dataIndex: "island" },
            { title: "Description", dataIndex: "description" },
            {
              title: "Manage",
              align: "center",
              dataIndex: "id",
              key: "id",
              render: (id) => {
                return (
                  <>
                    <Button
                      onClick={() => {
                        seteditingLocation(id);
                        let selectedLocation = data.locations.find(
                          (elm: any) => elm.id === id
                        );
                        formRef.current?.setFieldsValue({
                          description: selectedLocation.description,
                          island: selectedLocation.island,
                        });
                        setisModalOpen(true);
                      }}
                      icon={<EditOutlined />}
                      type="link"
                      style={{ marginRight: "0.5rem" }}
                    ></Button>
                    <Button
                      danger
                      onClick={() => {
                        deleteLocation(id);
                      }}
                      icon={<DeleteOutlined />}
                    />
                  </>
                );
              },
            },
          ]}
          dataSource={data?.locations}
          loading={loading}
          style={{ overflowY: "scroll", maxHeight: "60vh" }}
          size="small"
          scroll={{ scrollToFirstRowOnChange: true }}
        />
      </div>
      <Modal
        title={editingLocation ? "Edit location" : "Add Location"}
        onOk={async (e) => {
          if (editingLocation) {
            editLocation(e);
          } else {
            createLocation(e);
          }
          formRef.current?.resetFields();
          seteditingLocation(null);
        }}
        onCancel={() => {
          setisModalOpen(false);
          formRef.current?.resetFields();
          seteditingLocation(null);
        }}
        open={isModalOpen}
      >
        <Form ref={formRef}>
          <Form.Item name="island" label="Island">
            <Input
              onChange={(e) => {
                setIsland(e.target.value);
              }}
            ></Input>
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea
              onChange={(e) => {
                setDescrription(e.target.value);
              }}
            ></Input.TextArea>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Locations;
