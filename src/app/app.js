import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import useToScrollOnHistoryChange from "../shared/useToScrollOnHistoryChange";
import StepperApp from "../features/stepper";
import Appointment from "../features/appointments";
import Confirmation from "../features/confirmation";
import Services from "../features/services";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const App = () => {
  useToScrollOnHistoryChange();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Container maxWidth="sm">
            <Typography variant="h6" style={{ paddingLeft: "25px" }}>
              Book your appointment
            </Typography>
          </Container>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Switch>
          <Route exact path="/">
            <StepperApp index={0} path="">
              <Services />
            </StepperApp>
          </Route>
          <Route exact path="/appointment/">
            <StepperApp index={1} path="appointment">
              <Appointment />
            </StepperApp>
          </Route>
          <Route exact path="/confirm/">
            <StepperApp index={2} path="confirm">
              <Confirmation />
            </StepperApp>
          </Route>
        </Switch>
      </Container>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
