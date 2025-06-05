import { priorityConfig, priorityLevels } from "@/data/priorityLevels";
import { EventPriority } from "@/types/event";
import styled from "styled-components";

const FormGroup = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 500;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 1rem;
`;

const Select = styled.select<{ $priority: EventPriority }>`
  appearance: none;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.textSecondary};
  border-radius: 8px;
  background-color: ${({ $priority }) => priorityConfig[$priority].color};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.3);
  }
`;

const Option = styled.option`
  background: ${({ theme }) => theme.colors.background || "#f7fafc"};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export default function Priority({
  priority,
  onPriorityChange,
}: {
  priority: EventPriority;
  onPriorityChange: (event: React.ChangeEvent) => void;
}) {
  return (
    <FormGroup htmlFor="priority">
      Priorität:
      <Select
        name="priority"
        id="priority"
        required
        $priority={priority}
        value={priority}
        onChange={onPriorityChange}
      >
        {[1, 2, 3, 4, 5].map((value) => (
          <Option key={value} value={value}>
            {value} – {priorityLevels[value]}
          </Option>
        ))}
      </Select>
    </FormGroup>
  );
}
