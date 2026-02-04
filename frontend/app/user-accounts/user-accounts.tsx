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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import GlobalState from "~/global-state";
import SideBar from "~/sidebar/sidebar";
import styles from './user-accounts.module.css';
import type { UserDto } from "~/model/user";
import { get } from "http";
import { getUsers } from "~/api/http-client";

export function UserAccounts() {
  let controller: AbortController | null = null;    
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);  
  const [users, setUsers] = useState([] as UserDto[]);
  const [globalJwtTokenState, setGlobalJwtTokenState] = useAtom(GlobalState.jwtToken);
  const [globalRolesState, setGlobalRolesState] = useAtom(GlobalState.roles);  

  useEffect(() => {
    if(!!controller) {
      controller.abort();
    }
    controller = new AbortController();
    getUsers(globalJwtTokenState, controller).then((data) => {
      setUsers(data);
    }).catch((error) => {
      console.error('Error fetching users:', error);
    });
  }, [users]);

  return (    
    <div>
  <div><SideBar drawerOpen={showSidebar} toolbarTitle="User Accounts"/></div>
  <div className={styles.first}>User Accounts Page</div>
  {users.map((user) => (
    <div>Username: {user?.username}, Email: {user?.email}</div>
  ))}
  </div>
  );
}
