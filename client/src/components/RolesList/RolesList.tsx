import axios from "axios";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import style from "./RolesList.module.scss";

export default function RolesList() {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function requestRoles() {
    setLoading(true);
    const response = await axios.get<{ roles: string[] }>(
      "http://193.19.100.32:7000/api/get-roles"
    );
    setData(response.data.roles);
    setLoading(false);
  }

  return (
    <div className={style.container}>
      <span className={style.step}>1 шаг</span>
      <button onClick={requestRoles}>Получить список ролей</button>
      {loading ? (
        <ClipLoader color={"#000"} loading={loading} size={35} className={style.loader}/>
      ) : (
        <div className={style.list}>
          {data && data.length ? (
            data.map((el, index) => <span key={index}>{el}</span>)
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}
