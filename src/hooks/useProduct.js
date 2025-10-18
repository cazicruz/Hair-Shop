'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';

// --- Centralized routes
const productRoutes = {
  createProduct: '/products',
  getAllProducts: '/products',
  getProductById: (id) => `/products/${id}`,
  changeProductStock: (id) => `/products/${id}/stock`,
  changeProductPopularity: (id) => `/products/${id}/popularity`,
  deleteProduct: (id) => `/products/${id}`,
  updateProduct: (id) => `/products/${id}`,
  updateProductImages: (id) => `/products/${id}/images`,
  bulkDeleteProducts: '/products/bulk',
};

// --- Hook
export function useProducts() {
  const queryClient = useQueryClient();

  // --- GET all products
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axiosClient.get(productRoutes.getAllProducts);
      return res.data;
    },
  });

  // --- Hook for fetching a single product (React Query)
    const useProductById = (id) =>
        useQuery({
            queryKey: ['product', id],
            queryFn: async () => {
            const res = await axiosClient.get(productRoutes.getProductById(id));
            return res.data.data.product;
            },
            enabled: !!id, // only fetch if id exists
        }
    );


  // --- GET one product by ID
  const getProductById = async (id) => {
    const res = await axiosClient.get(productRoutes.getProductById(id));
    return res.data.data;
  };

  // --- POST: create new product
  const createProduct = useMutation({
    mutationFn: async (data) => {
      const res = await axiosClient.post(productRoutes.createProduct, data);
      return res.data.product;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  // --- PUT: update a product
  const updateProduct = useMutation({
    mutationFn: async ({ id, updates }) => {
      const res = await axiosClient.put(productRoutes.updateProduct(id), updates);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  // --- DELETE: remove one product
  const deleteProduct = useMutation({
    mutationFn: async (id) => {
      const res = await axiosClient.delete(productRoutes.deleteProduct(id));
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  // --- PATCH: change product stock
  const changeProductStock = useMutation({
    mutationFn: async ({ id, stock }) => {
      const res = await axiosClient.patch(productRoutes.changeProductStock(id), { stock });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  // --- PATCH: change product popularity
  const changeProductPopularity = useMutation({
    mutationFn: async ({ id, popularity }) => {
      const res = await axiosClient.patch(productRoutes.changeProductPopularity(id), { popularity });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  // --- PUT: update product images
  const updateProductImages = useMutation({
    mutationFn: async ({ id, images }) => {
      const res = await axiosClient.put(productRoutes.updateProductImages(id), { images });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  // --- POST: bulk delete products
  const bulkDeleteProducts = useMutation({
    mutationFn: async (ids) => {
      const res = await axiosClient.post(productRoutes.bulkDeleteProducts, { ids });
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  });

  return {
    products,
    isLoading,
    isError,
    useProductById,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    changeProductStock,
    changeProductPopularity,
    updateProductImages,
    bulkDeleteProducts,
  };
}
