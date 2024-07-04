import axios from "axios";
import { useState } from "react";
import style from "./GetCode.module.scss";
import { notifyWarning } from "../../toasters";
import ClipLoader from "react-spinners/ClipLoader";

export default function GetCode() {
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const getCode = async () => {
    setLoading(true);
    try {
      const adress = localStorage.getItem("memberData");
      let finalAdress = "";
      if (adress) {
        finalAdress = JSON.parse(adress).email;
      }
      if (finalAdress.length) {
        const request = await axios.get(
          `http://193.19.100.32:7000/api/get-code?email=${finalAdress}`
        );
        if (request.status === 200) {
          setCode(request.data);
          localStorage.setItem("code", JSON.stringify(request.data));
        }
      } else {
        notifyWarning("Вы не указали email на предыдущем шаге");
      }
    } catch (error) {
      console.log(error);
      notifyWarning("Что-то пошло не так, попробуйте ещё раз");
    } finally {
      setLoading(false);
    }
  };

  const maskedCode =
    code.length > 0
      ? `${code.substring(0, 4)}****${code.substring(code.length - 4)}`
      : code;

  return (
    <div className={style.container}>
      <span className={style.step}>3 шаг</span>
      {loading ? (
        <ClipLoader color="#36d7b7" size={50} loading={loading} />
      ) : (
        <button onClick={getCode}>Получить код</button>
      )}
      {code.length ? (
        <span className={style.code}>Ваш код: {maskedCode}</span>
      ) : (
        <></>
      )}
    </div>
  );
}