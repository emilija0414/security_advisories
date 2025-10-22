export type ListItemProps = {
  cve_id: string;
  summary: string;
  description: string;
  severity: "unknown" | "low" | "medium" | "high" | "critical";
  package_name?: string;
  vulnerable_version_range?: string;
};

const severityColorMap: Record<ListItemProps["severity"], string> = {
  unknown: "bg-gray-400",
  low: "bg-green-400",
  medium: "bg-yellow-400",
  high: "bg-orange-500",
  critical: "bg-red-600",
};

export const ListItem = ({
  cve_id,
  summary,
  description,
  severity,
  package_name,
  vulnerable_version_range,
}: ListItemProps) => {
  return (
    <div className="border rounded p-4 mb-2 flex justify-between items-start">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{cve_id}</p>
        <h3 className="text-lg font-bold">{summary}</h3>
        {package_name && (
          <p className="text-sm text-gray-700 mt-1 mb-2 flex gap-1">
            <strong>Package:</strong>
            <span className="text-gray-900">{package_name}</span>
            {vulnerable_version_range && (
              <span className="text-gray-900">{vulnerable_version_range}</span>
            )}
          </p>
        )}

        <p className="text-gray-700 whitespace-pre-wrap break-words">
          {description}
        </p>
      </div>
      <span
        className={`ml-4 px-2 py-1 rounded text-white text-sm ${severityColorMap[severity]}`}
      >
        {severity.toUpperCase()}
      </span>
    </div>
  );
};
