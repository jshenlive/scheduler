import React, { Fragment } from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss"
import { action } from "@storybook/addon-actions";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING"
const DELETING = "DELETING"
const CONFIRM = "CONFIRM"
const EDIT = "EDIT"

export default function Appointment(props) {

  console.log("Apppointment props", props);

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    const handle = setInterval(() => {
      props.bookInterview(props.id, interview);
      transition(SHOW);
      clearInterval(handle);
    }, 1000)

  }

  function cancel() {
    transition(CONFIRM);
  }

  function confirmDelete() {

    transition(DELETING);

    const handle = setInterval(() => {
      props.cancelInterview(props.id);
      transition(EMPTY);
      clearInterval(handle);
    }, 1000)
  }

  function edit(){
    transition(EDIT);
  }



  return (
    <article className="appointment">
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
        <Confirm onCancel={back} onConfirm={confirmDelete} message="Delete this Appointment" />
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
      {/* TODO interviewer not selected! */}


    </article>
  )
}