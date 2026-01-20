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
import type { NavigateFunction } from "react-router";
import type { LoginRequest, LoginResponse } from "~/model/login";

const apiPrefix = '/rest';

async function handleResponse<T>(response: Response,navigate: NavigateFunction): Promise<T> {
  if (!response.ok) {
    const error = await response.text();
    if(navigate) navigate('/');
    throw new Error(error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

const postLogin = async function (email: string, password1: string, controller: AbortController | null): Promise<LoginResponse> {
  const requestOptions = loginSigninOptions(email, password1, controller);
  const result = await fetch(`${apiPrefix}/login/login`, requestOptions);
  return handleResponse<LoginResponse>(result, null as unknown as NavigateFunction);
}

const postSignin = async function (email: string, password1: string, controller: AbortController | null): Promise<LoginResponse> {
  const requestOptions = loginSigninOptions(email, password1, controller);
  const result = await fetch(`${apiPrefix}/login/signin`, requestOptions);
  return handleResponse<LoginResponse>(result, null as unknown as NavigateFunction);
}

const loginSigninOptions = (email: string, password1: string, controller: AbortController | null) => {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, password: password1 } as LoginRequest),
    signal: controller?.signal
  };
};