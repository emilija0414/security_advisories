import { ListItemProps } from "../atoms/ListItem";

export async function fetchAdvisories(): Promise<any[]> {
  const response = await fetch("https://api.github.com/advisories?per_page=50");
  if (!response.ok) throw new Error(`Response status: ${response.status}`);
  return await response.json();
}

export function filterAdvisories(
  advisories: any[],
  options: {
    search?: string;
    packageName?: string;
    packageVersion?: string;
    severity?: string;
  }
): ListItemProps[] {
  const { search, packageName, packageVersion, severity } = options;
  const searchLower = search?.toLowerCase() || "";
  const packageLower = packageName?.toLowerCase() || "";

  return advisories.flatMap((adv) =>
    (adv.vulnerabilities || [])
      .filter((v: any) => {
        const pkgName = v.package?.name?.toLowerCase?.() || "";
        if (packageLower && !pkgName.includes(packageLower)) return false;
        if (
          packageVersion &&
          !v.vulnerable_version_range.includes(packageVersion)
        )
          return false;
        if (searchLower && !adv.summary.toLowerCase().includes(searchLower))
          return false;
        if (severity && severity !== "unknown" && adv.severity !== severity)
          return false;
        return true;
      })
      .map((v: any) => ({
        cve_id: adv.cve_id || adv.ghsa_id || "",
        summary: adv.summary || "",
        description: adv.description || "",
        severity: adv.severity || "unknown",
        package_name: v.package?.name || "unknown",
        vulnerable_version_range: v.vulnerable_version_range || "",
      }))
  );
}
