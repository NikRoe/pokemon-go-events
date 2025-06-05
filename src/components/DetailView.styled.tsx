import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const EventOverview = styled.section`
  background: ${({ theme }) => theme.colors.backgroundElevated};
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: grid;
  gap: 1rem;
`;

const PriorityBadge = styled.div<{ priority: number }>`
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-weight: bold;
  text-align: center;
  color: white;
  background-color: ${({ priority }) => {
    switch (priority) {
      case 1:
        return "#a0aec0";
      case 2:
        return "#63b3ed";
      case 3:
        return "#f6ad55";
      case 4:
        return "#ed8936";
      case 5:
        return "#e53e3e";
      default:
        return "#e2e8f0";
    }
  }};
`;

const ActionList = styled.ol`
  list-style: decimal inside;
  margin: 0;
  padding: 0;
`;

const ActionItem = styled.li`
  padding-left: 0.5rem;
`;

const MegaRecommendation = styled.div`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
  transition: background-color 0.5s ease;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;

  word-break: break-word;
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const TimeInfo = styled.time`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const Button = styled.button<{ size?: string; $isDelete?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
  width: ${({ size }) => size || "auto"};
  height: ${({ size }) => size || "auto"};
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  transition: background-color 0.5s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  fill: ${({ theme, $isDelete }) => $isDelete && theme.colors.textPrimary};
  transition: fill 0.3s ease;

  svg {
    width: 100%;
    height: 100%;

    max-width: 100%;
    max-height: 100%;
  }

  &:hover svg {
    fill: ${({ theme, $isDelete }) => $isDelete && theme.colors.danger};
  }

  svg path {
    stroke: ${({ theme, $isDelete }) => !$isDelete && theme.colors.textPrimary};
    transition: stroke 0.3s ease;
  }

  &:hover svg path {
    stroke: ${({ theme, $isDelete }) => !$isDelete && theme.colors.danger};
  }
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledDialog = styled.dialog`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 2rem;
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  max-width: 400px;
  width: 90%;
  text-align: center;
  z-index: 1000;

  &::backdrop {
    background: rgba(0, 0, 0, 0.4);
  }
`;

const DialogActions = styled.form`
  display: flex;
  justify-content: space-evenly;
  margin-top: 2rem;
  gap: 1rem;

  button {
    padding: 0.5rem 1rem;
    border-radius: 8px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textPrimary};

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const PokemonImageWrapper = styled.div`
  flex-shrink: 0;
  width: 128px;
  height: 128px;
  position: relative;
`;

const Heading = styled.h3`
  border-bottom: 2px solid ${({ theme }) => theme.colors.shadow};
  text-align: center;
  margin-bottom: 0.25rem;
  padding: 0.25rem;
`;

export {
  Heading,
  PokemonImageWrapper,
  DialogActions,
  StyledDialog,
  Title,
  TimeInfo,
  TitleRow,
  Button,
  ButtonContainer,
  SubTitle,
  Container,
  PriorityBadge,
  EventOverview,
  ActionItem,
  ActionList,
  MegaRecommendation,
  Section,
};
