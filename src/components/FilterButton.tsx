import { ReactNode } from "react";
import styled from "styled-components";

interface FilterButtonProps {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const StyledFilterButton = styled.button<{ $isActive: boolean }>`
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.textPrimary : theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.5s ease, color 0.5s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  svg {
    fill: currentColor;
  }
`;

export default function FilterButton({
  children,
  isActive,
  onClick,
}: FilterButtonProps) {
  return (
    <StyledFilterButton $isActive={isActive} onClick={onClick}>
      {children}
    </StyledFilterButton>
  );
}
