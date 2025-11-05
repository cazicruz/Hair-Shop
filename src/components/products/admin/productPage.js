"use client"

import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Button, Table, Modal, message } from "antd"
import { ProductModal } from "@/components/modals/product-modal"
import { useProducts } from "@/hooks/useProduct"
import {Image} from "antd";


// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Header = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #111;
`

const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
`

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #e8e8e8;
  
  &:hover {
    opacity: 0.8;
  }
`

// Component
export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [search,setSearch] = useState('')
  const limit=10;
      const { 
    products:fetchedProducts, 
    isLoading, 
    isFetching,
    totalPages:allPages,
    currentPage,
    totalProducts ,
   deleteProduct,
    } = useProducts({ page, limit },{});

  const fetchProducts = async (pageNum = 1) => {
    setLoading(true)
    try {
      setProducts(fetchedProducts || [])
      setTotalPages(allPages || 1)
      setPage(currentPage || pageNum)
      setLoading(isLoading)
    } catch (error) {
      console.error("Failed to fetch products:", error)
      message.error("Failed to load products")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts(page)
  }, [page,loading,isLoading ])

  const handleCreateNew = () => {
    setSelectedProduct(null)
    setIsCreating(true)
    setIsModalOpen(true)
  }

  const handleEdit = (product) => {
    setSelectedProduct(product)
    setIsCreating(false)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return

    try {
      setLoading(true)
      await deleteProduct.mutateAsync(id)
      
      message.success("Product deleted")
    } catch (error) {
      console.error("Failed to delete product:", error)
      message.error("Delete failed")
    }finally{
      setLoading(false)
    }
  }

  // const handleBulkDelete = async (ids) => {
  //   if (!window.confirm(`Delete ${ids.length} products?`)) return

  //   try {
  //     deleteProduct.mutateAsync(ids)
  //     fetchProducts(page)
  //     message.success("Products deleted")
  //   } catch (error) {
  //     console.error("Failed to bulk delete:", error)
  //     message.error("Bulk delete failed")
  //   }
  // }

  const handleSave = () => {
    setLoading(true)
    
    setIsModalOpen(false)
  }

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Brand", dataIndex: "brand", key: "brand" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Stock", dataIndex: "stockQuantity", key: "stock" },
    { title: "image", dataIndex: "images", key: "images",
      width:100,
      render: (images) => {
      if (!images || images.length === 0) {
        return <ProductImage src="/placeholder.png" alt="No image" />;
      }

      return (
        <Image.PreviewGroup>
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>

          {images.slice(0, 3).map((img, index) => ( // ✅ Show first 3 images
            <Image
              key={index}
              src={img}
              alt={`Product ${index + 1}`}
              width={50}
              height={50}
              style={{ 
                objectFit: 'cover', 
                borderRadius: '4px',
                marginRight: '4px',
                cursor: 'pointer'
              }}
              preview={{
                src: img,
              }}
            />
          ))}
          {images.length > 3 && (
            <span style={{ fontSize: '12px', color: '#888' }}>
              +{images.length - 3} more
            </span>
          )}
          </div>
        </Image.PreviewGroup>
      );
    }

     },
    { title: "Popularity", dataIndex: "popularity", key: "popularity" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>Delete</Button>
        </>
      ),
    },
  ]

  return (
    <PageContainer>
      <Header>
        <Title>Product Management</Title>
        {/* <div>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // Reset to page 1 on search
          }}
        />
        </div> */}
        <Button type="primary" size="large" onClick={handleCreateNew}>
          + Add Product
        </Button>
      </Header>

      <Content>
        <Table
          dataSource={products}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{
            current: page,
            total: totalPages * limit,
            onChange: (p) => setPage(p),
          }}
        />
      </Content>

      {/* <Modal
        title={isCreating ? "Create Product" : "Edit Product"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSave}
        okText="Save"
      > */}
        {/* You can place your form fields here */}
        <ProductModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          product={selectedProduct}
          isCreating={isCreating}
          onSave={handleSave}
        />
      {/* </Modal> */}
    </PageContainer>
  )
}
