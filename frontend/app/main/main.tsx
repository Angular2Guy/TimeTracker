import { useAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import GlobalState from "~/global-state";


export function Main() {
  const navigate = useNavigate();
  const [globalJwtTokenState, setGlobalJwtTokenState] = useAtom(GlobalState.jwtToken);

  useEffect(() => {
    if (!globalJwtTokenState || globalJwtTokenState.length === 0) {
      navigate('/login');
    }    
    }, [globalJwtTokenState]);

  return (<div>Main Page</div>
  );
}
