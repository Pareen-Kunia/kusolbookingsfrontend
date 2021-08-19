import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector, connect } from "react-redux";
import { updateAttribute } from "../app/reducerSlice";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import IconButton from "@material-ui/core/IconButton";
import { store } from "../app/store";

const AppointmentApp = (props) => {
  const dispatch = useDispatch();

  const handleDateChange = (date) => {
    dispatch(
      updateAttribute({
        name: "selectedDate",
        value: date
      })
    );
  };

  const setDate = (newDate) => {
    const date = new Date(newDate) || new Date();
    dispatch(
      updateAttribute({
        name: "selectedDate",
        value:
          date.getFullYear() +
          "-" +
          ("0" + (date.getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + date.getDate()).slice(-2)
      })
    );
  };

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

  const getPreviousNextDate = (action) => {
    const currentDayInMilli = props.appointment.selectedDate
      ? new Date(props.appointment.selectedDate).getTime()
      : new Date().getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const previousDayInMilli =
      action === "prev"
        ? currentDayInMilli - oneDay
        : currentDayInMilli + oneDay;
    setDate(previousDayInMilli);
  };

  const json = [
    { status: "booked", time: "09.00", id: 1 },
    { status: "booked", time: "10.00", id: 2 },
    { status: "booked", time: "11.00", id: 3 },
    { status: "available", time: "12.00", id: 4 },
    { status: "available", time: "13.00", id: 5 }
    //{ status: "booked", time: "14.00", id: 6 },
    //{ status: "booked", time: "15.00", id: 7 },
    //{ status: "booked", time: "16.00", id: 8 }
  ];
  return (
    <div style={{ padding: "0 15px 0" }}>
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            label="Select appointment date"
            format="dd/MM/yyyy"
            value={
              props.appointment.selectedDate
                ? new Date(props.appointment.selectedDate)
                : new Date()
            }
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
      <div>
        <List component="nav">
          <ListItem button divider>
            <ListItemText
              primary={
                <div className="appointment-date-group">
                  <IconButton
                    aria-label="previous"
                    disabled={
                      props.appointment.selectedDate
                        ? !(
                            new Date(props.appointment.selectedDate) >=
                            new Date()
                          )
                        : true
                    }
                    onClick={() => {
                      const CurrentDate = new Date();
                      const GivenDate = props.appointment.selectedDate
                        ? new Date(props.appointment.selectedDate)
                        : new Date();

                      if (GivenDate >= CurrentDate) {
                        getPreviousNextDate("prev");
                      }
                    }}
                  >
                    <NavigateBeforeIcon fontSize="large" />
                  </IconButton>
                  <span>{getDate()}</span>
                  <IconButton
                    aria-label="next"
                    onClick={() => {
                      getPreviousNextDate("next");
                    }}
                  >
                    <NavigateNextIcon fontSize="large" />
                  </IconButton>
                </div>
              }
            />
          </ListItem>

          {props.appointment?.slots.map((item) => (
            <ListItem button divider key={item.id}>
              <ListItemText
                primary={
                  <div className="flex-space-around">
                    <span style={{ width: "30%" }}>{item.time}</span>
                    <span style={{ width: "70%" }}>
                      {item.status === "available" ? (
                        <Button
                          style={{
                            width: "110px",
                            background:
                              item.id === props.appointment.selectedSlot
                                ? "green"
                                : "#80773d",
                            color: "#fff"
                          }}
                          onClick={() => {
                            dispatch(
                              updateAttribute({
                                name: "selectedSlot",
                                value: item.id
                              })
                            );
                          }}
                        >
                          {item.id === props.appointment.selectedSlot
                            ? "SELECTED"
                            : "BOOK NOW"}
                        </Button>
                      ) : item.status === "booked" ? (
                        "Not Available"
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                }
              />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { ...state };
};

export default connect(mapStateToProps)(AppointmentApp);
