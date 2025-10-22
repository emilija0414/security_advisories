import { useState } from "react";
import { Dropdown, DropdownProps } from "../atoms/Dropdown";
import { ListItem, ListItemProps } from "../atoms/ListItem";
import { InputField } from "../atoms/InputField";
import { Button } from "../atoms/Button";
import { fetchAdvisories, filterAdvisories } from "../helpers/fetchApi";

export const SearchPage = () => {
  const [packageName, setPackageName] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [packageVersion, setPackageVersion] = useState<string>("");
  const [severity, setSeverity] =
    useState<DropdownProps["severity"]>("unknown");

  const [advisories, setAdvisories] = useState<ListItemProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setSubmitted(true);
    if (!packageName.trim()) {
      setError("Package name is required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchAdvisories();
      const result = filterAdvisories(data, {
        packageName,
        packageVersion,
        severity,
      });
      setAdvisories(result);
    } catch (err: any) {
      setError(err.message || "Failed to fetch advisories.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1024px] w-full">
      <div className="flex flex-col gap-2 mb-4">
        <h1 className="text-lg pb-3">Search for an advisory</h1>
        <InputField
          value={packageName}
          placeholder="Package Name (required)"
          onChange={(e) => setPackageName(e.target.value)}
          isRequired={true}
          forceError={submitted}
        />
        <InputField
          value={packageVersion}
          placeholder="Package Version"
          onChange={(e) => setPackageVersion(e.target.value)}
        />
        <Dropdown severity={severity} onSeverityChange={setSeverity} />
        <Button variant="filled" onClick={handleSearch}>
          Search
        </Button>
      </div>

      {loading && <p className="text-gray-500">Loading advisories...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && submitted && advisories.length === 0 && (
        <p className="text-gray-500">No advisories found.</p>
      )}

      {!loading &&
        !error &&
        advisories.map((advisory, index) => (
          <ListItem
            key={index}
            cve_id={advisory.cve_id}
            summary={advisory.summary}
            description={advisory.description}
            severity={advisory.severity}
            package_name={advisory.package_name}
            vulnerable_version_range={advisory.vulnerable_version_range}
          />
        ))}
    </div>
  );
};
