import axios from "axios";
import style from "./RolesList.module.scss";
import { notifySuccess, notifyWarning } from "../../toasters";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default function RolesList({
  setRoles,
}: {
  setRoles: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [loading, setLoading] = useState(false);

  async function requestRoles() {
    setLoading(true);
    try {
      const response = await axios.get<{ roles: string[] }>(
        "http://193.19.100.32:7000/api/get-roles"
      );
      setRoles(response.data.roles);
      notifySuccess("Список ролей получен и доступен на шаге 2");
    } catch (error) {
      notifyWarning("Что-то пошло не так, попробуйте ещё раз");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={style.container}>
      <span className={style.step}>1 шаг</span>
      {loading ? (
        <ClipLoader color="#36d7b7" size={50} loading={loading} />
      ) : (
        <button onClick={requestRoles}>Получить список ролей</button>
      )}
    </div>
  );
}
