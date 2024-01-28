import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import useRefreshToken from "../hooks/useRefreshToken";
import { useAppSelector } from "../hooks/useStore";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      console.log("verifyRefreshToken");

      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return (
    <>
      {!auth.accessToken ? (
        <Outlet />
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
