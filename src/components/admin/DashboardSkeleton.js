import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const LoadingWrapper = styled.div`
  padding: 32px;
  background: #f7f8fa;
  min-height: 100vh;
  display: grid;
  gap: 24px;
`;

const SkeletonBox = styled.div`
  height: ${props => props.h || "100px"};
  border-radius: 12px;
  background: #ececec;
  background-image: linear-gradient(
    90deg,
    #ececec 0px,
    #f5f5f5 40px,
    #ececec 80px
  );
  background-size: 600px;
  animation: ${shimmer} 1.6s infinite linear;
`;

const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px,1fr));
  gap: 24px;
`;

const ChartSkeleton = styled(SkeletonBox)`
  height: 260px;
`;

const TableSkeleton = styled(SkeletonBox)`
  height: 200px;
`;

export default function DashboardSkeleton() {
  return (
    <LoadingWrapper>
      <SkeletonBox h="42px" />
      
      <SkeletonGrid>
        <SkeletonBox />
        <SkeletonBox />
        <SkeletonBox />
      </SkeletonGrid>

      <SkeletonGrid>
        <ChartSkeleton />
        <ChartSkeleton />
        <ChartSkeleton />
        <TableSkeleton style={{ gridColumn: "1 / -1" }} />
      </SkeletonGrid>
    </LoadingWrapper>
  );
}
