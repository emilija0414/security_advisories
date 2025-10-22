import { useEffect, useState } from "react";
import { OverviewPage } from "./components/pages/OverviewPage";
import { SearchPage } from "./components/pages/SearchPage";
import { Header } from "./components/organisms/Header";

export const App = () => {
  // Initial page from hash
  const [page, setPage] = useState<"overview" | "search">(
    window.location.hash === "#search" ? "search" : "overview"
  );

  // Navigate and update hash
  const navigate = (target: "overview" | "search") => {
    window.location.hash = `#${target}`;
    setPage(target);
  };

  // Handle back/forward buttons
  useEffect(() => {
    const onHashChange = () => {
      setPage(window.location.hash === "#search" ? "search" : "overview");
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <div className="flex-col">
      <Header navigate={navigate} />

      <main className="p-6 max-w-[1024px] w-full mx-auto">
        {page === "overview" && <OverviewPage />}
        {page === "search" && <SearchPage />}
      </main>
    </div>
  );
};

export default App;
