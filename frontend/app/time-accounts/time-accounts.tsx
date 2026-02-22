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
import styles from './time-accounts.module.css';
import { Autocomplete, Avatar, Box, Button, Icon, List, ListItem, ListItemAvatar, ListItemText, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {TabulatorFull as Tabulator} from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';
import type { UserDto } from "~/model/user";
import { getUsers } from "~/api/user.service";
import { getTimeAccountsByManager } from "~/api/time-account.service";
import type { TimeAccountDto } from "~/model/time-account";


export function TimeAccounts() {
  let controller = useRef<AbortController | null>(null);    
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);  
  const [users, setUsers] = useState([] as UserDto[]);
  const [selectedUsers, setSelectedUsers] = useState([] as UserDto[]);
  const [selectedUser, setSelectedUser] = useState(null as UserDto | null);
  const [globalJwtTokenState, setGlobalJwtTokenState] = useAtom(GlobalState.jwtToken);
  const [globalRolesState, setGlobalRolesState] = useAtom(GlobalState.roles);    
  const [globalUserIdState, setGlobalUserIdState] = useAtom(GlobalState.userId);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const tableInstanceRef = useRef<any | null>(null);
  const [tableData, setTableData] = useState<TimeAccountDto[]>([]);

  const removeUserFromSelectedUsers = (user: UserDto) => {
    setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
  }

  const save = () => {
    console.log('save', selectedUsers, tableData);
  }

  const add = () => {
    const newAccount = {
      name: '',
      description: '',
      duration: 0,
      startDate: new Date(),
      endDate: new Date(),
      managerId: globalUserIdState,
      userIds: []
    } as TimeAccountDto;
    setTableData([newAccount, ...tableData]);
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
          { title: "Name", field: "name", width: 150, editor: "input" },
          { title: "Description", field: "description", hozAlign: "left", width: 150, editor: "input" },
          { title: "Duration", field: "duration", hozAlign: "left", width: 150, editor: "input" },
          { title: "Start Date", field: "startDate", sorter: "date", hozAlign: "center" },
          { title: "End Date", field: "endDate", sorter: "date", hozAlign: "center" },
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
    if(!!controller.current && users.length > 0 && tableData.length > 0) {
      return;
      //controller.current.abort();
    }
    controller.current = new AbortController();
    getUsers(globalJwtTokenState, controller.current).then((data) => {      
      setUsers(data);
    }).catch((error) => {
      console.error('Error fetching users:', error);
    });
    getTimeAccountsByManager(globalJwtTokenState, globalUserIdState, controller.current).then((data) => {
      setTableData(data);      
    }).catch((error) => {
      console.error('Error fetching time accounts:', error);
    });
  }, []);

  return (    
    <div>
  <div><SideBar drawerOpen={showSidebar} toolbarTitle="Time Accounts"/></div>    
  <div className={[styles.buttonRow,styles.first].join(' ')}>
    <Button variant="outlined" onClick={save}>Save</Button>
    <Button variant="outlined" onClick={add}>Add</Button>
  </div>
  <div className={styles.baseContainer}>
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
