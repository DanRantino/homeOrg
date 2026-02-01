import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

export const LoginHeader = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#242d47] px-10 py-3 bg-background-light dark:bg-background-dark">
      <div className="flex items-center gap-4 text-white">
        <div className="size-6 text-primary flex items-center justify-center">
          <img src={"/public/logo.svg"} />
        </div>
        <h2 className="text-white text-lg font-bold">Domus</h2>
      </div>
      <div className="flex items-center gap-9">
        <Link to="/features">
          <p className="text-slate-400 hover:text-white text-sm font-medium transition-colors">
            Features
          </p>
        </Link>
        <Link to="/pricing">
          <p className="text-slate-400 hover:text-white text-sm font-medium transition-colors">
            Pricing
          </p>
        </Link>
        <Link to="/support">
          <p className="text-slate-400 hover:text-white text-sm font-medium transition-colors">
            Support
          </p>
        </Link>
        <Link to="/register">
          <Button className="text-white">Sign Up</Button>
        </Link>
      </div>
    </header>
  );
};
