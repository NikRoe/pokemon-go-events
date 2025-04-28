import { useTheme } from "@/context/ThemeContext";
import styled from "styled-components";

const ToggleButton = styled.button`
  font-size: 1.5rem;
  padding: 0.5rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
`;

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleButton onClick={toggleTheme}>
      {theme === "dark" ? "🌞" : "🌙"}
    </ToggleButton>
  );
}
