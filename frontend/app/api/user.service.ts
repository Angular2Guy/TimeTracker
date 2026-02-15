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
import type { UserDto } from "~/model/user";
import { apiPrefix, apiUrl, handleResponse } from "./login.service";

export const getUsers = async (jwtToken: string, controller: AbortController | null) => {
  const requestOptions = getOptions(jwtToken, controller);
  const result = await fetch(`${apiUrl}${apiPrefix}/user/all`, requestOptions);
  return handleResponse<UserDto[]>(result);
}

const getOptions = (jwtToken: string, controller: AbortController | null) => {
  return {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`
    }, 
    signal: controller?.signal
  };
};
