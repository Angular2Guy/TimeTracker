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
import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import SideBar from "~/sidebar/sidebar";
import styles from "./user-accounts.module.css";
import Button from "@mui/material/Button";
import Icon from '@mui/material/Icon';
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import { IconButton, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import NumberField from "~/number-field/number-field";
import { DateTime } from "luxon";
import GlobalState from "~/global-state";
import { getTimeAccountsByUser } from "~/api/time-account.service";
import type { TimeAccountDto } from "~/model/time-account";
import { useAtom } from "jotai";

interface TableRow {
  id: string;
  name: string;
  description: string;
  time: number;
  timeRemaining: number;
  userId: string;  
  timeAccount: TimeAccountDto;
}

export function UserAccounts() {
  let controller = useRef<AbortController | null>(null);
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(DateTime.now());
  const [startTime, setStartTime] = useState(DateTime.now());
  const [endTime, setEndTime] = useState(DateTime.now());
  const [pauseTime, setPauseTime] = useState(0);
  const [globalUserIdState, setGlobalUserIdState] = useAtom(GlobalState.userId);
  const [tableData, setTableData] = useState([] as TableRow[]);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const tableInstanceRef = useRef<any | null>(null);
  
  const timeWorked = useMemo(() => {
    const diff = endTime.diff(startTime, ["minutes"]);    
    let minutes = Math.round(diff.minutes - pauseTime);
    minutes = Math.max(minutes, 0);
    const hours = Math.floor(minutes / 60);
    minutes = Math.round(minutes - hours * 60);
    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  }, [startTime, endTime, pauseTime]);

  useEffect(() => {
    if (!tableRef.current) return;

    const table = new Tabulator(tableRef.current, {
      height: "auto",
      data: tableData,
      layout: "fitColumns",
      columns: [
        { title: "Name", field: "name" },
        { title: "Description", field: "description" },
        {
          title: "Time",
          field: "time",
          editor: "input",
          hozAlign: "right",
          formatter: "money",
          formatterParams: { decimal: ".", thousand: ",", precision: 0 },
        },
        { title: "Time remaining", field: "timeRemaining", hozAlign: "right" },
      ],
      cellEdited: (cell: any) => {
        const row = cell.getRow().getData();
        const value = Number(cell.getValue());
        setTableData((prev) =>
          prev.map((r) =>
            r.id === row.id
              ? {
                  ...r,
                  time: Number.isNaN(value) ? r.time : value,
                  timeRemaining: Math.max(r.timeRemaining - (value - r.time), 0),
                }
              : r,
          ),
        );
      },
    });

    tableInstanceRef.current = table;

    return () => {
      tableInstanceRef.current?.destroy();
      tableInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!!controller.current && tableData.length > 0) {
      return;
      //controller.current.abort();
    }
    controller.current = new AbortController();    
    getTimeAccountsByUser(
      GlobalState.jwtToken,
      globalUserIdState,
      selectedDate.toJSDate(),
      controller.current,
    ).then((data) => {        
        setTableData(data.flatMap((account) => ({
          id: account.id || "",
          name: account.name,
          description: account.description,
          time: 0,
          timeRemaining: account.duration,
          userId: globalUserIdState,
          timeAccount: account,
        } as TableRow)));
      })
      .catch((error) => {
        console.error("Error fetching time accounts:", error);
      });
  }, []);

  useEffect(() => {
    const table = tableInstanceRef.current;
    if (table && Array.isArray(tableData)) {
      table.replaceData(tableData).catch(() => {
        table.setData(tableData);
      });
    }
  }, [tableData]);

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
          <NumberField label="Pause time" min={0} value={pauseTime} onValueChange={value => setPauseTime(Number(value))} />
        </div>
        <div>
          <TextField          
          id="outlined-required"
          label="Time worked"
          value={timeWorked}          
        />
        </div>
      </div>
      <div style={{ width: '100%', marginTop: '24px' }}>
        <div ref={tableRef} style={{ width: '100%' }} />
      </div>
      </LocalizationProvider>
    </div>
  );
}
