import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "../../apis/axios";
import SpinLoading from "../../components/SpinLoading";

export interface Form {
  username: string;
  password: string;
}

const Register = () => {
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formInput, setFromInput] = useState<Form>({
    username: "",
    password: "",
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const onSubmitted = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(formInput)) {
        formData.append(key, value);
      }

      const res = await axios.post("/auth/register", {
        ...formInput,
      });
      console.log(res.data);

      if (res.status == 201) {
        setFromInput({
          username: "",
          password: "",
        });
        navigation("/registerSuccess");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-1 flex-col drop-shadow-lg bg-white rounded-md p-3 mt-20 md:max-w-md md:mx-auto mx-5 mb-5">
      <h6 className="text-2xl font-bold text-center">Sign Up</h6>
      <label htmlFor="username" className="font-bold text-lg text-neutral-500">
        Username
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
        type="text"
        name="password"
        id="password"
        placeholder="***************"
        onChange={(e) => {
          setFromInput((value) => ({ ...value, password: e.target.value }));
        }}
      />

      <button
        onClick={() => {
          onSubmitted();
        }}
        type="button"
        className="mt-8 mb-5   bg-emerald-500 p-2 rounded-xl text-white hover:bg-emerald-400"
      >
        {isLoading ? <SpinLoading /> : "สมัครสมาชิก"}
      </button>
      <Link
        to={"/login"}
        className="text-end text-blue-500 hover:text-blue-300"
      >
        เข้าสู่ระบบ
      </Link>
      <p className="text-neutral-200 text-center">
        Create By Sekkarin Singhayoo 2023{" "}
      </p>
    </main>
  );
};

export default Register;
