import React, { useCallback, useContext, useState } from "react";
import { Flex, Input, Modal, Button, Space } from "antd";
import { axiosInstance } from "../src/api";
import { toast } from "react-hot-toast";
import UserContext from "../context/userContext";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

function ModalCreateUser({ isModalOpen, setIsModalOpen }) {
    const { setData, setisConnected } = useContext(UserContext);

const [User, setUser] = useState({
    first_name : "",
    last_name : "",
    email: "",
    password: ""
})

console.log(User)

const handleInputCreateUser = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

// Create New User ASF 

const CreateNewUserASF = useCallback(() => {
    axiosInstance
    .post("/users", {...User})
    .then(({data}) => {
        console.log(data)
        toast.success("Create User  Successfully")
        setIsModalOpen(false);
    })
    .catch((err) => {
        console.log(err)
        toast.error("error Not Create User")
    })
},[User])



    const handleCancel = () => {
        setIsModalOpen(false);
      };
  return (
    <div>
    <Modal
      title="Create New User ASF"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Flex vertical gap={12}>
        <Input value={User.first_name} onChange={handleInputCreateUser}  name="first_name"  placeholder=" Prenom " variant="filled" />
        <Input value={User.last_name}  onChange={handleInputCreateUser} name="last_name"  placeholder="Nom" variant="filled" />
        <Input value={User.email}  onChange={handleInputCreateUser} name="email"  placeholder="Email" variant="filled" />
        <Space direction="vertical">
      <Input.Password name="password" value={User.password}  onChange={handleInputCreateUser} placeholder="Mot de passe" />
      </Space>
      </Flex>
      <div style={{justifyContent: "flex-end", display: "flex" , paddingTop: "20px"}}>
      <Button onClick={CreateNewUserASF} style={{backgroundColor: "#659a9a" , color: "white"}}  >Create</Button>
      </div>
    </Modal>
  </div>
  )
  }

export default ModalCreateUser
