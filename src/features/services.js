import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch, connect } from "react-redux";
import { updateAttribute } from "../app/reducerSlice";

const Services = (props) => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(
      updateAttribute({
        name: [event.target.name],
        value: event.target.value
      })
    );
  };
  return (
    <>
      <div>
        <div className="inputContainer" style={{ width: "100%" }}>
          <TextField
            disabled
            label="Message"
            defaultValue="Your Message goes here"
            variant="outlined"
            multiline
            rows={4}
          />
        </div>
      </div>

      <div className="inputContainer">
        <TextField
          select
          name="selectedService"
          label="Select service"
          value={props.appointment.selectedService}
          onChange={handleChange}
          variant="outlined"
        >
          {props.appointment.services.map((service) => {
            return (
              <MenuItem key={service.id} value={service.id}>
                {service.name}
              </MenuItem>
            );
          })}
        </TextField>
      </div>
      <div className="inputContainer">
        <TextField
          select
          name="selectedTrainer"
          label="Select trainer"
          value={props.appointment.selectedTrainer}
          onChange={handleChange}
          variant="outlined"
        >
          {props.appointment.trainers.map((trainer) => {
            return (
              <MenuItem key={trainer.id} value={trainer.id}>
                {trainer.name}
              </MenuItem>
            );
          })}
        </TextField>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return { ...state };
};

export default connect(mapStateToProps)(Services);
