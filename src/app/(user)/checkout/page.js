'use client'
import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useCart } from '@/hooks/useCart';
import {normalizeServerCart,deliveryMethod,capitalizeFirst} from '@/utils/helpers';
import Cookies from 'js-cookie';

const theme = {
  colors: {
    primary: "#f04c4c",
    background: "#FFF0F6",
    text: "#222",
    accent: "#FFB6C1",
    border: "#E0E0E0",
  },
  spacing: {
    sm: "8px",
    md: "16px",
    lg: "32px",
  },
  borderRadius: "12px",
};

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  background: #fff;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 2px 8px rgba(255,105,180,0.08);
  width: 100%;
  max-width: 500px;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
`;

const Section = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.1rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: 600;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1rem;
  width: 100%;
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1rem;
  width: 100%;
`;

const Option = styled.option``;

const Summary = styled.div`
  background: ${({ theme }) => theme.colors.accent};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius};
  color: #fff;
  font-weight: 500;
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  width:100%;
  border: none;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1rem;
  cursor: pointer;
  margin-top: ${({ theme }) => theme.spacing.md};
  font-weight: 600;
  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`;
const Capsule = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ProductImage = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 8px;
`;

const CapsuleContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  .price{
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    align-self: flex-end;
}
`;

const QuantityBadge = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border-radius: 50%;
  padding: 6px 12px;
  font-size: 0.8rem;
  font-weight: bold;
  align-self: flex-start;
`;

// const sampleOrder = [
//   {
//     name: "Body Wave Bundle",
//     price: 25000,
//     quantity: 2,
//     description: "Soft, bouncy texture",
//     image: "/images/red-hair.png"
//   },
//   {
//     name: "Closure 4x4",
//     price: 15000,
//     quantity: 1,
//     description: "Perfect finish for your install",
//     image: "/images/red-hair.png"
//   }
// ];


const PaymentPage = () => {
  const [deliveryType, setDeliveryType] = useState("ship");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [billingSame, setBillingSame] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [totals, setTotals] = useState({});

  const { cart, isLoading, error ,calculateCartTotal} = useCart();


  useEffect(() => {
  // Prefill user info from cookies/query
  const userCookie = Cookies.get('user');
  if (userCookie) {
    try {
      const userData = JSON.parse(userCookie);
      setName(userData.name || '');
      setEmail(userData.email || '');
      setPhone(userData.phone || '');
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }

  // Calculate totals when cart data is available
    const fetchTotals = async () => {
      try {
        const result = await calculateCartTotal.mutateAsync();
        setTotals(result);
      } catch (error) {
        console.error('Error calculating totals:', error);
      }
    };
    fetchTotals();
  
  }, [cart,isLoading]); // ✅ Add carts as dependency
  

  console.log("Cart data in checkout page:", cart);
  if (isLoading) return <div>Loading cart...</div>;
  if (error) return <div>Error loading cart: {error.message}</div>;
  const carts = normalizeServerCart(cart.items);
  

  console.log("Cart totals in checkout page:", totals);

  const subtotal = totals.subtotal;
  const tax = totals.tax;
  const shippingFee = deliveryType === "pickup" ? 0 : deliveryMethod[shippingMethod]?.cost;
  const total = subtotal + shippingFee + tax;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Redirecting to Paystack...");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Card>
          <Title>Checkout</Title>

          

          <form onSubmit={handleSubmit}>
            <Section>
              <SectionTitle>Delivery Method</SectionTitle>
              <Select value={deliveryType} onChange={e => setDeliveryType(e.target.value)}>
                <Option value="ship">Ship</Option>
                <Option value="pickup">Pick Up</Option>
              </Select>
            </Section>

            {deliveryType === "ship" && (
              <Section>
                <SectionTitle>Shipping Details</SectionTitle>
                <Label>Shipping Method</Label>
                <Select value={shippingMethod} onChange={e => setShippingMethod(e.target.value)}>
                  {Object.entries(deliveryMethod).map(([key, method]) => (
                    <Option key={key} value={key}>
                      {method.method}  {method.duration} (₦{method.cost.toLocaleString()})
                    </Option>
                  ))}
                </Select>
                <Label>Address</Label>
                <Input
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  required
                  placeholder="Enter delivery address"
                />
              </Section>
            )}

            <Section>
              <SectionTitle>Contact Info</SectionTitle>
              <Label>Full Name</Label>
              <Input type="text" value={name} onChange={e => setName(e.target.value)} required />
              <Label>Email</Label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              <Label>Phone</Label>
              <Input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required />
            </Section>

            <Section>
              <SectionTitle>Billing Address</SectionTitle>
              <label>
                <input
                  type="checkbox"
                  checked={billingSame}
                  onChange={() => setBillingSame(!billingSame)}
                /> Same as shipping address
              </label>
              {!billingSame && (
                <Input type="text" placeholder="Enter billing address" required />
              )}
            </Section>
            <section>
              <SectionTitle>Order Summary</SectionTitle>
              <div>
                {carts?.map((item, index) => (
                  <Capsule key={index}>
                    <ProductImage src={item.images[0]} alt={item.name} />
                    <CapsuleContent>
                      <strong>{item.name}</strong>
                      <span className="price">₦{item.price}</span>
                      <small>{item.description || "Premium quality hair extension"}</small>
                    </CapsuleContent>
                    <QuantityBadge>{item.quantity}</QuantityBadge>
                  </Capsule>
                ))}
              </div>
            </section>
            <Summary>
            <div>Subtotal: ₦{subtotal}</div>
            <div>Shipping: ₦{shippingFee}</div>
            <div>Estimated Tax: ₦{tax}</div>
            <div><b>Total: ₦{total}</b></div>
          </Summary>

            <Button type="submit">Pay Now</Button>
          </form>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default PaymentPage;
