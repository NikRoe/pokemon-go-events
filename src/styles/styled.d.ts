import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      surface: string;
      primary: string;
      secondary: string;
      textPrimary: string;
      textSecondary: string;
      shadow: string;
      danger: string;
    };
  }
}
