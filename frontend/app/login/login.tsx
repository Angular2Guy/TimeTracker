import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import GlobalState from "~/global-state";

export function Login() {
  const navigate = useNavigate();  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [globalJwtTokenState, setGlobalJwtTokenState] = useAtom(GlobalState.jwtToken);
  const [globalRolesState, setGlobalRolesState] = useAtom(GlobalState.roles);

  return (<div>This is the login page</div>);
}