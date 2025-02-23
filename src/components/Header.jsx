import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo1.png";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-[#D81B60] to-[#8E24AA] w-full text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
      </Link>

      <SignedOut>
        <div className="flex gap-4">
          <SignInButton mode="modal">
            <button className="bg-blue-900 px-4 py-2 rounded hover:bg-blue-800">
              SIGN IN
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="bg-blue-900 px-4 py-2 rounded hover:bg-blue-800">
              SIGN UP
            </button>
          </SignUpButton>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex items-center gap-6">
          <nav className=" p-3 rounded-lg flex gap-4 text-white">
            <NavLink to="/" className="hover:text-blue-900 uppercase">
              Dashboard
            </NavLink>
            <NavLink
              to="/Live-Attack"
              className="hover:text-blue-900 uppercase"
            >
              Live Attack
            </NavLink>
            <NavLink
              to="/vulnerabilities"
              className="hover:text-blue-900 uppercase"
            >
              Vulnerabilities
            </NavLink>
            <NavLink
              to="/ci-cd-security"
              className="hover:text-blue-900 uppercase"
            >
              CI/CD Security
            </NavLink>
            <NavLink to="/thretepage" className="hover:text-blue-900 uppercase">
              Threte Page
            </NavLink>
          </nav>

          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-[40px] h-[40px]",
              },
            }}
          />
          <SignOutButton>
            <button className="bg-blue-900 px-5 py-2 rounded hover:bg-blue-800">
              LOGOUT
            </button>
          </SignOutButton>
        </div>
      </SignedIn>
    </header>
  );
}
