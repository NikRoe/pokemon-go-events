import Link from "next/link";
import styled from "styled-components";

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2rem;
`;

const BackLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  text-decoration: none;
  display: inline-block;

  &:hover {
    text-decoration: underline;
  }
`;

export default function Footer() {
  return (
    <StyledFooter>
      <BackLink href="/">← Zurück zur Übersicht</BackLink>
    </StyledFooter>
  );
}
