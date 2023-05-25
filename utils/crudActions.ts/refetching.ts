import axios from "axios";
import { FRONT_URL } from "./global";

export const refetchingData = async (
  endpoint: string,
  refreshUsers: (value: any) => any,
  changeUser: (value: any) => any
) => {
    try {
      const response = await axios.get(FRONT_URL + endpoint);
      refreshUsers(response.data)
      changeUser(response.data[0])

    } catch (error) {
      console.log("error", error)
    }
  }
