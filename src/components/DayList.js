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
        selected = {day.name === props.value}
        setDay = {props.onChange}
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