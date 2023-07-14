import styled from '@emotion/styled';
import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';

export function Header() {
  const { url } = useContext(ApiContext);
  const organizationName = url.split('/')[4].toLocaleUpperCase();
  const repositoryName = url.split('/')[5].toLocaleUpperCase();
  return (
    <Container>
      {organizationName} / {repositoryName}
    </Container>
  );
}
const Container = styled.div`
  box-sizing: border-box;
  width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 1px black;
  margin: 15px auto;
  padding: 10px;
  font-weight: 700;
`;
