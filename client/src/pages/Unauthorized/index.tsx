import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-1 flex-col drop-shadow-lg bg-white rounded-md p-3 mt-20 md:max-w-md md:mx-auto mx-5">
      <br />
      <p className="text-3xl font-bold text-center">แกไม่มีสิทธิ์!! 🫵</p>
      <p className="text-center text-neutral-400 mt-2">ไม่มีสิทธิ์ในการเข้าถึงหน้านี้</p>
      <br />
      <img
        src="https://media.tenor.com/Cpe0tHMQNr0AAAAC/%E0%B9%81%E0%B8%81%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%A1%E0%B8%B5%E0%B8%AA%E0%B8%B4%E0%B8%97%E0%B8%98%E0%B8%B4%E0%B9%8C-%E0%B8%95%E0%B8%B1%E0%B9%8A%E0%B8%81.gif"
        
      />
      <button
      className="text-blue-600 mt-3 hover:text-blue-300"
        onClick={() => {
          navigate('/login');
        }}
      >
        เข้าสู่ระบบ
      </button>
      <button
      className="text-blue-600 mt-3 hover:text-blue-300"
        onClick={() => {
          navigate('/');
        }}
      >
        กลับไป!
      </button>
    </section>
  );
};

export default Unauthorized;
