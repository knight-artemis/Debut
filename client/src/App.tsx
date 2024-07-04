import { useState } from "react";
import "./App.scss";
import Card from "./components/Card/Card";
import GetCode from "./components/GetCode/GetCode";
import Header from "./components/Header/Header";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import RolesList from "./components/RolesList/RolesList";
import SetStatus from "./components/SetStatus/SetStatus";

function App() {
  const [roles, setRoles] = useState<string[]>([]);

  return (
    <>
      <Header />
      <main>
        <Card>
          <RolesList setRoles={setRoles} />
        </Card>
        <Card>
          <RegistrationForm roles={roles} />
        </Card>
        <Card>
          <GetCode />
        </Card>
        <Card>
          <SetStatus />
        </Card>
      </main>
    </>
  );
}

export default App;
