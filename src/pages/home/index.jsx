import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #d4fc79, #96e6a1);
`;

const MessageBox = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: ${fadeInUp} 1s ease-out;
`;

const Title = styled.h1`
  font-family: Inter-SemiBold;
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-family: Inter-SemiBold;
  font-size: 1.125rem;
  color: #4a5568;
`;

const Button = styled.button`
  margin-top: 2rem;
  /* padding: 0.75rem 2rem; */
  width: 92px;
  height: 42px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(to right, #38b2ac, #319795);
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: white;
`;

const Home = () => {
  return (
    <Container>
      <MessageBox>
        <Title>Calculate body mass index</Title>
        <Subtitle>and live a healthy lifestyle!</Subtitle>
        <Button>
          <StyledLink to={"/calculator"}>Forward</StyledLink>
        </Button>
      </MessageBox>
    </Container>
  );
};

export default Home;
