
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    width: 100%;
    line-height: 1.5;
    font-family: ${({ theme }) => theme.font.family};
    margin: 0px;
    background: ${({ theme }) => theme.bodyBackground};
    color: ${({ theme }) => theme.headingFont};
    scrollbar-width: thin;
    scrollbar-color: #0005 #0000;
  }
  *::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }
  *::-webkit-scrollbar-track {
    background: #0000;
  }
  *::-webkit-scrollbar-thumb {
    background-color: #0005;
    border-radius: 10px;
    border: 1px solid #0000;
  }
`;

export default GlobalStyle;
