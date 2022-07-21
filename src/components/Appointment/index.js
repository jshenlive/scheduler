import React from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss"
// import { action } from "@storybook/addon-actions";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING"
const DELETING = "DELETING"
const CONFIRM = "CONFIRM"
const EDIT = "EDIT"
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"

export default function Appointment(props) {

  // console.log("Apppointment props", props);

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(e => transition(ERROR_SAVE, true))
  }

  function cancel() {
    transition(CONFIRM);
  }

  function confirmDelete() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(e => {
        transition(ERROR_DELETE, true)
      })
  }

  function edit() {
    transition(EDIT);
  }

  return (
    <article className="appointment"  data-testid="appointment">
      <Header time={props.time} />
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />} */}

      {mode === EMPTY && <Empty onAdd={() => {
        // console.log("Clicked onAdd");

        transition(CREATE);

      }} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={cancel}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form
          //student
          interviewers={props.interviewers}
          // interviewer
          onSave={save}
          onCancel={back} />
      )}
      {mode === SAVING && (
        <Status message="Saving" />
      )}
      {mode === DELETING && (
        <Status message="Deleting" />
      )}
      {mode === CONFIRM && (
        <Confirm onCancel={back} onConfirm={confirmDelete} message="Are you sure you would like to delete?" />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment" onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not DELETE appointment" onClose={back} />
      )}


    </article>
  )
}