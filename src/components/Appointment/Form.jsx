import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
// import { action } from "@storybook/addon-actions";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset=()=>{
    setStudent("");
    setInterviewer(null);
  }

  const cancel=()=>{
    reset();
    props.onCancel();
  }

  // const save=()=>{

  // }

  // console.log("Form props",props)
  // console.log("student:",student)
  // console.log("interviewer:",interviewer)

  // console.log("Form onSave:",props.onSave)

  
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event=>event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value = {student}
            onChange = {(event)=>setStudent(event.target.value)}
          />
        </form>

        <InterviewerList
        interviewers={props.interviewers}
        value={interviewer}
        onChange={(id)=>{setInterviewer(id)}}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={()=>cancel()} >Cancel</Button>
          <Button confirm onClick={()=>props.onSave(student,interviewer)} /* your code goes here */>Save</Button>
        </section>
      </section>
    </main>
  );
}
