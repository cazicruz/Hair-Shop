'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';
import { toast } from 'react-toastify';

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


export function useProductById(productId) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const res = await axiosClient.get(productRoutes.getProductById(productId));
      return res.data.data.product || res.data.data;
    },
    enabled: !!productId,
  });
}

// --- Hook
export function useProducts(options, filters) {
  const queryClient = useQueryClient();

  const { 
    page = 1, 
    limit = 12, 
    sortBy = 'createdAt',
    populate = '',
    enabled = true // Allow disabling the query
  } = options || {};

  const { 
    search = '', 
    category = '', 
    minPrice = '', 
    maxPrice = '' 
  } = filters || {};

  // --- GET all products
  const {
    data,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ['products',{ 
    page , 
    limit, 
    sortBy,
    populate,
    }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (page) params.append('page', page);
      if (limit) params.append('limit', limit);
      if (sortBy) params.append('sortBy', sortBy);
      if(filters){
        if (search) params.append('search', search);
        if (category) params.append('category', category);
        if (minPrice) params.append('minPrice', minPrice);
        if (maxPrice) params.append('maxPrice', maxPrice);
      }
      const res = await axiosClient.get(productRoutes.getAllProducts, { params });
      return res.data.data;
    },
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

   const products = data?.products.data || [];
  const totalProducts = data?.products.total || 0;
  const currentPage = data?.products.currentPage || page;
  const totalPages = data?.products.totalPages || 1;

  // --- GET one product by ID
  const getProductById = async (id) => {
    const res = await axiosClient.get(productRoutes.getProductById(id));
    return res.data.data;
  };

  // --- POST: create new product
  const createProduct = useMutation({
    mutationFn: async (data) => {
      const res = await axiosClient.post(productRoutes.createProduct, data,{
         headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] }),
      toast.success('product created  successfully!', { className: 'toast-success' });
  }
  });

  // --- PUT: update a product
  const updateProduct = useMutation({
    mutationFn: async ({ id, updates }) => {
      const res = await axiosClient.put(productRoutes.updateProduct(id), updates);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] }),
      toast.success('product updated  successfully!', { className: 'toast-success' });
    }
  });

  // --- DELETE: remove one product
  const deleteProduct = useMutation({
    mutationFn: async (id) => {
      const res = await axiosClient.delete(productRoutes.deleteProduct(id));
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] }),
      toast.success('product deleted  successfully!', { className: 'toast-success' });
    }
  });

  // --- PATCH: change product stock
  const changeProductStock = useMutation({
    mutationFn: async ({ id, stock }) => {
      const res = await axiosClient.patch(productRoutes.changeProductStock(id), { stock });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] }),
      toast.success('product stock updated successfully!', { className: 'toast-success' });
    }
  });

  // --- PATCH: change product popularity
  const changeProductPopularity = useMutation({
    mutationFn: async ({ id, popularity }) => {
      const res = await axiosClient.patch(productRoutes.changeProductPopularity(id), { popularity });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] }),
      toast.success('product popularity updated successfully!', { className: 'toast-success' });
    }
  });

  // --- PUT: update product images
  const updateProductImages = useMutation({
    mutationFn: async ({ id, images }) => {
      const res = await axiosClient.put(productRoutes.updateProductImages(id), { images });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] }),
      toast.success('product images updated successfully!', { className: 'toast-success' });
    }
  });

  // --- POST: bulk delete products
  const bulkDeleteProducts = useMutation({
    mutationFn: async (ids) => {
      const res = await axiosClient.post(productRoutes.bulkDeleteProducts, { ids });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] }),
      toast.success('products deleted successfully!', { className: 'toast-success' });
    }
  });

  return {
    products,
    totalProducts,
    currentPage,
    totalPages,
    isFetching,
    isLoading,
    isError,
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
