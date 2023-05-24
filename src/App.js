// import logo from './logo.svg';
import "./App.css";
import AkkoNavbar from "./components/AkkoNavbar";
import Restaurants from "./components/Restaurants";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TablePage1 from "./pages/TablePage1";
import ChartPage from "./pages/ChartPage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Restaurants />
          </Route>
          <Route path="/tablePage1">
            <TablePage1 />
          </Route>
          <Route path="/chartPage">
            <ChartPage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
