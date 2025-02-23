import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Herosection from "./Herosection";
import Features from "./Feature";
import Dashboards from "../Pages/Dashbord";

export default function Dashboard() {
  return (
    <div className="">
      <SignedOut>
        <Herosection />
        <Features />
      </SignedOut>

      <SignedIn>
        <Dashboards />
      </SignedIn>
    </div>
  );
}
