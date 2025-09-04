'use client'
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { usePathname } from "next/navigation";
import { BsStars } from "react-icons/bs";


export default function LoadingScreen({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // show loader on mount + every route change
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 11000); // shorter for nav
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {loading && (
        <LoaderWrapper>
          <BrandLoading>
            B-Classy <span><BsStars color="gold"/></span>
          </BrandLoading>
        </LoaderWrapper>
      )}
      <ContentWrapper $hidden={loading}>{children}</ContentWrapper>
    </>
  );
}

// animations
const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const sparkle = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.6; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const LoaderWrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
/* translucent background */
  background: rgba(62, 62, 62, 0.85);
  backdrop-filter: blur(1px);
    z-index: 9999;
`;

const blink = keyframes`
  50% { border-color: transparent; }
`;

const BrandLoading = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  background: linear-gradient(
    90deg,
    #ff69b4,
    #b210ff,
    #ffd700
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shimmer} 2s linear infinite;
  

  span {
    display: inline-block;
    margin-left: 0.3rem;
    animation: ${sparkle} 1.2s ease-in-out infinite;
  }
`;

const ContentWrapper = styled.div`
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  animation: ${({ $hidden }) => !$hidden && fadeIn} 0.6s ease forwards;
`;
