import React, { useCallback, useContext, useState } from "react";
import { Flex, Input, Modal, Button, Space } from "antd";
import { axiosInstance } from "../src/api";
import { toast } from "react-hot-toast";
import UserContext from "../context/userContext";

function ModalEditUser({
  isModalOpenEditUser,
  setIsModalOpenEditUser,
  setUsersASF,
}) {
  const [EditUser, setEditUser] = useState(isModalOpenEditUser.user);

  const handleInputEditeUser = (e) => {
    const { name, value } = e.target;

    setEditUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const EditUserASF = useCallback(() => {
    if (!isModalOpenEditUser.status) return toast.error("No user is selected");

    axiosInstance
      .put(`/users/${isModalOpenEditUser.user._id}`, EditUser)
      .then(({ data }) => {
        console.log(data);

        setIsModalOpenEditUser({ status: false, user: null });

        const updatedUser = data?.data;
        if (updatedUser && updatedUser._id) {
          setUsersASF((prev) =>
            prev.map((user) =>
              user._id !== isModalOpenEditUser.user._id
                ? user
                : { ...user, ...updatedUser }
            )
          );
        }

        toast.success("Edit User Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error Edit User");
      });
  }, [EditUser, isModalOpenEditUser]);

  const handleCancel = () => {
    setIsModalOpenEditUser({ status: false, user: null });
  };
  return (
    <div>
      <Modal
        title="Edit User ASF"
        open={isModalOpenEditUser.status}
        onCancel={handleCancel}
        footer={null}
      >
        <Flex vertical gap={12}>
          <Input
            value={EditUser.first_name}
            onChange={handleInputEditeUser}
            name="first_name"
            placeholder=" Prenom "
            variant="filled"
          />
          <Input
            value={EditUser.last_name}
            onChange={handleInputEditeUser}
            name="last_name"
            placeholder="Nom"
            variant="filled"
          />
          <Input
            value={EditUser.email}
            onChange={handleInputEditeUser}
            name="email"
            placeholder="Email"
            variant="filled"
          />
          <Space direction="vertical">
            <Input.Password
              name="password"
              value={EditUser.password}
              onChange={handleInputEditeUser}
              placeholder="Mot de passe"
            />
          </Space>
        </Flex>
        <div
          style={{
            justifyContent: "flex-end",
            display: "flex",
            paddingTop: "20px",
          }}
        >
          <Button
            onClick={EditUserASF}
            style={{ backgroundColor: "#659a9a", color: "white" }}
          >
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default ModalEditUser;
