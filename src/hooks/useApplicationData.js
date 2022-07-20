import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [], //array of objects including id, name, appt, interv, spots
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers")
    ])
      .then((all) => {
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }));
        // setInterviewer((prev)=>({...prev, all[2].data}));
      });

  }, [])

  const updateSpots = function (state, appointments, id) {

    const updatedDays = [...state.days].map(a => { return { ...a } });

    //takes in id only for cancel interview
    if (id) {
      updatedDays.map((updated) =>
        updated.appointments.includes(id) ? updated.spots++ : updated.spots
      )
    } else {
      //else it will be for booking
      for (const day of updatedDays) {
        let spots = 0;
        if (appointments) {
          for (const aptID of day.appointments) {
            if (!appointments[aptID].interview) {
              spots++;
            }
          }
          updatedDays.map((updated) =>
            updated === day ? updated.spots = spots : day
          )
        }
      }
    }

    return updatedDays
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return (axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
    ).then(() => {
      const days = updateSpots(state, appointments);
      setState({ ...state, appointments, days });
    })
  }

  function cancelInterview(id) {
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        const days = updateSpots(state, false, id)
        setState({ ...state, days });
      })
  }

  return { state, setDay, bookInterview, cancelInterview }
}