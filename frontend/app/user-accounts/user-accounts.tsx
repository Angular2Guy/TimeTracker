/**
 *    Copyright 2023 Sven Loesekann
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */
import { useAtom } from "jotai";
import { useState } from "react";
import { useNavigate } from "react-router";
import GlobalState from "~/global-state";
import SideBar from "~/sidebar/sidebar";
import styles from './user-accounts.module.css';

export function UserAccounts() {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);  
  const [globalJwtTokenState, setGlobalJwtTokenState] = useAtom(GlobalState.jwtToken);

  return (    
    <div>
  <div><SideBar drawerOpen={showSidebar} toolbarTitle="User Accounts"/></div>
  <div className={styles.first}>User Accounts Page</div>
  </div>
  );
}
