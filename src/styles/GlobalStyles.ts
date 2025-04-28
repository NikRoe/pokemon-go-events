// src/styles/GlobalStyles.ts
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  /* CSS-Variablen - Dark Mode als Standard */
  :root {
    --color-background: #121212;
    --color-surface: #1e1e1e;
    --color-primary: #bb86fc;
    --color-secondary: #03dac6;
    --color-text-primary: #ffffff;
    --color-text-secondary: #b0b0b0;

    /* Platzhalter für späteren Light Mode */
    --color-light-background: #ffffff;
    --color-light-surface: #f5f5f5;
    --color-light-primary: #6200ee;
    --color-light-secondary: #018786;
    --color-light-text-primary: #000000;
    --color-light-text-secondary: #555555;
  }

  /* Globales Reset */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    /* für mobiles Verhalten */
    font-size: 100%; /* 16px als Basis */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    background-color: var(--color-background);
    color: var(--color-text-primary);
    line-height: 1.5;
    min-height: 100vh;
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

  /* Reaktionsschnelles Text-Verhalten */
  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
    line-height: 1.2;
  }
`;
