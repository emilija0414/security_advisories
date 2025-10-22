import { useEffect, useMemo, useState } from "react";
import { ListItem, ListItemProps } from "../atoms/ListItem";
import { InputField } from "../atoms/InputField";
import { Button } from "../atoms/Button";
import { Dropdown, DropdownProps } from "../atoms/Dropdown";
import { useDebounce } from "../helpers/useDebounce";
import { fetchAdvisories, filterAdvisories } from "../helpers/fetchApi";

export const OverviewPage = () => {
  const [advisories, setAdvisories] = useState<ListItemProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [severity, setSeverity] =
    useState<DropdownProps["severity"]>("unknown");

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const data = await fetchAdvisories();
        const filtered = filterAdvisories(data, { search, severity });
        setAdvisories(filtered);
      } catch (err: any) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [debouncedSearch, severity]);

  const filteredList = useMemo(() => {
    return advisories.filter(
      (advisory) =>
        advisory.summary
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase()) &&
        (severity === "unknown" || advisory.severity === severity)
    );
  }, [advisories, debouncedSearch, severity]);

  return (
    <div className="max-w-[1024px] w-full">
      <div className="flex items-center gap-2 mb-4">
        <InputField
          value={search}
          placeholder="Search for advisory..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <Dropdown
          onSeverityChange={(e) => setSeverity(e)}
          severity={severity}
        />
      </div>
      {loading && <p className=" text-gray-500">Loading advisories...</p>}
      {!loading && filteredList.length === 0 ? (
        <p className=" text-gray-500">No advisories found.</p>
      ) : (
        filteredList.map((advisory, index) => (
          <ListItem
            key={index}
            cve_id={advisory.cve_id}
            summary={advisory.summary}
            description={advisory.description}
            severity={advisory.severity}
          />
        ))
      )}
    </div>
  );
};
