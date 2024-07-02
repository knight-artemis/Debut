import axios from "axios";
import { useState } from "react";

export default function GetCode() {
  const [code, setCode] = useState<string>("");

  const getCode = async () => {
    try {
      const adress = localStorage.getItem("memberData");
      let finalAdress = "";
      if (adress) {
        finalAdress = JSON.parse(adress).email;
      }
      const request = await axios.get(
        `http://193.19.100.32:7000/api/get-code?email=${finalAdress}`
      );
      if (request.status === 200) {
        console.log("Код получен", request.data);
        setCode(request.data);
        localStorage.setItem("code", JSON.stringify(request.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={getCode}>Получить код</button>
      <span>{code}</span>
    </>
  );
}
