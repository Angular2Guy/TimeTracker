import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import SideBar from "~/sidebar/sidebar";
import styles from "./user-reports.module.css";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTime } from "luxon";
import GlobalState from "~/global-state";
import { getTimeAccountsByUser } from "~/api/time-account.service";
import { getTimeFromTo } from "~/api/report.service";
import { useAtom } from "jotai";
import type { DayTimeDto } from "~/model/day-time-dto";

interface ReportRow {
  date: string;
  accountName: string;
  comment: string;
  durationMinutes: number;
}

export function UserReports() {
  let controller = useRef<AbortController | null>(null);
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(DateTime.now());
  const [globalUserIdState, setGlobalUserIdState] = useAtom(GlobalState.userId);
  const [tableData, setTableData] = useState([] as ReportRow[]);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const tableInstanceRef = useRef<any | null>(null);

  const loadData = () => {
    if (!!controller.current) {
      controller.current.abort();
    }
    controller.current = new AbortController();

    const from = selectedMonth.startOf("month");
    const to = selectedMonth.endOf("month");

    getTimeAccountsByUser(
      GlobalState.jwtToken,
      globalUserIdState,
      selectedMonth.toJSDate(),
      controller.current,
    )
      .then(async (accounts) => {
        const accountIds = accounts.filter((a) => a?.id).map((a) => a.id as string);
        const results = await Promise.all(
          accountIds.map((accountId) =>
            getTimeFromTo(
              from.toJSDate(),
              to.toJSDate(),
              accountId,
              GlobalState.jwtToken,
              controller.current,
            ).catch(() => [] as DayTimeDto[]),
          ),
        );
        const allEntries = results.flat();
        setTableData(
          allEntries.map((entry) => ({
            date: DateTime.fromJSDate(new Date(entry.entryDate)).toISODate() || "",
            accountName: entry.dayTimeDtos?.name || "",
            comment: entry.comment,
            durationMinutes: entry.duration,
          } as ReportRow)),
        );
      })
      .catch((error) => {
        console.error("Error loading report data:", error);
      });
  };

  useEffect(() => {
    (!GlobalState.jwtToken || GlobalState.jwtToken.length < 10) && navigate("/login");
  }, []);

  useEffect(() => {
    if (!tableRef.current) return;

    const table = new Tabulator(tableRef.current, {
      height: "auto",
      data: tableData,
      layout: "fitColumns",
      columns: [
        { title: "Date", field: "date", sorter: "string" },
        { title: "Account", field: "accountName" },
        { title: "Comment", field: "comment" },
        {
          title: "Duration",
          field: "durationMinutes",
          hozAlign: "right",
          formatter: (cell: any) => {
            const minutes = cell.getValue();
            const h = Math.floor(minutes / 60);
            const m = Math.round(minutes % 60);
            return `${h}:${m.toString().padStart(2, "0")}`;
          },
        },
      ],
    });

    tableInstanceRef.current = table;

    return () => {
      tableInstanceRef.current?.destroy();
      tableInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    loadData();
  }, [selectedMonth]);

  useEffect(() => {
    const table = tableInstanceRef.current;
    if (table && Array.isArray(tableData)) {
      table.replaceData(tableData).catch(() => {
        table.setData(tableData);
      });
    }
  }, [tableData]);

  const totalMinutes = useMemo(
    () => tableData.reduce((sum, row) => sum + row.durationMinutes, 0),
    [tableData],
  );
  const totalHours = Math.floor(totalMinutes / 60);
  const totalMinutesRemainder = Math.round(totalMinutes % 60);

  return (
    <div>
      <SideBar drawerOpen={showSidebar} toolbarTitle="User Reports" />
      <div className={styles.first}></div>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <div className={styles.controls}>
          <div className={styles.monthPicker}>
            <DatePicker
              label="Month"
              views={["year", "month"]}
              value={selectedMonth}
              onChange={(value) => setSelectedMonth(value || DateTime.now())}
            />
          </div>
          <div className={styles.total}>
            Total: {totalHours}:{totalMinutesRemainder.toString().padStart(2, "0")} h
          </div>
        </div>
        <div style={{ width: "100%", marginTop: "24px" }}>
          <div ref={tableRef} style={{ width: "100%" }} />
        </div>
      </LocalizationProvider>
    </div>
  );
}
