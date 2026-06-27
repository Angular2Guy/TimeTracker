import type { DayTimeDto } from "~/model/day-time-dto"
import { request } from "./time-account.service";
import { apiPrefix, getApiUrl, handleResponse } from "./login.service";

export const getTimeFromTo = async (from: Date, to: Date, accountId: string, jwtToken: string, controller: AbortController | null) => {
    const requestOptions = request(jwtToken, controller);
    const result = await fetch(
        `${getApiUrl()}${apiPrefix}/time/from/${from.toISOString().split('T')[0]}/to/${to.toISOString().split('T')[0]}/accounts/${accountId}`,
        requestOptions,
      );
    return handleResponse<DayTimeDto[]>(result);
}
