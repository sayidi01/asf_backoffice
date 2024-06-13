import React, { useCallback, useContext, useState } from "react";
import { Flex, Input, Modal, Button } from "antd";
import { axiosInstance } from "../src/api";
import { toast } from "react-hot-toast";
import UserContext from "../context/userContext";

function ModalEditProduct({
  isModalOpenEdit,
  setIsModalOpenEdit,
  setProducts,
}) {
  const [editProduct, setEditProduct] = useState({
    name: isModalOpenEdit.productData.name,
    price: isModalOpenEdit.productData.price,
  });

  const changeInputEditProduct = (e) => {
    const { name, value } = e.target;

    setEditProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Edit Product ASF

  const EditProductASF = useCallback(
    (productId) => {
      if (!isModalOpenEdit.status) return toast.error("No product is selected");

      axiosInstance
        .put(`/products/${isModalOpenEdit.productData._id}`, editProduct)
        .then(({ data }) => {
          console.log(data.data);

          toast.success("Edit Product Successfully");
          setIsModalOpenEdit({ status: false, productData: null });
          setProducts((prev) =>
            prev.map((prod) =>
              prod._id !== isModalOpenEdit.productData._id ? prod : { ...prod, ...data.data }
            )
          );
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error Edit Product");
          setIsModalOpenEdit({ status: false, productData: null });
        });
    },
    [isModalOpenEdit, editProduct]
  );

  const handleCancel = () => {
    setIsModalOpenEdit({ status: false, productData: null });
  };

  if (!isModalOpenEdit.status) return "No product is selected";

  return (
    <div>
      <Modal
        title="Edit Product ASF"
        open={isModalOpenEdit}
        onCancel={handleCancel}
        footer={null}
      >
        <Flex vertical gap={12}>
          <Input
            value={editProduct.name}
            onChange={changeInputEditProduct}
            name="name"
            defaultValue={isModalOpenEdit.productData.name}
            placeholder="Name Product "
            variant="filled"
          />
          <Input
            value={editProduct.price}
            onChange={changeInputEditProduct}
            name="price"
            defaultValue={isModalOpenEdit.productData.price}
            placeholder="Price"
            variant="filled"
          />
        </Flex>
        <div
          style={{
            justifyContent: "flex-end",
            display: "flex",
            paddingTop: "20px",
          }}
        >
          <Button
            onClick={EditProductASF}
            style={{ backgroundColor: "#659a9a", color: "white" }}
          >
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default ModalEditProduct;
