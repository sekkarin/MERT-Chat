import axios from "../apis/axios";

import { useAppDispatch } from "./useStore";
import { setCredentials } from "../stores/slices/authSlice";

const useRefreshToken = () => {
  const dispatch = useAppDispatch();
  const refresh = async () => {
    try {
      const response = await axios.get("/auth/refreshToken", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      dispatch(setCredentials({ accessToken: response.data.accessToken }));
      return response.data.accessToken;
    } catch (error) {
      console.log(error);
    }
  };

  return refresh;
};

export default useRefreshToken;
