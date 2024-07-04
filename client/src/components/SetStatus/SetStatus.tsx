import axios from "axios";
import style from "./SetStatus.module.scss";
import { notifySuccess, notifyWarning } from "../../toasters";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function SetStatus() {
  const [loading, setLoading] = useState(false);

  const confirm = async () => {
    setLoading(true);
    const code = localStorage.getItem("code");
    let finalCode = "";
    if (code) {
      finalCode = JSON.parse(code);
    }
    const memberData = localStorage.getItem("memberData");
    let email = "";
    if (memberData) {
      email = JSON.parse(memberData).email;
    }
    if (finalCode.length && email.length) {
      try {
        const totalString = `${email}:${finalCode}`;
        const finalString = btoa(totalString);
        const request = await axios.post(
          "http://193.19.100.32:7000/api/set-status",
          {
            token: finalString,
            status: "increased",
          }
        );
        if (request.status === 200) {
          notifySuccess("Данные успешно внесены");
          localStorage.clear();
        }
      } catch (error) {
        notifyWarning("Что-то пошло не так, попробуйте ещё раз");
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      notifyWarning("Вы прошли не все предыдущие шаги");
    }
  };

  return (
    <div className={style.container}>
      <span>4 шаг</span>
      {loading ? (
        <ClipLoader color="#36d7b7" size={50} loading={loading} />
      ) : (
        <button onClick={confirm}>Подтвердить статус</button>
      )}
    </div>
  );
}
