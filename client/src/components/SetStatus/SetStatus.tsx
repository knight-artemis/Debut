import axios from "axios";
import style from "./SetStatus.module.scss";
import { notifySuccess, notifyWarning } from "../../toasters";

export default function SetStatus() {
  const confirm = async () => {
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
          console.log("Успешно внесён", request.data);
          notifySuccess("Данные успешно внесены");
          localStorage.clear();
        }
      } catch (error) {
        notifyWarning("Что-то пошло не так, попробуйте ещё раз");
        console.log(error);
      }
    } else {
      notifyWarning("Вы прошли не все предыдущие шаги");
    }
  };

  return (
    <div className={style.container}>
      <span>4 шаг</span>
      <button onClick={confirm}>Подтвердить статус</button>
    </div>
  );
}
