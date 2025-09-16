'use client'
import React, { useState } from "react";
import styled from "styled-components";

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

const dummyOrders = [
    {
        id: 'ORD001',
        date: '2024-06-01',
        status: 'Pending',
        items: [
            {
                name: "Body Wave Bundle",
                price: 25000,
                quantity: 2,
                description: "Soft, bouncy texture",
                image: ["/images/wig2.png"]
            },
            {
                name: 'Hair Oil',
                price: 5000,
                quantity: 1,
                description: "Nourishing hair oil",
                image:[ "/images/wig3.png"]
            },
        ],
        total: 25.99,
    },
    {
        id: 'ORD002',
        date: '2024-05-28',
        status: 'Delivered',
        items: [
            {
                name: "Body Wave Bundle",
                price: 25000,
                quantity: 2,
                description: "Soft, bouncy texture",
                image: ["/images/wav hair.png", "/images/wig1.png"]
            },
        ],
        total: 12.99,
    },
    {
        id: 'ORD003',
        date: '2024-06-03',
        status: 'Shipped',
        items: [
            { 
            name: "Body Wave Bundle",
            price: 25000,
            quantity: 2,
            description: "Soft, bouncy texture",
            image: ["/images/red-hair.png", "/images/red-hair.png"]
            },
            {
            name: "Closure 4x4",
            price: 15000,
            quantity: 1,
            description: "Perfect finish for your install",
            image:[ "/images/red-hair.png", "/images/red-hair.png" ]
            }
        ],
        total: 30.00,
    },
];
const statusOptions = ["Pending", "Shipped", "Delivered", "Cancelled"];

function AdminOrders() {
  const [orders, setOrders] = useState(dummyOrders);
  const [editId, setEditId] = useState(null);
  const [editDate, setEditDate] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editCustomer, setEditCustomer] = useState({ name: "", email: "", phone: "" });

  const handleDelete = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const handleEdit = (order) => {
    setEditId(order.id);
    setEditDate(order.date);
    setEditStatus(order.status);
    setEditCustomer({ ...order.customer });
  };

  const handleSave = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? {
              ...order,
              date: editDate,
              status: editStatus,
              customer: { ...editCustomer },
            }
          : order
      )
    );
    setEditId(null);
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
            <tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>
                {editId === order.id ? (
                  <Input
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                  />
                ) : (
                  order.date
                )}
              </Td>
              <Td>
                {editId === order.id ? (
                  <Select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </Select>
                ) : (
                  order.status
                )}
              </Td>
              <Td>
                {editId === order.id ? (
                  <>
                    <Input
                      type="text"
                      placeholder="Name"
                      value={editCustomer.name}
                      onChange={(e) =>
                        setEditCustomer({ ...editCustomer, name: e.target.value })
                      }
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={editCustomer.email}
                      onChange={(e) =>
                        setEditCustomer({ ...editCustomer, email: e.target.value })
                      }
                    />
                    <Input
                      type="tel"
                      placeholder="Phone"
                      value={editCustomer.phone}
                      onChange={(e) =>
                        setEditCustomer({ ...editCustomer, phone: e.target.value })
                      }
                    />
                  </>
                ) : (
                  <>
                    <strong>{order?.customer?.name}</strong>
                    <br />
                    {order?.customer?.email}
                    <br />
                    {order?.customer?.phone}
                  </>
                )}
              </Td>
              <Td>
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      <strong>{item.name}</strong> x{item.quantity}
                      <br />
                      <span>{item.description}</span>
                      <br />
                      {item.image.map((img, i) => (
                        <Img key={i} src={img} alt={item.name} />
                      ))}
                    </li>
                  ))}
                </ul>
              </Td>
              <Td>₦{order.total}</Td>
              <Td>
                {editId === order.id ? (
                  < div style={{ display: 'flex', gap: '8px' }}>
                    <Button onClick={() => handleSave(order.id)}>Save</Button>
                    <Button onClick={() => setEditId(null)}>Cancel</Button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button onClick={() => handleEdit(order)}>Edit</Button>
                    <Button danger onClick={() => handleDelete(order.id)}>Delete</Button>
                  </div>
                )}
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminOrders;
 