import { useNavigate } from "react-router-dom";

const Missing = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <section className="flex flex-1 flex-col drop-shadow-lg bg-white rounded-md p-3 mt-20 md:max-w-md md:mx-auto mx-5">
      <br />
      <p className="text-3xl font-bold text-center">อร๊ายยยยยย!! 🚫</p>
      <p className="text-center text-neutral-400 mt-2">
        ไม่มีหน้านี้ 404 ผู้เขียน ขจ ทำ
      </p>
      <br />
      <img
        onClick={() => {
          goBack();
        }}
        src="https://appmaster.io/api/_files/gLKT845SHV7cRiSsiFSDk6/download/"
      />
      <button
        className="text-blue-600 mt-3 hover:text-blue-300"
        onClick={() => {
          goBack();
        }}
      >
        กลับไป!
      </button>
    </section>
  );
};

export default Missing;
