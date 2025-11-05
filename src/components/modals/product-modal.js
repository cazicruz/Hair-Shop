"use client"

import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Modal, Input, InputNumber, Button, Upload, message, Select } from "antd"
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import { useProducts } from "@/hooks/useProduct"
import { toast } from "react-toastify"

const { TextArea } = Input;
const { Option } = Select;

// Styled Components
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 8px;
`

const FieldGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`

const FormField = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 14px;
`

// ✅ Styled component for length fields
const LengthInputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  gap: 0.5rem;
`

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
  margin-top: 0.5rem;
`

const ImageBox = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #d9d9d9;
  background: #fafafa;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .delete-btn {
    position: absolute;
    top: 4px;
    right: 4px;
    border: none;
    background: rgba(255, 77, 79, 0.9);
    color: white;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    
    &:hover {
      background: #ff4d4f;
      transform: scale(1.1);
    }
  }
`

const UploadBox = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #fafafa;
  transition: all 0.3s;
  
  &:hover {
    border-color: #1890ff;
    background: #f0f5ff;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e8e8e8;
`

export function ProductModal({ open, onOpenChange, product, isCreating, onSave }) {
  const { createProduct, updateProduct } = useProducts();
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    brand: "",
    tags: [],
    stockQuantity: 0,
    popularity: 0,
    color: "",
    categories: [],
    length: { value: 0, unit: "inches" },
    isDeleted: false,
  })
  const [images, setImages] = useState([])
  const [previewImages,setPreviewImages] = useState([])
  const [imageFiles, setImageFiles] = useState([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (product && open) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || 0,
        brand: product.brand || "",
        stockQuantity: product.stockQuantity || 0,
        popularity: product.popularity || 0,
        color: product.color || "",
        categories: product.categories || [],
        tags: product.tags || [],
        length: product.length || { value: 0, unit: "inches" },
        isDeleted: product.isDeleted || false,
        // images:product.images ||[],
      })
      setPreviewImages(product.images ||[]);
      setImages(product.images || [])
      setImageFiles([])
    } else if (!product && open) {
      // Reset form for creating new product
      setFormData({
        name: "",
        description: "",
        price: 0,
        brand: "",
        stockQuantity: 0,
        popularity: 0,
        color: "",
        categories: [],
        tags: [],
        length: { value: 0, unit: "inches" },
        isDeleted: false,
      })
      setImages([])
      setImageFiles([])
    }
  }, [product, open])

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.price || formData.price <= 100 || !formData.brand) {
    message.error("Please fill in all required fields and ensure price is greater than ₦100");
    return;
  }

  // ✅ For edits, allow keeping old images
  if (isCreating && imageFiles.length === 0) {
    message.error("Please upload at least one product image");
    return;
  }

  setUploading(true);

  try {
    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description || "");
    form.append("price", parseFloat(formData.price));
    form.append("brand", formData.brand);
    form.append("stockQuantity", parseInt(formData.stockQuantity) || 0);
    form.append("popularity", parseInt(formData.popularity) || 0);
    form.append("color", formData.color || "");
    form.append("categories", JSON.stringify(formData.categories || []));
    form.append("tags", JSON.stringify(formData.tags || []));
    form.append("length", JSON.stringify({
      value: parseFloat(formData.length.value) || 0,
      unit: formData.length.unit || "inches"
    }));   
    // ✅ Only append new image files
    imageFiles.forEach((file) => {
      form.append("fImages", file.originFileObj);
    });

    // ✅ Send existing images if editing
    if (!isCreating) {
      images.forEach((img) => {
    form.append("images", img);
  });
    }

    let response;
    if (isCreating) {
      response = await createProduct.mutateAsync(form);
    } else {

      response = await updateProduct.mutateAsync({ id: product._id, updates: form });
    }

    onSave();
    onOpenChange(false);
  } catch (error) {
    console.error("Failed to save product:", error);
    message.error(error?.response?.data?.message || "Failed to save product");
  } finally {
    setUploading(false);
  }
};



  // Upload images to cloudinary or your backend
  // const uploadImages = async (files) => {
  //   const formData = new FormData();
  //   files.forEach((file) => {
  //     formData.append('images', file.originFileObj);
  //   });

  //   try {
  //     const response = await fetch('/api/upload', {
  //       method: 'POST',
  //       body: formData,
  //     });
      
  //     if (!response.ok) throw new Error('Upload failed');
      
  //     const data = await response.json();
  //     return data.urls; // Array of uploaded image URLs
  //   } catch (error) {
  //     console.error('Image upload error:', error);
  //     message.error('Failed to upload images');
  //     return [];
  //   }
  // }

  const handleImageUpload = (info) => {
    const newFiles = info.fileList.filter(file => !file.url); // Only new files
    setImageFiles(newFiles);
    
    // Show preview of new files
    const previews = newFiles.map(file => URL.createObjectURL(file.originFileObj));
    setImageFiles(prev => [...prev, ...newFiles]);
    setImages(prev => [...prev]); // don't insert blob here
    setPreviewImages(prev => [...prev, ...previews]); // new preview state

    // setImages(prev => [...prev, ...previews]);
  }

  const removeImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index))
    setImages((prev) => prev.filter((_, i) => i !== index))
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Modal
      title={isCreating ? "Create New Product" : "Edit Product"}
      open={open}
      onCancel={() => onOpenChange(false)}
      footer={null}
      width={800}
      destroyOnClose
    >
      <FormContainer onSubmit={handleSubmit}>
        <FieldGroup>
          <FormField>
            <Label>Product Name *</Label>
            <Input
              placeholder="Enter product name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </FormField>

          <FormField>
            <Label>Brand *</Label>
            <Input
              placeholder="Enter brand name"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              required
            />
          </FormField>

          <FormField>
            <Label>Price (₦) *</Label>
            <InputNumber
              placeholder="0.00"
              value={formData.price}
              onChange={(value) => setFormData({ ...formData, price: value })}
              style={{ width: "100%" }}
              min={100}
              step={100}
              formatter={value => `₦ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/₦\s?|(,*)/g, '')}
            />
          </FormField>

          <FormField>
            <Label>Stock Quantity</Label>
            <InputNumber
              placeholder="0"
              value={formData.stockQuantity}
              onChange={(value) => setFormData({ ...formData, stockQuantity: value })}
              style={{ width: "100%" }}
              min={0}
            />
          </FormField>

          <FormField>
            <Label>Color</Label>
            <Input
              placeholder="e.g., Black, Red"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            />
          </FormField>

          <FormField>
            <Label>Popularity</Label>
            <InputNumber
              placeholder="0"
              value={formData.popularity}
              onChange={(value) => setFormData({ ...formData, popularity: value })}
              style={{ width: "100%" }}
              min={0}
            />
          </FormField>
        </FieldGroup>

        {/* ✅ Length field */}
        <FormField>
          <Label>Length</Label>
          <LengthInputGroup>
            <InputNumber
              placeholder="Enter length"
              value={formData.length?.value || 0}
              onChange={(value) => setFormData({ 
                ...formData, 
                length: { ...formData.length, value: value || 0 }
              })}
              min={0}
              step={0.5}
              style={{ width: "100%" }}
            />
            <Select
              value={formData.length?.unit || "inches"}
              onChange={(value) => setFormData({ 
                ...formData, 
                length: { ...formData.length, unit: value }
              })}
            >
              <Option value="inches">Inches</Option>
              <Option value="meters">Meters</Option>
              <Option value="feet">Feet</Option>
            </Select>
          </LengthInputGroup>
        </FormField>

        <FormField>
          <Label>Categories</Label>
          <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Select or add categories"
            value={formData.categories}
            onChange={(value) => setFormData({ ...formData, categories: value })}
          >
            <Option value="Wigs">Wigs</Option>
            <Option value="Bundles">Bundles</Option>
            <Option value="Closures">Closures</Option>
            <Option value="Frontals">Frontals</Option>
            <Option value="Accessories">Accessories</Option>
          </Select>
        </FormField>

        {/* ✅ Tags field */}
        <FormField>
          <Label>Tags</Label>
          <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Add tags (press Enter to add)"
            value={formData.tags}
            onChange={(value) => setFormData({ ...formData, tags: value })}
          >
            <Option value="New Arrival">New Arrival</Option>
            <Option value="Best Seller">Best Seller</Option>
            <Option value="Sale">Sale</Option>
            <Option value="Premium">Premium</Option>
          </Select>
        </FormField>

        <FormField>
          <Label>Description</Label>
          <TextArea
            rows={4}
            placeholder="Enter product description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </FormField>

        <FormField>
          <Label>Product Images *</Label>
          <ImageGrid>
            {previewImages.map((img, index) => (
              <ImageBox key={index}>
                <img src={img} alt={`Product ${index + 1}`} />
                <button 
                  type="button" 
                  className="delete-btn"
                  onClick={() => removeImage(index)}
                >
                  <DeleteOutlined style={{ fontSize: "12px" }} />
                </button>
              </ImageBox>
            ))}
            
            <Upload
              multiple
              listType="picture"
              showUploadList={false}
              beforeUpload={() => false}
              onChange={handleImageUpload}
              accept="image/*"
            >
              <UploadBox>
                <PlusOutlined style={{ fontSize: 24, color: '#999' }} />
                <div style={{ marginTop: 8, fontSize: 12, color: '#999' }}>
                  Upload
                </div>
              </UploadBox>
            </Upload>
          </ImageGrid>
          <div style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
            Supported formats: JPG, PNG, WEBP. Max 5MB per image. At least 1 image required.
          </div>
        </FormField>

        <ButtonGroup>
          <Button onClick={() => onOpenChange(false)} disabled={uploading}>
            Cancel
          </Button>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={uploading}
            disabled={uploading}
          >
            {uploading ? 'Saving...' : (isCreating ? 'Create Product' : 'Save Changes')}
          </Button>
        </ButtonGroup>
      </FormContainer>
    </Modal>
  )
}