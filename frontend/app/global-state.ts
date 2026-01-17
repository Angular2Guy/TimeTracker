import { atom } from "jotai";

const GlobalState = {
    jwtToken: atom(''),
    roles: atom<string[]>([]),
};

export default GlobalState;
