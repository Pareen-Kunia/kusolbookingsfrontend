import React, { useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useDispatch, connect } from "react-redux";

const ConfirmationApp = (props) => {
  const getDate = () => {
    const date = props.appointment.selectedDate
      ? new Date(props.appointment.selectedDate)
      : new Date();
    return (
      ("0" + date.getDate()).slice(-2) +
      "/" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      date.getFullYear()
    );
  };
  return (
    <List component="nav">
      <ListItem button className="app-confirmation">
        <ListItemText
          primary={
            <div className="flex-space-around">
              <span className="width50">{"Booking Type"}</span>
              <span className="width50">
                {
                  props.appointment?.services?.filter(
                    (item) => item.id === props.appointment.selectedService
                  )[0]?.name
                }
              </span>
            </div>
          }
        />
      </ListItem>
      <ListItem button className="app-confirmation">
        <ListItemText
          primary={
            <div className="flex-space-around">
              <span className="width50">{"Trainer"}</span>
              <span className="width50">
                {
                  props.appointment?.trainers?.filter(
                    (item) => item.id === props.appointment.selectedTrainer
                  )[0]?.name
                }
              </span>
            </div>
          }
        />
      </ListItem>
      <ListItem button className="app-confirmation">
        <ListItemText
          primary={
            <div className="flex-space-around">
              <span className="width50">{"Date"}</span>
              <span className="width50">{getDate()}</span>
            </div>
          }
        />
      </ListItem>
      <ListItem button className="app-confirmation">
        <ListItemText
          primary={
            <div className="flex-space-around">
              <span className="width50">{"Selected slot"}</span>
              <span className="width50">
                {
                  props.appointment?.slots?.filter(
                    (item) => item.id === props.appointment.selectedSlot
                  )[0]?.time
                }
              </span>
            </div>
          }
        />
      </ListItem>
    </List>
  );
};

const mapStateToProps = (state) => {
  return { ...state };
};

export default connect(mapStateToProps)(ConfirmationApp);
