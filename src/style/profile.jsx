import { css } from 'styled-components';

export const Profile = css`
  .profileContent {
    /* background-color: #DFD3C3; */
    background-color: #def9c4;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

    .header {
      padding: 10px 0 0 10px;

      h2 {
        font-size: clamp(1.5em, 20vh, 2em);
      }
    }
    .inputWrapper {
      padding: 10px;
    }

    .inputContainer {
      display: flex;
      gap: 15px;
      margin: 10px 0;
      .child {
        flex: 1;
      }

      label {
        font-size: 0.7em;
        font-weight: bold;
      }
    }
  }
`;
