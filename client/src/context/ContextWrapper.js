import React, { useState, useEffect, useReducer, useMemo } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import httpAgent from '../api/httpAgent';


export default function ContextWrapper(props) {
function initEvents() {
   httpAgent.Agenda.getAllEvents().then(res => {
     localStorage.setItem("savedEvents", JSON.stringify(res));
   })
 const storageEvents = localStorage.getItem("savedEvents");
 const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
 return parsedEvents;
}

  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [loading, setLoading] = useState(true);
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  function savedEventsReducer(state, { type, payload }) {
    switch (type) {
      case "push":
        var found = state.find((e) => e.id === payload.id)
        if(found === undefined)
        return [...state, payload]
      case "update":
        return state.map((evt) => (evt.id === payload.id ? payload : evt));
      case "delete":
       
        return state.filter((evt) => evt.id !== payload.id);
      default:
        throw new Error();
    }
  }

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [savedEvents, labels]);

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map((evt) => evt.label))].map((label) => {
        const currentLabel = prevLabels.find((lbl) => lbl.label === label);
        return {
          label,
          checked: currentLabel ? currentLabel.checked : true,
        };
      });
    });
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  function updateLabel(label) {
    setLabels(labels.map((lbl) => (lbl.label === label.label ? label : lbl)));
  }

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        setLabels,
        labels,
        updateLabel,
        filteredEvents,
        loading,
        setLoading,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
