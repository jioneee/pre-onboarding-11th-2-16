import styled from '@emotion/styled';
// import Spinner from '../assets/Spinner.gif';

export function Loading() {
  return (
    <Container>
      <LoadingText>Loading...</LoadingText>
      <img src={require('../assets/Spinner.gif')} alt='loading' />
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.div`
  font: 1rem 'Noto Sans KR';
  text-align: center;
`;
