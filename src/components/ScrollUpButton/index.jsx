import React, { useState, useEffect } from "react";
import { IoMdArrowRoundUp } from "react-icons/io";
import styled from "styled-components";

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <ScrollUpButton onClick={scrollToTop} aria-label="Scroll to top">
      <IoMdArrowRoundUp />
    </ScrollUpButton>
  );
};

const ScrollUpButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 40px;
  right: 40px;
  font-size: 24px;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  z-index: 900;
  transition: opacity 0.3s ease-in-out;
`;

export default ScrollButton;
