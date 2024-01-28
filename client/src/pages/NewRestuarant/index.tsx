import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Restaurant } from "../../interfaces/Restaurant";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useAppDispatch } from "../../hooks/useStore";
import { logOut } from "../../stores/slices/authSlice";
import SpinLoading from "../../components/SpinLoading";

const NewRestaurant = () => {
  const navigation = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [restaurant, setRestaurant] = useState<Restaurant>();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatcher = useAppDispatch();

  const signOut = async () => {
    dispatcher(logOut());
    await axiosPrivate.get("/auth/logout");
  };

  const handleOnSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await axiosPrivate.post(`/restaurants/`, {
        name: restaurant?.name,
        type: restaurant?.type,
        imageUrl: restaurant?.imageUrl,
      });

      if (res.status) {
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className="flex flex-row justify-between p-2">
        <ul className="flex flex-row gap-2">
          <li
            className="font-bold text-lg cursor-pointer"
            onClick={() => {
              navigation("/");
            }}
          >
            KEN FOOD
          </li>
          <li>
            <button
              // onClick={signOut}
              className="bg-green-400 p-1 rounded-md text-white ml-5 hover:bg-green-300"
            >
              เพิ่มรายการ
            </button>
          </li>
          {/* <li>3</li> */}
        </ul>
        <div className="">
          <button
            onClick={signOut}
            className="bg-yellow-400 p-2 rounded-md text-white hover:bg-yellow-200"
          >
            logout
          </button>
        </div>
      </header>
      {open && (
        <div
          className="bg-green-400 border  text-black px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Hey! New menu!</strong>

          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              onClick={() => {
                setOpen(false);
              }}
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
      <section>
        <div className="flex flex-row mt-[10%] w-4/5 mx-auto   gap-3">
          <div className="">
            <img
              src={restaurant?.imageUrl}
              className="rounded-lg"
              width={350}
              height={350}
            />
          </div>
          <div className="p-2 flex-1">
            <div className="mb-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                อาหาร
              </label>
              <input
                value={restaurant?.name}
                type="text"
                id="name"
                className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="name@flowbite.com"
                onChange={(e) => {
                  setRestaurant((prev) => ({ ...prev, name: e.target.value }));
                }}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="type"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                ประเภท
              </label>
              <input
                value={restaurant?.type}
                type="text"
                id="type"
                onChange={(e) => {
                  setRestaurant((prev) => ({ ...prev, type: e.target.value }));
                }}
                className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="type"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                รูปภาพประกอบ
              </label>
              <input
                value={restaurant?.imageUrl}
                type="text"
                id="type"
                onChange={(e) => {
                  setRestaurant((prev) => ({
                    ...prev,
                    imageUrl: e.target.value,
                  }));
                }}
                className="bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
            </div>
        
            <button
              type="submit"
              onClick={() => {
                handleOnSubmit();
              }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isLoading ? <SpinLoading /> : "อัพเดตรายการ"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewRestaurant;
