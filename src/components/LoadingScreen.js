'use client'
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { usePathname } from "next/navigation";

export default function LoadingScreen2({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2500); // adjust duration
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {loading && (
        <LoaderWrapper>
          <Typewriter>B-Classy ✨</Typewriter>
        </LoaderWrapper>
      )}
      <ContentWrapper $hidden={loading}>{children}</ContentWrapper>
    </>
  );
}

/* blink effect for caret */
const blink = keyframes`
  50% { border-color: transparent; }
`;

/* translucent backdrop */
const LoaderWrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(62, 62, 62, 0.85);
  backdrop-filter: blur(1px);
  z-index: 9999;
`;

const Typewriter = styled.div`
  font-size: 2.2rem;
  font-weight: bold;
  font-family: monospace;
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid #b210ff;
  width: 0;
  color: #b210ff;

  /* typewriter animation */
  animation: typing 2s steps(12, end) forwards,
             ${blink} 0.7s step-end infinite;

  @keyframes typing {
    from { width: 0; }
    to { width: 12ch; } /* matches length of "B-Classy ✨" */
  }
`;

const ContentWrapper = styled.div`
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  transition: opacity 0.5s ease;
`;
