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
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import SideBar from "~/sidebar/sidebar";
import styles from "./user-accounts.module.css";
import Button from "@mui/material/Button";
import Icon from '@mui/material/Icon';
import { IconButton, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import NumberField from "~/number-field/NumberField";
import { DateTime } from "luxon";

export function UserAccounts() {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(DateTime.now());
  const [startTime, setStartTime] = useState(DateTime.now());
  const [endTime, setEndTime] = useState(DateTime.now());
  const [pauseTime, setPauseTime] = useState(0);
  //const [timeWorked, setTimeWorked] = useState("0:00");
  // TODO calculate time worked based on start and end time and pause time
  const timeWorked = useMemo(() => {
    const diff = endTime.diff(startTime, ["hours", "minutes"]);
    const hours = Math.floor(diff.hours);
    const minutes = Math.round(diff.minutes);
    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  }, [startTime, endTime]);


    const save = () => {
      console.log("Save button clicked");
    }

    const prev = () => {
      setSelectedDate(selectedDate.minus({ days: 1 }));
    }

    const next = () => {
      setSelectedDate(selectedDate.plus({ days: 1 }));
    }

  return (
    <div>
      <SideBar drawerOpen={showSidebar} toolbarTitle="Time Accounts" />      
      <div className={styles.first}></div>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
      <div className={[styles.buttonRow].join(" ")}>
        <Button variant="outlined" onClick={save}>
          Save
        </Button>
        <div>
          <DatePicker label="Basic date picker" value={selectedDate} onChange={value => setSelectedDate(!value ? DateTime.now() : value)} />
        </div>
        <div className="{styles.iconBtn}">
          <IconButton color="primary" onClick={prev}>
            <Icon>chevron_left</Icon>
          </IconButton>
          <IconButton color="primary" onClick={next}>
            <Icon>chevron_right</Icon>
          </IconButton>
        </div>        
      </div>
      <div className={styles.timeRow}>
        <div>
            <TimePicker label="Start Time" ampm={false} value={startTime} onChange={value => setStartTime(!value ? DateTime.now() : value)} />
        </div>          
        <div>
            <TimePicker label="End Time" ampm={false} value={endTime} onChange={value => setEndTime(!value ? DateTime.now() : value)} />
        </div>
        <div>
          <NumberField label="Pause time" min={0} value={pauseTime} onChange={value => setPauseTime(Number(value))} />
        </div>
        <div>
          <TextField          
          id="outlined-required"
          label="Time worked"
          value={timeWorked}          
        />
        </div>
      </div>
      </LocalizationProvider>
    </div>
  );
}
