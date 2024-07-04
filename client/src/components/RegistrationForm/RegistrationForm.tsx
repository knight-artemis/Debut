import axios from "axios";
import { useState } from "react";
import style from "./RegistrationForm.module.scss";
import { notifySuccess, notifyWarning } from "../../toasters";
import ClipLoader from "react-spinners/ClipLoader";

export default function RegistrationForm({ roles }: { roles: string[] }) {
  const initialState = { last_name: "", first_name: "", email: "", role: "" };
  const [inputs, setInputs] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const registration = async () => {
    if (
      inputs.last_name.length &&
      inputs.first_name.length &&
      inputs.email.length &&
      inputs.role.length
    ) {
      setLoading(true);
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
      } finally {
        setLoading(false);
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
      <select onChange={changeHandler} name="role" value={inputs.role} required>
        <option value="">Выберите роль</option>
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      {loading ? (
        <ClipLoader color="#36d7b7" size={50} loading={loading} />
      ) : (
        <button type="button" onClick={registration}>
          Записаться в кандидаты
        </button>
      )}
    </form>
  );
}