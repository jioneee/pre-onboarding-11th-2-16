import styled from '@emotion/styled';

import { useNavigate } from 'react-router-dom';

export function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <ErrorText>404 Not found</ErrorText>
      <IssuListButton
        onClick={() => {
          navigate('/');
        }}
      >
        Issue 목록으로 가기
      </IssuListButton>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorText = styled.div`
  margin: 50px auto;
  color: gray;
  text-align: center;
  font-weight: 700;
  font-size: 70px;
`;

const IssuListButton = styled.button`
  margin: 50px auto;
  color: gray;
  align-items: center;
  font-weight: 500;
  font-size: 50px;
`;
