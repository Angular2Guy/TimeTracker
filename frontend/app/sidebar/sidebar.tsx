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
import {AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

interface SideBarProps {
  drawerOpen?: boolean;
  toolbarTitle?: string;
}

export default function SideBar({ drawerOpen: openProp = false, toolbarTitle: toolbarTitleProp = "Missing header title" }: SideBarProps) {
  const [open, setOpen] = React.useState(openProp);
  const navigate = useNavigate();  

  useEffect(() => {
    setOpen(openProp);
  }, [openProp]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const openAccounts = () => navigate('/accounts');
  const openTrackTime = () => navigate('/tracktime');
  const openReports = () => navigate('/reports');

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Accounts', 'Track Time', 'Reports'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={index === 0 ? openAccounts : index === 1 ? openTrackTime : openReports}>              
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>      
    </Box>
  );

  return (
    <div>      
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {toolbarTitleProp}
          </Typography>
        </Toolbar>
      </AppBar>  
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}  
