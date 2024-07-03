import axios from "axios";
import { useState } from "react";
import style from "./RegistrationForm.module.scss";
import { notifySuccess, notifyWarning } from "../../toasters";

export default function RegistrationForm() {
  const initialState = { last_name: "", first_name: "", email: "", role: "" };

  const [inputs, setInputs] = useState(initialState);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const registration = async () => {
    if (
      inputs.last_name.length &&
      inputs.first_name.length &&
      inputs.email.length &&
      inputs.role.length
    ) {
      try {
        const newMember = await axios.post(
          "http://193.19.100.32:7000/api/sign-up",
          inputs
        );
        localStorage.setItem("memberData", JSON.stringify(inputs));
        if (newMember.status === 200) {
          notifySuccess("Регистрация прошла успешно");
        }
      } catch (error) {
        console.log(error);
        notifyWarning("Что-то пошол не так, попробуйте ещё раз");
      }
    } else {
      notifyWarning("Заполните все поля");
    }
  };

  return (
    <form className={style.regForm}>
      <span>2 шаг</span>
      <input
        type="text"
        placeholder="Фамилия"
        onChange={changeHandler}
        name="last_name"
        value={inputs.last_name}
        required
      />
      <input
        type="text"
        placeholder="Имя"
        onChange={changeHandler}
        name="first_name"
        value={inputs.first_name}
        required
      />
      <input
        type="email"
        placeholder="Email"
        onChange={changeHandler}
        name="email"
        value={inputs.email}
        required
      />
      <input
        type="text"
        placeholder="Роль"
        onChange={changeHandler}
        name="role"
        value={inputs.role}
        required
      />
      <button type="button" onClick={registration}>
        Записаться в кандидаты
      </button>
    </form>
  );
}
