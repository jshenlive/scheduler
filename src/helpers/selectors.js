export function getAppointmentsForDay(state, day) {
  if (state && day) {
    for (let ele of state.days) {
      if (ele.name === day) {
        return ele.appointments.map((int) => {
          return state.appointments[int];
        })
      }
    }
  }
  return []

}

export function getInterview(state, interview) {
  if (state && interview) {
    if (state.interviewers[interview.interviewer]) {
      return {
        student: interview.student, interviewer: {
          ...state.interviewers[interview.interviewer]
        }
      }
    }
  }
  return null
}

export function getInterviewersForDay(state, day) {
  if (state && day) {
    for (let ele of state.days) {
      if (ele.name === day) {
        return ele.interviewers.map((int) => {
          return state.interviewers[int];
        })
      }
    }
  }
  return []
}