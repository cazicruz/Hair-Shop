'use client'
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Dummy API functions (replace with real API calls)
const fetchCustomers = async () => [
  { id: 1, name: 'Jane Doe', email: 'jane@example.com', status: 'Active' },
  { id: 2, name: 'John Smith', email: 'john@example.com', status: 'Inactive' },
];
const updateCustomer = async (id, data) => ({ ...data, id });
const deleteCustomer = async (id) => true;

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
  border: 1px solid #ccc;
  padding: 8px;
  background: #f5f5f5;
`;

const Td = styled.td`
  border: 1px solid #ccc;
  padding: 8px;
`;

const Input = styled.input`
  padding: 6px;
  width: 100%;
  margin-bottom: 4px;
`;

const Select = styled.select`
  padding: 6px;
  width: 100%;
`;

const Button = styled.button`
  padding: 6px 12px;
  margin-right: 8px;
  background: ${(props) => (props.danger ? '#ff4d4f' : '#1890ff')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', email: '', status: '' });

  useEffect(() => {
    const loadCustomers = async () => {
      const data = await fetchCustomers();
      setCustomers(data);
    };
    loadCustomers();
  }, []);

  const handleEdit = (customer) => {
    setEditingId(customer.id);
    setEditData({ name: customer.name, email: customer.email, status: customer.status });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    const updated = await updateCustomer(editingId, editData);
    setCustomers(customers.map(c => c.id === editingId ? updated : c));
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      await deleteCustomer(id);
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  return (
    <Container>
      <Title>Customer Management</Title>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <Td>
                {editingId === customer.id ? (
                  <Input
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                  />
                ) : (
                  customer.name
                )}
              </Td>
              <Td>
                {editingId === customer.id ? (
                  <Input
                    name="email"
                    value={editData.email}
                    onChange={handleEditChange}
                  />
                ) : (
                  customer.email
                )}
              </Td>
              <Td>
                {editingId === customer.id ? (
                  <Select
                    name="status"
                    value={editData.status}
                    onChange={handleEditChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Select>
                ) : (
                  customer.status
                )}
              </Td>
              <Td>
                {editingId === customer.id ? (
                  <>
                    <Button onClick={handleEditSave}>Save</Button>
                    <Button onClick={() => setEditingId(null)}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => handleEdit(customer)}>Edit</Button>
                    <Button danger onClick={() => handleDelete(customer.id)}>Delete</Button>
                  </>
                )}
              </Td>
            </tr>
          ))}
          {customers.length === 0 && (
            <tr>
              <Td colSpan={4} style={{ textAlign: 'center' }}>No customers found.</Td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Customers;
