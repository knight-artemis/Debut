import axios from "axios";
import { useState } from "react";
import style from "./RolesList.module.scss";

export default function RolesList() {
  const [data, setData] = useState<string[]>([]);

  async function requestRoles() {
    console.log("Попали в запрос");
    const response = await axios.get<{ roles: string[] }>(
      "http://193.19.100.32:7000/api/get-roles"
    );
    console.log("Получили ответ");
    setData(response.data.roles);
  }

  return (
    <>
      <button onClick={requestRoles}>Получить список ролей</button>
      <div className={style.list}>
        {data && data.length ? (
          data.map((el, index) => <span key={index}>{el}</span>)
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
