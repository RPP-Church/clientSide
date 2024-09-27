import styled, { css } from 'styled-components';

const Wrapper = styled.section`
  padding: 12px;

  @media screen and (min-width: 1025px) {
    padding: 2rem;
  }

  .switch,
  .controller {
    display: flex;
    align-items: center;
    gap: 20px;

  }

  .controller {
    margin-block: 1.2em 0;
  }

  @media screen and (max-width: 40rem) {
    .controller {
      display: block;
    }

    .switch {
      margin-top: 1em;
    }
  }
`;
export default function Container({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

export const SearchBAR = css`
  background-color: #f1f8e8;
  gap: 12px;
  padding: 15px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  align-items: end;
  margin-bottom: 1.4rem;
  border-radius: 3px;
  label {
    font-size: 0.6em;
    font-weight: bold;
  }
  .buttons {
    display: flex;
    gap: 6px;
    margin-top: 10px;

    button {
      width: 50%;
      height: 40px;
      border-radius: 4px;
    }
  }

  @media screen and (min-width: 66rem) {
    display: flex;
    .buttons {
      margin-top: 0;
      button {
        width: unset;
        height: unset;
        border-radius: 3px;
      }
    }
  }
`;
