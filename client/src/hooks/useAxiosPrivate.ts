import { axiosPrivate } from "../apis/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAppSelector } from "./useStore";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        // console.log(config.headers["Authorization"]);
        
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const pervRequest = error?.config;

        if (error?.response?.status === 403 && !pervRequest?.sent) {
          pervRequest.sent = true;

          const newAccessToken = await refresh();

          pervRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return axiosPrivate(pervRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return axiosPrivate;
};

export default useAxiosPrivate;
