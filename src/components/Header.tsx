import styled from '@emotion/styled';

export function Header() {
  const url = 'https://api.github.com/repos/facebook/react/issues';
  const organizationName = url.split('/')[4];
  const repositoryName = url.split('/')[5];
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
