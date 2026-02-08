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
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import GlobalState from "~/global-state";
import SideBar from "~/sidebar/sidebar";
import styles from './user-accounts.module.css';
import type { UserDto } from "~/model/user";
import { getUsers } from "~/api/http-client";
import { Autocomplete, Avatar, Box, Icon, List, ListItem, ListItemAvatar, ListItemText, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export function UserAccounts() {
  let controller = useRef<AbortController | null>(null);    
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);  
  const [users, setUsers] = useState([] as UserDto[]);
  const [selectedUsers, setSelectedUsers] = useState([] as UserDto[]);
  const [selectedUser, setSelectedUser] = useState(null as UserDto | null);
  const [globalJwtTokenState, setGlobalJwtTokenState] = useAtom(GlobalState.jwtToken);
  const [globalRolesState, setGlobalRolesState] = useAtom(GlobalState.roles);    

  const removeUserFromSelectedUsers = (user: UserDto) => {
    setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
  }

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
  <div className={[styles.first].join(' ')}>
  <div>
  <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={users}
      autoHighlight
      onChange={(event: Event, value: UserDto | null) => {        
        setSelectedUser(value);
      }}
      onKeyDown={(event) => {
    if (event.key === 'Enter') {      
      event.defaultMuiPrevented = true;
      if (selectedUser) {
        setSelectedUsers(selectedUsers.concat(selectedUser));
        setSelectedUser(null);
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
    <div>
      Main
      </div>
    </div>
  </div>
  );
}
