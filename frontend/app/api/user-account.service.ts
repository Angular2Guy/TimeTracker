/*
  - Copyright 2022 Sven Loesekann
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

import type { UserAccountDto } from "~/model/user-account"
import { HttpMethod, request } from "./time-account.service";
import { apiPrefix, apiUrl, handleResponse } from "./login.service";

export const getUserTimeByIdAndDay = async (entryDate: Date, timeAccountIds: string[], jwtToken: string, controller: AbortController | null) => {
    const requestOptions = request(jwtToken, controller);
    const result = await fetch(
        `${apiUrl}${apiPrefix}/time/day/${entryDate.toISOString().split('T')[0]}/accounts/${timeAccountIds.join(',')}`,
        requestOptions,
      );    
    return handleResponse<UserAccountDto[]>(result);
}

export const postUserTime = async (id: string | null, entryDate: Date, comment: string, duration: number, timeAccountId: string, jwtToken: string, controller: AbortController | null) => {
    const requestOptions = request(jwtToken, controller, HttpMethod.POST);
    requestOptions.body = JSON.stringify({id: id, entryDate: entryDate, comment: comment, duration: duration, timeAccountId: timeAccountId});
    const result = await fetch(
        `${apiUrl}${apiPrefix}/time/day/${entryDate.toISOString().split('T')[0]}/accounts/${timeAccountId}`,
        requestOptions,
      );    
    return handleResponse<UserAccountDto>(result);
}
