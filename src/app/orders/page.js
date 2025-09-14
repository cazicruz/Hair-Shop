'use client';
import React, { useState, useEffect } from 'react';

// Dummy order data
const dummyOrders = [
    {
        id: 'ORD001',
        date: '2024-06-01',
        status: 'Pending',
        items: [
            { name: 'Shampoo', qty: 2 },
            { name: 'Hair Oil', qty: 1 },
        ],
        total: 25.99,
    },
    {
        id: 'ORD002',
        date: '2024-05-28',
        status: 'Delivered',
        items: [
            { name: 'Conditioner', qty: 1 },
        ],
        total: 12.99,
    },
    {
        id: 'ORD003',
        date: '2024-06-03',
        status: 'Shipped',
        items: [
            { name: 'Hair Gel', qty: 3 },
        ],
        total: 30.00,
    },
];

const statusOptions = ['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'];
const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'status', label: 'Status' },
    { value: 'total', label: 'Total' },
];

function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortBy, setSortBy] = useState('date');

    useEffect(() => {
        setOrders(dummyOrders);
    }, []);

    // Filter and sort orders
    const filteredOrders = orders
        .filter(order => statusFilter === 'All' || order.status === statusFilter)
        .sort((a, b) => {
            if (sortBy === 'date') {
                return new Date(b.date) - new Date(a.date);
            }
            if (sortBy === 'status') {
                return a.status.localeCompare(b.status);
            }
            if (sortBy === 'total') {
                return b.total - a.total;
            }
            return 0;
        });

    return (
        <div style={{ padding: 24 }}>
            <h1>Your Orders</h1>
            <div style={{ marginBottom: 16 }}>
                <label>
                    Status:&nbsp;
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                        {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </label>
                &nbsp;&nbsp;
                <label>
                    Sort by:&nbsp;
                    <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                        {sortOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </label>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map(order => (
                        <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                            <td>{order.id}</td>
                            <td>{order.date}</td>
                            <td>{order.status}</td>
                            <td>${order.total.toFixed(2)}</td>
                            <td>
                                <button onClick={() => setSelectedOrder(order)}>
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedOrder && (
                <div style={{
                    marginTop: 24,
                    padding: 16,
                    border: '1px solid #ccc',
                    borderRadius: 8,
                    background: '#fafafa'
                }}>
                    <h2>Order Details: {selectedOrder.id}</h2>
                    <p><strong>Date:</strong> {selectedOrder.date}</p>
                    <p><strong>Status:</strong> {selectedOrder.status}</p>
                    <p><strong>Total:</strong> ${selectedOrder.total.toFixed(2)}</p>
                    <h3>Items:</h3>
                    <ul>
                        {selectedOrder.items.map((item, idx) => (
                            <li key={idx}>{item.name} x {item.qty}</li>
                        ))}
                    </ul>
                    <button onClick={() => setSelectedOrder(null)}>Close</button>
                </div>
            )}
        </div>
    );
}

export default OrdersPage;