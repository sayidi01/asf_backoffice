import React, { useCallback, useContext, useState } from "react";
import { Flex, Input, Modal, Button } from "antd";
import { axiosInstance } from "../src/api";
import { toast } from "react-hot-toast";
import UserContext from "../context/userContext";



function ModalCreateProduct({ isModalOpen, setIsModalOpen, setProducts }) {
    const { setData, setisConnected } = useContext(UserContext);

    const [newProduct, setNewProduct] = useState({
        name : "",
        price: ""
    })

    console.log(newProduct)

    const handleInputCreateProduct = (e) => {
        const { name, value } = e.target;
    
        setNewProduct((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
    

  const handleCancel = () => {
    setIsModalOpen(false);
  };

    // Create New Product 

    const CreateNewProduct = useCallback(() => {
        if(
            !newProduct.name || !newProduct.price
        ){
            toast.error("Veuillez remplir tous les champs obligatoires.");
            return; 
        }
        console.log(newProduct)
        axiosInstance
        .post("/products", {...newProduct})
        .then(({data}) => {
            console.log(data)

            const newProd = data.data;
            if(newProd._id) {
              setProducts((prev) => [...prev, newProd]);
            }
            toast.success(" Create Product Successfully")
            setIsModalOpen(false);
        })
        .catch((err) => {
            console.log(err)
            toast.error("error Not Create product")
        })
    },[newProduct])

    

  return (
    <div>
      <Modal
        title="Create New Product ASF"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Flex vertical gap={12}>
          <Input value={newProduct.name} name="name" onChange={handleInputCreateProduct} placeholder="Name Product " variant="filled" />
          <Input value={newProduct.price} name="price" onChange={handleInputCreateProduct} placeholder="Price" variant="filled" />
        </Flex>
        <div style={{justifyContent: "flex-end", display: "flex" , paddingTop: "20px"}}>
        <Button onClick={CreateNewProduct} style={{backgroundColor: "#659a9a" , color: "white"}}  >Create</Button>
        </div>
      </Modal>
    </div>
  );
}

export default ModalCreateProduct;
