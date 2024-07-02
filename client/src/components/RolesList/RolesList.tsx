import axios from "axios";
import { useState } from "react";

export default function RolesList() {
  const [data, setData] = useState<string[]>([]);

  async function requestRoles() {
    const response = await axios.get<{ roles: string[] }>(
      "http://193.19.100.32:7000/api/get-roles"
    );
    setData(response.data.roles);
  }

  return (
    <>
      <button onClick={requestRoles}>TestButton</button>
      {data && data.length ? (
        data.map((el, index) => <span key={index}>{el}</span>)
      ) : (
        <></>
      )}
    </>
  );
}
