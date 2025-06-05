import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {    
    font-size: 100%; 
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
    line-height: 1.5;
    min-height: 100vh;
    transition: background-color ease 0.5s, color ease 0.5s
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ul, ol {
    list-style: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    background: none;
    border: none;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

   h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
    line-height: 1.2;
  }

  p {
    text-align: center;
  }
`;
