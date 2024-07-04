import "./App.scss";
import Card from "./components/Card/Card";
import GetCode from "./components/GetCode/GetCode";
import Header from "./components/Header/Header";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import RolesList from "./components/RolesList/RolesList";
import SetStatus from "./components/SetStatus/SetStatus";

function App() {
  return (
    <>
      <Header />
      <main>
        <Card>
          <RolesList />
        </Card>
        <Card>
          <RegistrationForm />
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
