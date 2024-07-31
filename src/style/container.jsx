import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 12px;

  @media screen and (min-width: 1025px) {
    padding: 6rem;
  }
`;
export default function Container({ children }) {
  return <Wrapper>{children}</Wrapper>;
}
