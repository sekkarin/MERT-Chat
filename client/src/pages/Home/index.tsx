import { useEffect, useState } from "react";

import axios from "../../apis/axios";
import { socket } from "../../socket";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { logOut } from "../../stores/slices/authSlice";

interface Users {
  _id: string;
  username: string;
}
interface Message {
  _id: string;
  text: string;
  sender: string;
  recipient: string;
  createdAt: string;
}
const Home = () => {
  const dispatcher = useAppDispatch();
  const userID = useAppSelector((state) => state.auth.id);
  const userName = useAppSelector((state) => state.auth.user);
  const [users, setUsers] = useState<Users[]>([]);
  const [message, setMessage] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [people, setPeople] = useState<string | null>(null);
  const [messageAll, setMessageAll] = useState<Message[] | null>(null);

  const signOut = async () => {
    await axios.get("/auth/logout");
    dispatcher(logOut());
  };
  const sendMessage = () => {
    if (message == "") return;

    socket.emit("chat message", {
      message,
      sender: userID,
      receiver: people,
    });
    setMessage("");
  };
  const selectChat = (id: string) => {
    setPeople(id);
  };
  useEffect(() => {
    socket.connect();
    (async () => {
      const res = await axios("/users");
      setUsers(res.data);
      console.log(res.data);
    })();
    const onConnect = () => {
      setIsConnected(true);
    };
    const onDisconnect = () => {
      setIsConnected(true);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("chat message", (value) => {
      setMessageAll((perv) => [...perv!, value]);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("chat message");
    };
  }, []);
  useEffect(() => {
    (async () => {
      if (!people) {
        return;
      }
      const res = await axios(`/messages?sender=${userID}&receiver=${people}`);
      setMessageAll(res.data);
    })();
  }, [people]);

  return (
    <>
      <header className="flex flex-row justify-between p-2 ">
        <ul className="flex flex-row gap-2">
          <li className="font-bold text-lg cursor-pointer">Chat</li>
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

      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {isConnected ? (
              <>
                <li className="text-green-500">Active</li>
                <li className="text-green-500">{userName}</li>
              </>
            ) : (
              <li className="text-red-600">Disconnect</li>
            )}
            {users.map((user) =>
              user._id != userID ? (
                <li key={user._id}>
                  <a
                    onClick={() => {
                      selectChat(user._id);
                    }}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 21"
                    >
                      <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                      <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                    </svg>
                    <span className="ms-3">{user.username}</span>
                  </a>
                </li>
              ) : null
            )}
          </ul>
        </div>
      </aside>
      {people ? (
        <>
          <div className="flex flex-col">
            {message != null &&
              messageAll?.map((message) => {
                return message.recipient == userID ? (
                  <div key={message._id} className="p-4 sm:ml-64">
                    <div className="p-4 ">
                      <div className="flex items-start gap-2.5">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={
                            "https://document360.com/wp-content/uploads/2022/01/Ultimate-guide-to-writing-instructions-for-a-user-manual-Document360.png"
                          }
                          alt="Jese image"
                        />
                        <div className="flex flex-col w-full max-w-[320px] leading-1.5">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-gray-900 ">
                              {message.recipient}
                            </span>
                            <p className="text-sm font-normal text-gray-500 ">
                              {message.createdAt}
                            </p>
                          </div>
                          <p className="text-sm font-normal py-2 text-gray-900 ">
                            {message.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div key={message._id} className="p-4 sm:ml-64">
                    <div className="p-4  dark:border-gray-700">
                      <div className="flex items-start gap-2.5 justify-end">
                        <div className="flex flex-col w-full max-w-[320px] leading-1.5 ">
                          <div className="flex items-end space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-gray-900 text-right">
                              {message.sender}
                            </span>
                            <span className="text-sm font-normal text-gray-500 ">
                              {message.createdAt}
                            </span>
                          </div>
                          <p className="text-sm font-normal py-2 text-gray-900 ">
                            {message.text}
                          </p>
                        </div>
                        <img
                          className="w-8 h-8 rounded-full"
                          src={
                            "https://document360.com/wp-content/uploads/2022/01/Ultimate-guide-to-writing-instructions-for-a-user-manual-Document360.png"
                          }
                          alt="Jese image"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className=" bottom-1">
            <div className="flex  bottom-0 left-0 w-full p-2 gap-4">
              <input
                type="search"
                id="default-search"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                className=" p-4 sm:ml-64 block w-full  ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="message"
              />
              <button
                onClick={sendMessage}
                className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Send
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mb-12">
            <div className="p-4 sm:ml-64">
              <h1>Not chat</h1>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
