import axios from "axios";
import { useEffect, useState } from "react";

export default function RegistrationForm() {
  const initialState = { last_name: "", first_name: "", email: "", role: "" };

  const [inputs, setInputs] = useState(initialState);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const registration = async () => {
    try {
      console.log(inputs, 'у меня срабатывает только вот это');
      const newMember = await axios.post(
        "http://193.19.100.32:7000/api/sign-up",
        inputs
      );
      console.log('а вот это уже не срабатывает');
      localStorage.setItem("memberData", JSON.stringify(inputs));
      if (newMember.status === 200) {
        console.log("Успешная регистрация");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form>
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
