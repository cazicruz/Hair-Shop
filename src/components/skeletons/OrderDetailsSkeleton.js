import styled, { keyframes } from "styled-components";
import React from "react";

const shimmer = keyframes`
  0% { background-position: -300px 0; }
  100% { background-position: 300px 0; }
`;

const SkeletonBox = styled.div`
  height: ${({ height }) => height || "16px"};
  width: ${({ width }) => width || "100%"};
  border-radius: 6px;
  background: #e6e6e6;
  background-image: linear-gradient(
    90deg,
    #e6e6e6 0px,
    #f2f2f2 40px,
    #e6e6e6 80px
  );
  background-size: 300px 100%;
  animation: ${shimmer} 1.2s infinite linear;
  margin-bottom: ${({ mb }) => mb || "10px"};
`;

const Wrapper = styled.div`
  padding: 1.5rem;
  border: 1px solid #ececec;
  border-radius: 10px;
  background: #fff;
`;

const Section = styled.div`
  margin-bottom: 1.25rem;
`;

const ProductItem = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 1rem;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
`;

export default function OrderDetailsSkeleton() {
  return (
    <Wrapper>
      <Section>
        <SkeletonBox width="160px" height="24px" mb="15px" />
        <SkeletonBox width="200px" height="18px" />
      </Section>

      <Section>
        <SkeletonBox width="120px" height="20px" mb="10px" />
        {Array.from({ length: 2 }).map((_, i) => (
          <ProductItem key={i}>
            <SkeletonBox width="100%" height="80px" />
            <div>
              <SkeletonBox width="70%" height="18px" />
              <SkeletonBox width="50%" height="16px" mb="6px" />
              <SkeletonBox width="40%" height="16px" />
            </div>
          </ProductItem>
        ))}
      </Section>

      <Section>
        <SkeletonBox width="40%" height="22px" />
        <SkeletonBox width="30%" height="20px" mb="5px" />
      </Section>
    </Wrapper>
  );
}
