import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const customersApi = createApi({
  reducerPath: "customers-api",
  baseQuery: fetchBaseQuery({
    baseUrl: `api/customer/`,
    prepareHeaders: (headers) => {
      headers.set("X-Requested-With", "XMLHttpRequest");
      return headers;
    }
  }),
  endpoints: (build) => ({
    getPersonDetails: build.query({
      query: (name) => `person/${name}`
    }),
    getSchedule: build.query({
      query: (name) => `schedule/${name}`
    }),
    getService: build.query({
      query: (name) => `schedule/${name}`
    }),
    getStaffs: build.query({
      query: (name) => `schedule/${name}`
    }),
    addAppointment: build.mutation({
      query: (body) => ({
        url: `posts`,
        method: "POST",
        body
      })
    })
  })
});

export default customersApi;

export const {
  useGetPersonDetailsQuery,
  useGetScheduleQuery,
  useAddAppointmentMutation
} = customersApi;
