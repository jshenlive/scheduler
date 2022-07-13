import React from "react";
import classNames from "classnames";
import DayListItem from "./DayListItem";

// import "components/DayList.scss";

export default function DayList(props) {

  const days = props.days.map((day)=>{
    return(
      <DayListItem 
        key = {day.id}
        name = {day.name}
        spots = {day.spots}
        selected = {day.name === props.day}
        setDay = {props.setDay}
      />
    )
  })

  console.log()

  return (
    <ul>
      {days}
    </ul>
  )
};