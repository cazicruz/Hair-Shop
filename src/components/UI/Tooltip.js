import React from "react";
import styled from "styled-components";

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

const TooltipText = styled.span`
  visibility: hidden;
  background-color: #fff;
  color: #333;
  font-size: ${({ theme }) => theme.fontSize?.xxsmall || "12px"};
  text-align: center;
  border-radius: 6px;
  padding: 6px 10px;
  position: absolute;
  z-index: 10;
  top: ${({ $position }) => ($position === "top" ? "auto" : "125%")};
  bottom: ${({ $position }) => ($position === "top" ? "125%" : "auto")};
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;

  /* Arrow for TOP position */
  &::after {
    content: "";
    display: ${({ $position }) => ($position === "top" ? "block" : "none")};
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: #fff transparent transparent transparent;
  }

  /* Arrow for BOTTOM position */
  &::before {
    content: "";
    display: ${({ $position }) => ($position === "bottom" ? "block" : "none")};
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #fff transparent;
  }

  ${TooltipWrapper}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

const Tooltip = ({ text, children, position = "bottom" }) => {
  return (
    <TooltipWrapper>
      {children}
      <TooltipText $position={position}>{text}</TooltipText>
    </TooltipWrapper>
  );
};

export default Tooltip;
