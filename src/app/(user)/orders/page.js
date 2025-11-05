'use client';
import React, { useState, useEffect } from 'react'
import { useSearchParams } from "next/navigation";
import styled from 'styled-components';
import {TestimonyCard} from '@/components/home/Testimonials';
import Image from 'next/image';
import { useOrder } from '@/hooks/useOrder';
import OrdersSkeleton from '@/components/skeletons/UserOrderSkeleton';


// Dummy order data
// const dummyOrders = [
//     {
//         id: 'ORD001',
//         date: '2024-06-01',
//         status: 'Pending',
//         items: [
//             {
//                 name: "Body Wave Bundle",
//                 price: 25000,
//                 quantity: 2,
//                 description: "Soft, bouncy texture",
//                 image: ["/images/wig2.png"]
//             },
//             {
//                 name: 'Hair Oil',
//                 price: 5000,
//                 quantity: 1,
//                 description: "Nourishing hair oil",
//                 image:[ "/images/wig3.png"]
//             },
//         ],
//         total: 25.99,
//     },
//     {
//         id: 'ORD002',
//         date: '2024-05-28',
//         status: 'Delivered',
//         items: [
//             {
//                 name: "Body Wave Bundle",
//                 price: 25000,
//                 quantity: 2,
//                 description: "Soft, bouncy texture",
//                 image: ["/images/wav hair.png", "/images/wig1.png"]
//             },
//         ],
//         total: 12.99,
//     },
//     {
//         id: 'ORD003',
//         date: '2024-06-03',
//         status: 'Shipped',
//         items: [
//             { 
//             name: "Body Wave Bundle",
//             price: 25000,
//             quantity: 2,
//             description: "Soft, bouncy texture",
//             image: ["/images/red-hair.png", "/images/red-hair.png"]
//             },
//             {
//             name: "Closure 4x4",
//             price: 15000,
//             quantity: 1,
//             description: "Perfect finish for your install",
//             image:[ "/images/red-hair.png", "/images/red-hair.png" ]
//             }
//         ],
//         total: 30.00,
//     },
// ];

const statusOptions = ['All', 'pending', 'shipped', 'delivered', 'canceled'];
const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'status', label: 'Status' },
    { value: 'total', label: 'Total' },
];

// Styled Components
const Container = styled.div`
    padding: 2rem;
    font-family: 'Segoe UI', sans-serif;

    @media (max-width: 600px) {
        padding: 2rem 0.5rem;
    }
`;

const Header = styled.h1`
    margin-bottom: 1rem;
    padding-left:0.5rem;
`;

const Controls = styled.div`
    margin-bottom: 1.5rem;
    display: flex;
    gap: 2rem;
    padding-left:0.5rem;
`;

const Label = styled.label`
    font-weight: 500;
`;

const Select = styled.select`
    padding: 0.4rem;
    border-radius: 4px;
    border: 1px solid #ccc;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const Th = styled.th`
    text-align: left;
    padding: 0.75rem;
    background-color: #f4f4f4;
`;

const Tr = styled.tr`
    border-bottom: 1px solid #eee;
    &:hover {
        background-color: #f9f9f9;
    }
`;

const Td = styled.td`
    padding: 0.75rem;
`;

const ViewButton = styled.button`
    padding: 0.4rem 0.8rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #0056b3;
    }
`;

const DetailsCard = styled.div`
    margin-top: 2rem;
    padding: 1.5rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #fafafa;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`;

const CloseButton = styled.button`
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #a71d2a;
    }
`;

function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [statusFilter, setStatusFilter] = useState('All');
    const [sortBy, setSortBy] = useState('date');
    const { userOrders,isUserOrdersLoading,verifyOrderPayment } = useOrder();

    const searchParams = useSearchParams();
    const trxref = searchParams.get("trxref");
    const reference = searchParams.get("reference");

    useEffect(()=>{
        if(reference||selectedOrder){
            verifyOrderPayment.mutateAsync(reference||selectedOrder._id).then(() => {
   router.replace("/orders");
        });
    }
    },[reference,selectedOrder])

    useEffect(() => {
        // In real app, fetch orders from API
        
        setOrders(userOrders||[]);
    }, [userOrders,isUserOrdersLoading]);

    if (isUserOrdersLoading) {
        return <OrdersSkeleton />;
    }

    const filteredOrders = orders
        .filter(order => statusFilter === 'All' || order.status === statusFilter)
        .sort((a, b) => {
            if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
            if (sortBy === 'status') return a.status.localeCompare(b.status);
            if (sortBy === 'total') return b.total - a.total;
            return 0;
        });

    return (
        <Container>
            <Header>Your Orders</Header>
            <Controls>
                <Label>
                    Status:&nbsp;
                    <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                        {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </Select>
                </Label>
                <Label>
                    Sort by:&nbsp;
                    <Select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                        {sortOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </Select>
                </Label>
            </Controls>
            <Table>
                <thead>
                    <Tr>
                        <Th>Order ID</Th>
                        <Th>Date</Th>
                        <Th>Status</Th>
                        <Th>Total</Th>
                        <Th>Details</Th>
                    </Tr>
                </thead>
                <tbody>
                    {filteredOrders.map(order => (
                        <Tr key={order._id}
                        style={{ cursor: 'pointer', backgroundColor: selectedOrder === order ? '#e9ecef' : '' }}
                        >
                            <Td>{order._id}</Td>
                            <Td>{new Date(order.createdAt).toLocaleDateString()}</Td>
                            <Td>{order.status}</Td>
                            <Td>₦{order.totalAmount?.toLocaleString()}</Td>
                            <Td>
                                <ViewButton onClick={() => setSelectedOrder(order)}>View</ViewButton>
                            </Td>
                        </Tr>
                    ))}
                </tbody>
            </Table>

            {selectedOrder && (
                <DetailsCard>
                    <h2>Order Details: {selectedOrder.id}</h2>
                    <p><strong>Date:</strong> {selectedOrder.date}</p>
                    <p><strong>Status:</strong> {selectedOrder.status}</p>
                    <p><strong>Total:</strong> ₦{selectedOrder.totalAmount.toLocaleString()}</p>
                    <h3>Items:</h3>
                    <ul>
                        {selectedOrder.items.map((item, idx) => (
                            <li key={idx}>
                                <ItemCard>
                                    {/* <Image src={item?.image[0]} alt={item?.name} width={60} height={60} /> */}
                                    {item.productId?.images?.length > 0 && (
                        <Image
                          src={item.productId.images[0]}
                          alt={item.productId.name}
                          width={60} height={60}
                        />
                        )}
                                    <div>
                                        {item?.name} x {item?.quantity}
                                        <br />
                                        <small>{item?.description}</small>
                                        <br />
                                        <strong>₦{(item?.price * item?.quantity).toLocaleString()}</strong>
                                    </div>
                                </ItemCard>
                            </li>
                        ))}
                    </ul>
                    <CloseButton onClick={() => setSelectedOrder(null)}>Close</CloseButton>
                </DetailsCard>
            )}
        </Container>
    );
}

const ItemCard = styled.div`
display: flex;
align-items: center;
gap: 1rem;
justify-content: flex-start;
padding: 10px;
border-radius:8px;

img{
border-radius:8px;
}
box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`

export default OrdersPage;
