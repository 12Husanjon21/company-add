import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiArrowLeftCircle } from "react-icons/fi";
import { Table, Button, Modal, Form, Input, message } from "antd";

const HomePage = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://45.138.158.137:92/api/companies/all"
      );
      setCompanies(response.data);
    } catch (error) {
      message.error("Xatolik yuz berdi: " + error.message);
    }
    setLoading(false);
  };

  const handleAddOrEditCompany = async (values) => {
    try {
      if (currentCompany) {
        await axios.put(
          `http://45.138.158.137:92/api/companies/edit/${currentCompany.id}`,
          values
        );
        message.success("Kompaniya yangilandi!");
      } else {
        await axios.post("http://45.138.158.137:92/api/companies/add", values);
        message.success("Kompaniya qo'shildi!");
      }
      fetchCompanies();
      setModalVisible(false);
      form.resetFields();
      setCurrentCompany(null);
    } catch (error) {
      message.error("Xatolik yuz berdi: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://45.138.158.137:92/api/companies/delete/${id}`);
      message.success("Kompaniya o'chirildi!");
      fetchCompanies();
    } catch (error) {
      message.error("Xatolik yuz berdi: " + error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/signin");
  };

  const columns = [
    {
      title: "Название компании",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Количество сотрудников",
      dataIndex: "employees",
      key: "employees",
    },
    {
      title: "Действия",
      key: "actions",
      render: (record) => (
        <>
          <Button
            onClick={() => {
              setCurrentCompany(record);
              form.setFieldsValue(record);
              setModalVisible(true);
            }}
          >
            Редактировать
          </Button>
          <Button
            onClick={() => handleDelete(record.id)}
            danger
            style={{ marginLeft: 8 }}
          >
            Удалить
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="container">
      <nav className="bg-[#313131]">
        <div className="max-w-full flex justify-between mx-4 items-center py-4">
          <h1 className="text-2xl font-bold text-white">Компании</h1>
          <div className="flex items-center gap-x-3">
            <button
              className="text-white cursor-pointer"
              onClick={handleLogout}
            >
              <FiArrowLeftCircle size={28} />
            </button>
            <Button type="primary" onClick={() => setModalVisible(true)}>
              Добавить компания
            </Button>
          </div>
        </div>
      </nav>

      <Table
        columns={columns}
        dataSource={companies}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={currentCompany ? "Редактировать компанию" : "Добавить компанию"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setCurrentCompany(null);
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleAddOrEditCompany} layout="vertical">
          <Form.Item
            name="name"
            label="Название компании"
            rules={[{ required: true, message: "Введите название компании" }]}
          >
            <Input placeholder="Введите название" />
          </Form.Item>
          <Form.Item
            name="employees"
            label="Количество сотрудников"
            rules={[
              { required: true, message: "Введите количество сотрудников" },
            ]}
          >
            <Input type="number" placeholder="Введите количество" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HomePage;
