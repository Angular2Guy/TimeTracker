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
import { useEffect, useState, useRef, type SyntheticEvent } from "react";
import { useNavigate } from "react-router";
import GlobalState from "~/global-state";
import SideBar from "~/sidebar/sidebar";
import styles from './user-accounts.module.css';
import type { UserDto } from "~/model/user";
import { getUsers } from "~/api/http-client";
import { Autocomplete, Avatar, Box, Icon, List, ListItem, ListItemAvatar, ListItemText, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';


export function UserAccounts() {
  let controller = useRef<AbortController | null>(null);    
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);  
  const [users, setUsers] = useState([] as UserDto[]);
  const [selectedUsers, setSelectedUsers] = useState([] as UserDto[]);
  const [selectedUser, setSelectedUser] = useState(null as UserDto | null);
  const [globalJwtTokenState, setGlobalJwtTokenState] = useAtom(GlobalState.jwtToken);
  const [globalRolesState, setGlobalRolesState] = useAtom(GlobalState.roles);    
  const tableRef = useRef<HTMLDivElement | null>(null);
  const tableInstanceRef = useRef<any | null>(null);
  const [tableData, setTableData] = useState<any[]>([
 	{id:1, name:"Oli Bob", age:"12", col:"red", dob:""},
 	{id:2, name:"Mary May", age:"1", col:"blue", dob:"14/05/1982"},
 	{id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"22/05/1982"},
 	{id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
 	{id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"31/01/1999"},
   ]);

  const removeUserFromSelectedUsers = (user: UserDto) => {
    setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
  }

 useEffect(() => {
  if (!tableRef.current) return;

  // Wait for DOM to be fully ready before initializing Tabulator
  const timer = setTimeout(() => {
    if (!tableRef.current) return;

    try {
      const table = new Tabulator(tableRef.current, {
        height: "100%",
        data: tableData,
        layout: "fitColumns",
        //virtualDom: true,
        columns: [
          { title: "Name", field: "name", width: 150 },
          { title: "Age", field: "age", hozAlign: "left", formatter: "progress" },
          { title: "Favourite Color", field: "col" },
          { title: "Date Of Birth", field: "dob", sorter: "date", hozAlign: "center" },
        ],
      });

      tableInstanceRef.current = table;
    } catch (e) {
      console.error("Tabulator initialization error:", e);
    }
  }, 0);

  return () => {
    clearTimeout(timer);
    try {
      tableInstanceRef.current?.destroy();
    } catch (e) {
      // ignore destroy errors
    }
    tableInstanceRef.current = null;
  }
 }, []);

 // Update Tabulator when tableData state changes
 useEffect(() => {
  const inst = tableInstanceRef.current;
  if (!inst) return;
  try {
    // try replaceData first, fallback to setData
    if (typeof inst.replaceData === 'function') {
      inst.replaceData(tableData);
    } else if (typeof inst.setData === 'function') {
      inst.setData(tableData);
    }
  } catch (e) {
    // ignore update errors
  }
 }, [tableData]);

  useEffect(() => {       
    if(!!controller.current && users.length > 0) {
      return;
      //controller.current.abort();
    }
    controller.current = new AbortController();
    getUsers(globalJwtTokenState, controller.current).then((data) => {      
      setUsers(data);
    }).catch((error) => {
      console.error('Error fetching users:', error);
    });
  }, []);

  return (    
    <div>
  <div><SideBar drawerOpen={showSidebar} toolbarTitle="User Accounts"/></div>  
  <div className={[styles.first, styles.baseContainer].join(' ')}>
  <div>
  <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={users}
      autoHighlight
      onChange={(event: SyntheticEvent, value: UserDto | null) => {        
        setSelectedUser(value);
      }}
      onKeyDown={(event) => {
    if (event.key === 'Enter') {      
      event.defaultMuiPrevented = true;      
      if (selectedUser) {
        setSelectedUsers(selectedUsers.filter(u => u.id !== selectedUser.id).concat(selectedUser));        
      }
    }}}
      getOptionLabel={(option) => option.username}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >            
            {option.username}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a user"
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            },
          }}
        />
      )}
    />
     <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {selectedUsers.map((user) => (
        <ListItem key={user.id}>
          <ListItemText primary={user.username} />
          <ListItemAvatar>          
            <CloseIcon onClick={() => removeUserFromSelectedUsers(user)} />       
        </ListItemAvatar>
        </ListItem>           
      ))}
    </List>
    </div>
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <div id="example-table" ref={tableRef} style={{ width: '100%', height: '100%', flex: 1 }}></div>
    </div>
    </div>
  </div>
  );
}
