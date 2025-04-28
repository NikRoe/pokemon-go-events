import ThemeToggle from "@/components/ThemeToggle";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;

  max-width: 500px;
  margin: 1rem auto;
`;

export default function Header() {
  return (
    <StyledHeader>
      <h1>Pokémon Go Events</h1>
      <ThemeToggle />
    </StyledHeader>
  );
}
