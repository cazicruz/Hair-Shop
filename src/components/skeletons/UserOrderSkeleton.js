import styled, { keyframes } from "styled-components";
import React from "react";

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const LoaderWrapper = styled.div`
  padding: 2rem;
`;

const SkeletonBlock = styled.div`
  height: ${props => props.height || "16px"};
  width: ${props => props.width || "100%"};
  border-radius: 6px;
  background: #eee;
  background-image: linear-gradient(
    90deg,
    #eee 0px,
    #f7f7f7 40px,
    #eee 80px
  );
  background-size: 300px 100%;
  animation: ${shimmer} 1.25s infinite linear;
  margin-bottom: ${props => props.mb || "10px"};
`;

const TableSkeleton = styled.div`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 0.5fr;
  gap: 1rem;
  padding: 12px 0;
  border-bottom: 1px solid #ececec;
`;

export default function OrdersSkeleton() {
  return (
    <LoaderWrapper>
      <SkeletonBlock height="30px" width="180px" mb="20px" />

      <div style={{ display: "flex", gap: "2rem", marginBottom: "1.5rem" }}>
        <SkeletonBlock width="120px" height="32px" />
        <SkeletonBlock width="120px" height="32px" />
      </div>

      <TableSkeleton>
        <Row>
          <SkeletonBlock width="90%" />
          <SkeletonBlock width="70%" />
          <SkeletonBlock width="60%" />
          <SkeletonBlock width="40%" />
          <SkeletonBlock width="60%" />
        </Row>

        {Array.from({ length: 5 }).map((_, i) => (
          <Row key={i}>
            <SkeletonBlock width="90%" />
            <SkeletonBlock width="70%" />
            <SkeletonBlock width="60%" />
            <SkeletonBlock width="40%" />
            <SkeletonBlock width="60%" />
          </Row>
        ))}
      </TableSkeleton>
    </LoaderWrapper>
  );
}