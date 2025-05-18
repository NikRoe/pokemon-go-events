import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TimeContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-evenly;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.textSecondary};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const DateTimeInput = styled(Input)`
  &::-webkit-calendar-picker-indicator {
    ${({ theme }) => theme.isDark && "filter: invert(1);"}
  }
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const ListItem = styled.li<{ $isClickable?: boolean; $searchResult?: boolean }>`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textPrimary};
  border-radius: 1rem;
  padding: 0.25rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 250px;
  width: ${({ $searchResult }) => ($searchResult ? "300px" : "auto")};

  &:hover {
    cursor: ${({ $isClickable }) => ($isClickable ? "pointer" : "drag")};
  }
`;

const RemoveButton = styled.button`
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;
  font-size: large;
  padding: 0;
  line-height: 1;
  transition: color 0.5s ease;

  svg {
    fill: currentColor;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.textSecondary};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.textSecondary};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textPrimary};
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.5s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const FocusCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
`;

const FocusCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 1rem;
  box-shadow: 0 2px 6px ${({ theme }) => theme.colors.shadow};
`;

const FocusCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PokemonImageWrapper = styled.figure`
  flex-shrink: 0;
  width: 128px;
  height: 128px;
  position: relative;
`;

const FocusSelect = styled(Select)`
  margin-top: 0.5rem;
`;

const ReasonsList = styled(List)`
  margin-top: 0.5rem;
`;

const ReasonItem = styled(ListItem)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export {
  FormContainer,
  FormGroup,
  TimeContainer,
  Label,
  Input,
  DateTimeInput,
  List,
  ListItem,
  RemoveButton,
  Textarea,
  Select,
  SubmitButton,
  FocusCardContainer,
  FocusCard,
  FocusCardHeader,
  PokemonImageWrapper,
  FocusSelect,
  ReasonsList,
  ReasonItem,
};
