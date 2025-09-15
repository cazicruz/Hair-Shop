'use client';
import React from 'react';
import styled from 'styled-components';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

// Styled Components
const Container = styled.div`
  padding: 32px;
  background: #f7f8fa;
  min-height: 100vh;
  font-family: 'Segoe UI', sans-serif;

  @media (max-width: 600px) {
    padding: 16px;
    // min-width: 100%!important;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 24px;
  color: #222;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
`;

const SummaryCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 20px;
`;

const Metric = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  color: #333;
`;

const Label = styled.p`
  font-size: 0.9rem;
  color: #777;
`;

const ChartSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin-bottom: 48px;
`;

const ChartCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 24px;

  @media (max-width: 600px) {
    padding: 10px;
    margin: 0px;
    min-width: 100%!important;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 24px;
  padding: 0 0px;

  @media (max-width: 600px) {
    font-size: 0.85rem;
  }
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  background: #f4f4f4;

  @media (max-width: 600px) {
    padding: 8px;
  }
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eee;
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.85rem;
  color: white;
  background-color: ${({ status }) =>
    status === 'Delivered' ? '#28a745' :
    status === 'Pending' ? '#ffc107' :
    status === 'Shipped' ? '#17a2b8' : '#6c757d'};

    @media (max-width: 600px) {
      font-size: 0.75rem;
        padding: 3px 6px;
    }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 16px;
  color: #444;
`;

const CardDesc = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 24px;
`;

const Button = styled.button`
  background: #6c63ff;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 18px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #554eea;
  }
`;

// Chart Data
const barData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Orders',
      data: [120, 190, 170, 220, 260, 300],
      backgroundColor: '#6c63ff',
    },
  ],
};

const lineData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue ($)',
      data: [5000, 6200, 5800, 7200, 8100, 9300],
      fill: false,
      borderColor: '#6c63ff',
      tension: 0.3,
    },
  ],
};

const doughnutData = {
  labels: ['Pending', 'Shipped', 'Delivered'],
  datasets: [
    {
      label: 'Order Status',
      data: [12, 19, 29],
      backgroundColor: ['#ff6384', '#36a2eb', '#4bc0c0'],
    },
  ],
};

const orders = [
  { id: 'ORD001', customer: 'Jane Doe', date: '2025-09-10', total: '$45.00', status: 'Delivered' },
  { id: 'ORD002', customer: 'John Smith', date: '2025-09-12', total: '$32.50', status: 'Pending' },
  { id: 'ORD003', customer: 'Alice Brown', date: '2025-09-13', total: '$78.20', status: 'Shipped' },
];

export default function Dashboard() {
  return (
    <Container>
      <Title>Admin Dashboard</Title>

      <SummaryGrid>
        <SummaryCard>
          <Metric>1,245</Metric>
          <Label>Total Orders</Label>
        </SummaryCard>
        <SummaryCard>
          <Metric>320</Metric>
          <Label>Active Customers</Label>
        </SummaryCard>
        <SummaryCard>
          <Metric>$12,430</Metric>
          <Label>Monthly Revenue</Label>
        </SummaryCard>
      </SummaryGrid>

      <ChartSection>
        <ChartCard>
          <h3>Monthly Orders</h3>
          <Bar data={barData} />
        </ChartCard>
        <ChartCard>
          <h3>Order Status</h3>
          <Doughnut data={doughnutData} />
        </ChartCard>
        <ChartCard>
          <h3>Revenue Trends</h3>
          <Line data={lineData} />
        </ChartCard>
        <ChartCard style={{ gridColumn: '1 / -1' }}>
          <h3>Recent Orders</h3>
          <Table>
            <thead>
              <tr>
                <Th>Order ID</Th>
                <Th>Customer</Th>
                <Th>Date</Th>
                <Th>Total</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <Td>{order.id}</Td>
                  <Td>{order.customer}</Td>
                  <Td>{order.date}</Td>
                  <Td>{order.total}</Td>
                  <Td><StatusBadge status={order.status}>{order.status}</StatusBadge></Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ChartCard>
      </ChartSection>

      <Grid>
        <Card>
          <CardTitle>Orders</CardTitle>
          <CardDesc>View, manage, and track all customer orders.</CardDesc>
          <Button>Manage Orders</Button>
        </Card>
        <Card>
          <CardTitle>Products</CardTitle>
          <CardDesc>Add, edit, or remove products from your shop.</CardDesc>
          <Button>Manage Products</Button>
        </Card>
        <Card>
          <CardTitle>Customers</CardTitle>
          <CardDesc>See customer details and manage accounts.</CardDesc>
          <Button>Manage Customers</Button>
        </Card>
      </Grid>
    </Container>
  );
}
