'use client'
import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useCart } from '@/hooks/useCart';
import {normalizeServerCart,deliveryMethod} from '@/utils/helpers';
import Cookies from 'js-cookie';
import { useOrder } from "@/hooks/useOrder";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/cartSlice";

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
  const [shippingMethod, setShippingMethod] = useState('STANDARD'); // ✅ Use key, not method.method
  const [billingSame, setBillingSame] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [totals, setTotals] = useState(null); // ✅ Initialize as null

  const dispatch = useDispatch();

  const { createOrderAndInitiatePayment } = useOrder();
  const { cart, isLoading, isError, calculateCartTotal } = useCart();

  // ✅ Prefill user info only once
  useEffect(() => {
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
  }, []); // ✅ Run only once

  // ✅ Calculate totals when cart changes
  useEffect(() => {
    if (cart?.items && cart.items.length > 0) {
      const fetchTotals = async () => {
        try {
          const result = await calculateCartTotal.mutateAsync();
          setTotals(result); // Adjust based on your API response
        } catch (error) {
          console.error('Error calculating totals:', error);
          // ✅ Fallback calculation
          const carts = normalizeServerCart(cart.items);
          const subtotal = carts.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          setTotals({
            subtotal,
            tax: Math.round(subtotal * 0.075),
          });
        }
      };
      fetchTotals();
    }
  }, [cart?.items]); // ✅ Only when cart items change

  // ✅ Early returns for loading/error states
  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <div style={{ textAlign: 'center', padding: '2rem' }}>Loading cart...</div>
        </Container>
      </ThemeProvider>
    );
  }

  if (isError || !cart) {
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <div style={{ textAlign: 'center', padding: '2rem', color: '#f04c4c' }}>
            Error loading cart. Please try again.
          </div>
        </Container>
      </ThemeProvider>
    );
  }

  if (!cart.items || cart.items.length === 0) {
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Card>
            <Title>Your cart is empty</Title>
            <p>Add some items to your cart before checking out.</p>
          </Card>
        </Container>
      </ThemeProvider>
    );
  }

  if (!totals) {
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <div style={{ textAlign: 'center', padding: '2rem' }}>Calculating totals...</div>
        </Container>
      </ThemeProvider>
    );
  }

  const carts = normalizeServerCart(cart.items);
  
  const subtotal = totals.subtotal || 0;
  const tax = totals.tax || 0;
  const shippingFee = deliveryType === "pickup" ? 0 : (deliveryMethod[shippingMethod]?.cost || 0);
  const total = subtotal + shippingFee + tax;

  console.log("Shipping Fee:", shippingFee);
  console.log("Cart totals:", totals);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const orderData = {
      contactInfo: {name, email, phone},
      deliveryInfo:{ 
      deliveryType: deliveryType==="pickup" ? "store_pickup" : "home_delivery",
      deliveryMethod: deliveryType==="pickup" ? null : shippingMethod.toLowerCase(),
      address: deliveryType === "ship" ? address : null,
      },
      billingAddress: billingSame ? address : billingAddress,
      cartId:Cookies.get('cartId'),
    }

    try {
      const result = await createOrderAndInitiatePayment.mutateAsync(orderData);
      console.log("Order creation result:", result);
      dispatch(clearCart());

      // ✅ Redirect to Paystack
      if (result.paymentLink || result.authorization_url) {
        window.location.href = result.paymentLink || result.authorization_url;
      } else {
        alert('Payment initialization successful!');
      }
    } catch (error) {
      console.error('Order creation failed:', error);
      alert('Failed to create order. Please try again.');
    }
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
                      {method.method} - {method.duration} (₦{method.cost.toLocaleString()})
                    </Option>
                  ))}
                </Select>
                <Label>Delivery Address</Label>
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
              <Input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                required 
                placeholder="John Doe"
              />
              <Label>Email</Label>
              <Input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
                placeholder="john@example.com"
              />
              <Label>Phone</Label>
              <Input 
                type="tel" 
                value={phone} 
                onChange={e => setPhone(e.target.value)} 
                required 
                placeholder="08012345678"
              />
            </Section>

            <Section>
              <SectionTitle>Billing Address</SectionTitle>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={billingSame}
                  onChange={() => setBillingSame(!billingSame)}
                />
                Same as shipping address
              </label>
              {!billingSame && (
                <>
                  <Label style={{ marginTop: '8px' }}>Billing Address</Label>
                  <Input 
                    type="text" 
                    value={billingAddress} 
                    onChange={e => setBillingAddress(e.target.value)} 
                    placeholder="Enter billing address" 
                    required 
                  />
                </>
              )}
            </Section>

            <Section>
              <SectionTitle>Order Summary</SectionTitle>
              <div>
                {carts.map((item, index) => (
                  <Capsule key={item._id || index}>
                    <ProductImage src={item.images?.[0] || '/placeholder.png'} alt={item.name} />
                    <CapsuleContent>
                      <strong>{item.name}</strong>
                      <span className="price">₦{item.price?.toLocaleString()}</span>
                      <small>{item.description || "Premium quality hair extension"}</small>
                    </CapsuleContent>
                    <QuantityBadge>{item.quantity}</QuantityBadge>
                  </Capsule>
                ))}
              </div>
            </Section>

            <Summary>
              <div>Subtotal: ₦{subtotal.toLocaleString()}</div>
              <div>Shipping: ₦{shippingFee.toLocaleString()}</div>
              <div>Estimated Tax: ₦{tax.toLocaleString()}</div>
              <div><b>Total: ₦{total.toLocaleString()}</b></div>
            </Summary>

            <Button type="submit" disabled={createOrderAndInitiatePayment.isPending}>
              {createOrderAndInitiatePayment.isPending ? 'Processing...' : 'Pay Now'}
            </Button>
          </form>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default PaymentPage;
