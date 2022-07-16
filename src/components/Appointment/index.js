import React, { Fragment } from "react";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss"
import { action } from "@storybook/addon-actions";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"

export default function Appointment(props) {

  console.log("Apppointment props", props);

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />} */}

      {mode === EMPTY && <Empty onAdd={() => {
        console.log("Clicked onAdd");

        transition(CREATE);

      }} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          //student
          interviewers={props.interviewers}
          // interviewer
          onSave={action("onSave")}
          onCancel={back} />
      )}


    </article>
  )
}