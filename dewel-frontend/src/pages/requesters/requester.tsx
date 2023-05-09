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
    ADD_REQ,
    UPDATE_REQ,
    DELETE_REQ,
  } from "../../GraphQL/Mutations";
  const { Title } = Typography;
  
  function Requesters() {
    const { loading, error, data } = useQuery(GET_ALL_REQUESTER);
    if (error) {
      message.error("could not fetch locations");
    }
  
  
  
    const [isModalOpen, setisModalOpen] = useState(false);
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [editingRequester, seteditingRequetser] = useState(null);
    const formRef = React.useRef<FormInstance>(null);
  
    const [addRequester] = useMutation(ADD_REQ, {
      refetchQueries: () => [
        {
          query: GET_ALL_REQUESTER,
        },
      ],
    });
    const createRequester = async (e) => {
      e.preventDefault();
      await addRequester({
        variables: {
          name: name,
          email: email,
        },
      });
      setisModalOpen(false);
    };
    const [updateRequester] = useMutation(UPDATE_REQ, {
      refetchQueries: () => [
        {
          query: GET_ALL_REQUESTER,
        },
      ],
    });
    const editRequester = async (e) => {
      e.preventDefault();
      await updateRequester({
        variables: {
          id: editingRequester,
          name: name,
          email: email,
        },
      });
      setisModalOpen(false);
    };
    const [removeRequester] = useMutation(DELETE_REQ, {
      refetchQueries: () => [
        {
          query: GET_ALL_REQUESTER,
        },
      ],
    });
    const deleteRequester = async (id: any) => {
      await removeRequester({
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
            <Breadcrumb.Item>Add Requesters</Breadcrumb.Item>
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
            Add Requester
          </Button>
        </div>
        <div style={{ padding: 24, background: "white", minHeight: "60vh" }}>
          <Table
            pagination={false}
            sticky
            rowKey="id"
            columns={[
              { title: "name", dataIndex: "name" },
              { title: "email", dataIndex: "email" },
              
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
                          seteditingRequetser(id);
                          let selectedRequetser = data.requesters.find(
                            (elm: any) => elm.id === id
                          );
                          setisModalOpen(true);
                        }}
                      ></Button>
                      <Button
                        danger
                        onClick={() => {
                          deleteRequester(id);
                        }}
                        icon={<DeleteOutlined />}
                      />
                    </>
                  );
                },
              },
            ]}
            dataSource={data?.requesters}
            loading={false}
            style={{ overflowY: "scroll", maxHeight: "60vh" }}
            size="small"
            scroll={{ scrollToFirstRowOnChange: true }}
          />
        </div>
        <Modal
          title={editingRequester ? "Edit Requester" : "Add Requester"}
          onOk={(e) => {
            if (editingRequester) {
              editRequester(e);
            } else {
              createRequester(e);
            }
            formRef.current?.resetFields();
            seteditingRequetser(null);
            setisModalOpen(false);
          }}
          onCancel={() => {
            setisModalOpen(false);
            formRef.current?.resetFields();
            seteditingRequetser(null);
          }}
          open={isModalOpen}
        >
          <Form ref={formRef}>
          <Form.Item label="name">
          <Input.TextArea
              onChange={(e) => {
                setname(e.target.value);
              }}
            ></Input.TextArea>
          </Form.Item>
            <Form.Item label="email">
            <Input.TextArea
              onChange={(e) => {
                setemail(e.target.value);
              }}
            ></Input.TextArea>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
  
  export default Requesters;
  