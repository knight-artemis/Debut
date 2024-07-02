import axios from "axios";

export default function SetStatus() {
  const confirm = async () => {
    try {
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
      const totalString = `${email}:${finalCode}`;
      const finalString = btoa(totalString);
      console.log("🚀 ~ confirm ~ finalString:", finalString);
      console.log("🚀 ~ confirm ~ totalString:", totalString);
      const request = await axios.post(
        "http://193.19.100.32:7000/api/set-status",
        {
          token: finalString,
          status: "increased",
        }
      );
      if (request.status === 200) {
        console.log("Успешно внесён", request.data);
        localStorage.clear();
      }
    } catch (error) {}
  };

  return (
    <>
      <button onClick={confirm}>Подтвердить статус</button>;
    </>
  );
}
