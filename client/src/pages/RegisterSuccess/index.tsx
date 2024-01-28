import { Link } from "react-router-dom";


const RegisterSuccess = () => {

  return (
    <main className="flex  justify-center  align-middle  flex-col">
      <h6 className="text-center mt-64 text-5xl font-light font-sans text-current ">
        คุณสมัครสำเร็จ
        <br />
        🎉🎉
      </h6>
      <Link
        to={"/login"}
        className="mt-8 mb-5 bg-emerald-500 p-2 rounded-xl text-white hover:bg-emerald-400 text-center mx-28"
      >
        เข้าสู่ระบบ
      </Link>
    </main>
  );
};

export default RegisterSuccess;
