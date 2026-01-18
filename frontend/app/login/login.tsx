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
import { useEffect, useState, type BaseSyntheticEvent, type ChangeEventHandler, type FormEvent } from "react";
import { Dialog, DialogContent, Button, Tabs, Tab, Box, TextField, type SelectChangeEvent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from "react-router";
import GlobalState from "~/global-state";
import { useTranslation, Trans } from 'react-i18next';
import styles from './login.module.css';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>{children}</>
      )}
    </div>
  );
}

export function Login() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();  
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [activeTab, setActiveTab] = useState(0);  
  const [language, setLanguage] = useState('en');
  const [responseMsg, setResponseMsg] = useState('');
  const [globalJwtTokenState, setGlobalJwtTokenState] = useAtom(GlobalState.jwtToken);
  const [globalRolesState, setGlobalRolesState] = useAtom(GlobalState.roles);

  const handleChangeEmail: ChangeEventHandler<HTMLInputElement> = (event) => {
    setEmail(event.currentTarget.value as string);
  };
  const handleChangePassword1: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPassword1(event.currentTarget.value as string);
  };
  const handleChangePassword2: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPassword2(event.currentTarget.value as string);
  };

  const handleCancel = (event: FormEvent) => {
    event.preventDefault();
    setEmail('');
    setPassword1('');
    setPassword2('');
    setResponseMsg('');
  };
  const handleClose = () => {
    //setOpen(false);
  };
  const handleTabChange = (event: BaseSyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setResponseMsg('');
  };
  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
    i18n.changeLanguage(event.target.value).then();
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    throw new Error("Function not implemented.");
  }

  return (<div className={styles.container}><div className={styles.content}>
    <Tabs value={activeTab} onChange={handleTabChange} aria-label="basic tabs example">
        <Tab label={t('login.login')} {...a11yProps(0)} />
        <Tab label={t('login.signin')} {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={activeTab} index={0}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            autoFocus
            margin="dense"
            value={email}
            onChange={handleChangeEmail}
            id="email"
            label={t('login.email')}
            type="string"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            value={password1}
            onChange={handleChangePassword1}
            id="password1"
            label={t('login.password')}
            type="password"
            fullWidth
            variant="standard"
          />
          <div className="flex justify-between items-center mt-4">
            <div>
            <Button type="submit">{t('common.ok')}</Button>
            <Button onClick={handleCancel}>{t('common.cancel')}</Button>
            </div>
            <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">{t('common.language')}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={language}
        label={t('common.language')}
        onChange={handleLanguageChange}
      >
        <MenuItem value={'en'}>{t('common.english')}</MenuItem>
        <MenuItem value={'de'}>{t('common.german')}</MenuItem>
      </Select>
    </FormControl>
          </div>          
          <div className={styles.responseMsg}>
            {[responseMsg].filter(value => !!value).map((value, index) =>
              <span key={index}>{t('common.message')}: {value}</span>
            )}
          </div>
        </Box>
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            autoFocus
            margin="dense"
            value={email}
            onChange={handleChangeEmail}
            id="email"
            label={t('login.email')}
            type="string"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            value={password1}
            onChange={handleChangePassword1}
            id="password1"
            label={t('login.password')}
            type="password"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            value={password2}
            onChange={handleChangePassword2}
            id="password2"
            label={t('login.password')}
            type="password"
            fullWidth
            variant="standard"
          />
          <div className="flex justify-between items-center mt-4">
            <div>
            <Button type="submit">{t('common.ok')}</Button>
            <Button onClick={handleCancel}>{t('common.cancel')}</Button>
            </div>
            <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">{t('common.language')}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={language}
        label={t('common.language')}
        onChange={handleLanguageChange}
      >
        <MenuItem value={'en'}>{t('common.english')}</MenuItem>
        <MenuItem value={'de'}>{t('common.german')}</MenuItem>
      </Select>
    </FormControl>

          </div>
          <div className={styles.responseMsg}>
            {[responseMsg].filter(value => !!value).map((value, index) =>
              <span key={index}>{t('common.message')}: {value}</span>
            )}
          </div>
        </Box>
      </TabPanel>      
    </div></div>);
}