import { fetchAPI } from "../utils/fetch";
import { environment } from "../constants/environment";
import type { ILogin } from "../types/auth";

const login = async (payload: ILogin) => {
  const result = await fetchAPI(`${environment.API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return result;
}

export default login;