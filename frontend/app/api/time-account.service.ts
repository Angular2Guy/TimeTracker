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
import { apiPrefix, apiUrl, handleResponse } from "./login.service";
import type { TimeAccountDto } from "~/model/time-account";
  
export const getTimeAccountsByManager = async (jwtToken: string, managerId: string, controller: AbortController | null) => {
  const requestOptions = request(jwtToken, controller);
  const result = await fetch(`${apiUrl}${apiPrefix}/account/manager/${managerId}`, requestOptions);
  return handleResponse<TimeAccountDto[]>(result);
}

export const postTimeAccounts = async (jwtToken: string, timeAccounts: TimeAccountDto[], controller: AbortController | null) => {
  const requestOptions = request(jwtToken, controller, HttpMethod.POST);
  requestOptions.body = JSON.stringify(timeAccounts);
  const result = await fetch(`${apiUrl}${apiPrefix}/account`, requestOptions);
  return handleResponse<TimeAccountDto[]>(result);
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

const request = (jwtToken: string, controller: AbortController | null, method: HttpMethod = HttpMethod.GET) => {
  return {
    method: method,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    }, 
    signal: controller?.signal,
    body: null as null | string
  };
};
