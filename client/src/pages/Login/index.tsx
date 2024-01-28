import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import axios from "../../apis/axios";
import { useAppDispatch } from "../../hooks/useStore";
import { setCredentials } from "../../stores/slices/authSlice";
import SpinLoading from "../../components/SpinLoading";
interface Form {
  username: string;
  password: string;
}
const Login = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [isLoading, setIsLoading] = useState(false);

  const [formInput, setFromInput] = useState<Form>({
    username: "",
    password: "",
  });

  const onSubmitted = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "/auth/login",
        {
          ...formInput,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      

      if (res.status === 200) {
        dispatch(
          setCredentials({
            accessToken: res.data.token,
            user: formInput.username,
            id: res.data.id,
          })
        );
        setFromInput({
          username: "",
          password: "",
        });
        navigation(from, { replace: true });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="flex flex-1 flex-col drop-shadow-lg bg-white rounded-md p-3 mt-20 md:max-w-md md:mx-auto mx-5">
      <h6 className="text-2xl font-bold text-center">Sign in</h6>
      <label htmlFor="username" className="font-bold text-lg text-neutral-500">
        User name
      </label>
      <input
        className="border-neutral-200 border-b-2 my-2  focus:outline-none focus:border-orange-500"
        type="text"
        name="username"
        id="username"
        placeholder="User Example"
        onChange={(e) => {
          setFromInput((value) => ({ ...value, username: e.target.value }));
        }}
      />
      <label htmlFor="password" className="font-bold text-lg text-neutral-500">
        Password
      </label>
      <input
        className="border-neutral-200 border-b-2 focus:outline-none focus:border-orange-500 my-2"
        type="password"
        name="password"
        id="password"
        placeholder="***************"
        onChange={(e) => {
          setFromInput((value) => ({ ...value, password: e.target.value }));
        }}
      />
      <button
        type="button"
        onClick={() => {
          onSubmitted();
        }}
        className="mt-8 mb-5   bg-emerald-500 p-2 rounded-xl text-white hover:bg-emerald-400 text-center"
      >
        {isLoading ? (
          <div className="text-center mx-48">
            <SpinLoading />
          </div>
        ) : (
          "เข้าสู่ระบบ"
        )}
      </button>
      <Link
        to={"/register"}
        className="text-end text-blue-500 hover:text-blue-300"
      >
        สมัครสมาชิก
      </Link>
      <p className="text-neutral-200 text-center">
        Create By Sekkarin Singhayoo 2023{" "}
      </p>
    </main>
  );
};

export default Login;
