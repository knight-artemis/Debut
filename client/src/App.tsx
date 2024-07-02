import "./App.css";
import GetCode from "./components/GetCode/GetCode";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import RolesList from "./components/RolesList/RolesList";
import SetStatus from "./components/SetStatus/SetStatus";

function App() {
  return (
    <>
      <RolesList />
      <RegistrationForm />
      <GetCode />
      <SetStatus />
    </>
  );
}

export default App;
