import { Button } from "../atoms/Button";

type HeaderProps = {
  navigate: (target: "overview" | "search") => void;
};

export const Header = ({ navigate }: HeaderProps) => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-center items-center">
      <div className="justify-between w-full flex max-w-[1024px]">
        <h1 className="font-bold text-lg">Security Advisory App</h1>
        <nav className="space-x-4">
          <Button variant={"underline"} onClick={() => navigate("overview")}>
            Overview
          </Button>
          <Button variant={"underline"} onClick={() => navigate("search")}>
            Search
          </Button>
        </nav>
      </div>
    </header>
  );
};
