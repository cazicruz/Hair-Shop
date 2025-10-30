'use client'
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAdmin } from "@/hooks/useAdmin";
import { useOrder } from "@/hooks/useOrder";

// Styled Components
const Container = styled.div`
  padding: 24px;
`;

const Title = styled.h2`
  margin-bottom: 16px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 8px;
  background: #f5f5f5;
`;

const Td = styled.td`
  padding: 8px;
  border-bottom: 1px solid #eee;
  vertical-align: top;
`;

const Img = styled.img`
  width: 40px;
  margin-right: 4px;
`;

const Input = styled.input`
  padding: 6px;
  margin-bottom: 4px;
  width: 100%;
`;

const Select = styled.select`
  padding: 6px;
  width: 100%;
`;

const Button = styled.button`
  padding: 6px 12px;
  margin-right: 8px;
  background: ${(props) => (props.danger ? "#ff4d4f" : "#1890ff")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const statusOptions = ['pending', 'shipping', 'delivered', 'canceled'];

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const { updateOrderStatus,hardDeleteOrder } = useOrder();
  const { orders: hookOrders, isOrdersLoading, isOrdersError, useOrders } = useAdmin();

  
  useEffect(() => {
    // Fetch orders from backend when component mounts
    async function fetchOrders() {
      console.log("Hook Orders:", hookOrders);
      setOrders(hookOrders || []);
    }
    fetchOrders();
  }, [hookOrders, isOrdersLoading]);
  
  if (isOrdersError) {
    return <div>Error loading orders.</div>;
  }

  const handleStatusChange = async (orderId, newStatus) => {
    await updateOrderStatus.mutateAsync({ orderId, status: newStatus })
      .then(() => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
      });
  };

  const handleDelete = (id) => {
    hardDeleteOrder.mutate(id, {
      onSuccess: () => {
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));    
      }
    });
  };

  return (
    <Container>
      <Title>Admin Order Management</Title>
      <Table>
        <thead>
          <tr>
            <Th>Order ID</Th>
            <Th>Date</Th>
            <Th>Status</Th>
            <Th>Customer</Th>
            <Th>Items</Th>
            <Th>Total</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <Td>{order._id}</Td>
              <Td>
                {new Date(order.createdAt).toLocaleDateString()}
              </Td>
              <Td>
                  <Select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value.toLowerCase())}
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </Select>
                  {/* order.status */}
              </Td>
              <Td>
                  <>
                    <strong>{order?.contactInfo?.name}</strong>
                    <br />
                    {order?.contactInfo?.email}
                    <br />
                    {order?.contactInfo?.phone}
                  </>
              </Td>
              <Td>
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      <strong>{item.name}</strong> x{item.quantity}
                      <br />
                      <span>{item.description}</span>
                      <br />

                       {item.productId?.images?.length > 0 && (
                        <img
                          src={item.productId.images[0]}
                          alt={item.productId.name}
                          style={{ width: 80, height: 80, borderRadius: 8 }}
                        />
      )}
                    </li>
                  ))}
                </ul>
              </Td>
              <Td>₦{order.totalAmount}</Td>
              <Td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button danger onClick={() => handleDelete(order._id)}>Delete</Button>
                  </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminOrders;
 