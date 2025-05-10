import styled from "styled-components";

const FirstStepsWrapper = styled.div`
  margin-bottom: 1.5rem;
`;

const StepsList = styled.ul`
  display: grid;
  gap: 0.75rem;
`;

const StepItem = styled.li`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const StepInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  border-radius: 6px;
  font-size: 0.95rem;
`;

const RemoveButton = styled.button`
  padding: 0.25rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.danger};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const AddButton = styled.button`
  margin-top: 0.75rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

type FirstStepsInputProps = {
  firstSteps: string[];
  setFirstSteps: (steps: string[]) => void;
};

export default function FirstStepsInput({
  firstSteps,
  setFirstSteps,
}: FirstStepsInputProps) {
  return (
    <FirstStepsWrapper>
      <label htmlFor="steps">
        Was sollten meine ersten Schritte während des Events sein?
      </label>
      <StepsList id="steps">
        {firstSteps.map((step, index) => (
          <StepItem key={index}>
            <StepInput
              type="text"
              value={step}
              onChange={(event) => {
                const updated = [...firstSteps];
                updated[index] = event.target.value;
                setFirstSteps(updated);
              }}
            />
            <RemoveButton
              type="button"
              onClick={() =>
                setFirstSteps(firstSteps.filter((_, i) => i !== index))
              }
            >
              Entfernen
            </RemoveButton>
          </StepItem>
        ))}
      </StepsList>
      <AddButton
        type="button"
        onClick={() => setFirstSteps([...firstSteps, ""])}
      >
        Schritt hinzufügen
      </AddButton>
    </FirstStepsWrapper>
  );
}
