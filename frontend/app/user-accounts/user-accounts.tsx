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
import { useState } from "react";
import { useNavigate } from "react-router";
import SideBar from "~/sidebar/sidebar";
import styles from "./user-accounts.module.css";
import Button from "@mui/material/Button";
import Icon from '@mui/material/Icon';
import { IconButton } from "@mui/material";

export function UserAccounts() {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

    const save = () => {
      console.log("Save button clicked");
    }

    const prev = () => {
      console.log("Previous button clicked");
    }

    const next = () => {
      console.log("Next button clicked");
    }

  return (
    <div>
      <SideBar drawerOpen={showSidebar} toolbarTitle="Time Accounts" />      
      <div className={styles.first}></div>
      <div className={[styles.buttonRow].join(" ")}>
        <Button variant="outlined" onClick={save}>
          Save
        </Button>
        <div className="{styles.iconBtn}">
          <IconButton color="primary" onClick={prev}>
            <Icon>chevron_left</Icon>
          </IconButton>
          <IconButton color="primary" onClick={next}>
            <Icon>chevron_right</Icon>
          </IconButton>
        </div>        
      </div>
    </div>
  );
}
