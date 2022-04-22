import styled from "styled-components";
import FHeader from "../../components/Funcionario/FHeader";
import funcionarioBackground from "../../assets/images/funcionarioBackground.png";

function FHome() {
  const FHome = styled.body`
    height: 100vh;
    width: 100%;
    background-image: url(${funcionarioBackground});
    background-size: cover;
    background-position: center;
  `;
  return (
    <FHome>
      <FHeader />
    </FHome>
  );
}

export default FHome;
