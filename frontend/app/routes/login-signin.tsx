import { Login } from "../login/login";
import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login" },
    { name: "description", content: "Login to TimeTracker" },
  ];
}

export default function LoginSignin() {
  return (
    <Login/>
  );
}
