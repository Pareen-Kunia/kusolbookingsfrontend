import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerDetails: {
    name: "XXXX"
  },
  trainers: [
    {
      id: 1,
      name: "Trainer 1"
    },
    {
      id: 2,
      name: "Trainer 2"
    }
  ],
  services: [
    {
      id: 1,
      name: "Gym"
    },
    {
      id: 2,
      name: "Yoga"
    }
  ],
  slots: [
    { status: "booked", time: "09.00", id: 1 },
    { status: "booked", time: "10.00", id: 2 },
    { status: "booked", time: "11.00", id: 3 },
    { status: "available", time: "12.00", id: 4 },
    { status: "available", time: "13.00", id: 5 }
  ],
  selectedTrainer: "",
  selectedService: "2",
  selectedSlot: "",
  selectedDate: ""
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    updateAttribute(state, action) {
      state[action.payload.name] = action.payload.value;
    }
  }
});

export const { updateAttribute } = appointmentSlice.actions;
export default appointmentSlice;
