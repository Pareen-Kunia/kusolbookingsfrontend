import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Step from "@material-ui/core/Step";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: "15px",
    padding: 0
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
    textAlign: "right",
    marginTop: theme.spacing(2)
  }
}));

const StepperApp = (props) => {
  useEffect(() => {
    setactiveStep(props.index);
  }, []);

  const [allSteps, setallSteps] = React.useState([
    {
      name: "1",
      next: "appointment"
    },

    {
      name: "2",
      next: "confirm",
      prev: ""
    },
    {
      name: "3",
      prev: "appointment",
      next: ""
    }
  ]);

  const classes = useStyles();

  const [activeStep, setactiveStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep < allSteps.length - 1) {
      setactiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setactiveStep(activeStep - 1);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {allSteps &&
          allSteps.map((label, index) => (
            <Step key={label.name}>
              <StepLabel></StepLabel>
              <StepContent>
                <List component="nav">
                  <ListItem button className="app-confirmation">
                    <ListItemText
                      primary={`Booking for ${props.appointment?.customerDetails?.name}`}
                    />
                  </ListItem>
                </List>
                <div>{props.children}</div>
                <div className={classes.actionsContainer}>
                  {index >= 0 && (
                    <div>
                      <Button
                        variant="contained"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.button}
                      >
                        <Link to={`/${label.prev}`}>Back</Link>
                      </Button>
                      {index >= 0 && (
                        <React.Fragment>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                          >
                            {activeStep === allSteps.length - 1 ? (
                              <Link>Submit</Link>
                            ) : (
                              <Link to={`/${label.next}`}>Next</Link>
                            )}
                          </Button>
                        </React.Fragment>
                      )}
                    </div>
                  )}
                </div>
              </StepContent>
            </Step>
          ))}
      </Stepper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { ...state };
};

export default connect(mapStateToProps)(StepperApp);
