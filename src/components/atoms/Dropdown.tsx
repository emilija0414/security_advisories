export type DropdownProps = {
  severity: "unknown" | "low" | "medium" | "high" | "critical";
  onSeverityChange: (
    severity: "unknown" | "low" | "medium" | "high" | "critical"
  ) => void;
};

export const Dropdown = ({ severity, onSeverityChange }: DropdownProps) => {
  return (
    <select
      className="p-2.5 border rounded"
      value={severity}
      onChange={(e) =>
        onSeverityChange(
          e.target.value as "unknown" | "low" | "medium" | "high" | "critical"
        )
      }
    >
      <option value="unknown"> Unknown</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
      <option value="critical">Critical</option>
    </select>
  );
};
