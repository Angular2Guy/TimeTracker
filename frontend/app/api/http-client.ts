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
import { useNavigate, type NavigateFunction } from "react-router";
import type { LoginRequest, LoginResponse } from "~/model/login";
import type { UserDto } from "~/model/user";

const apiPrefix = '/rest';

const apiUrl = import.meta.env.VITE_API_URL;

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.text();
    const navigate = useNavigate();
    if(navigate) navigate('/');
    throw new Error(error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export const postLogin = async function (email: string, password1: string, controller: AbortController | null): Promise<LoginResponse> {
  const requestOptions = loginSigninOptions(email, '', password1, controller);
  const result = await fetch(`${apiUrl}${apiPrefix}/login/login`, requestOptions);
  return handleResponse<LoginResponse>(result);
}

export const postSignin = async function (email: string, username: string, password1: string, controller: AbortController | null): Promise<LoginResponse> {
  const requestOptions = loginSigninOptions(email, username, password1, controller);
  const result = await fetch(`${apiUrl}${apiPrefix}/login/signin`, requestOptions);
  return handleResponse<LoginResponse>(result);
}

const loginSigninOptions = (email: string, username: string, password1: string, controller: AbortController | null) => {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, username: username, password: password1 } as LoginRequest),
    signal: controller?.signal
  };
};

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
