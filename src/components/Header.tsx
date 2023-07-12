import styled from '@emotion/styled';

export function Header() {
  return <Container>'Organization Name / Repository Name'</Container>;
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
