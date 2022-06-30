import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import AddIcon from "@material-ui/icons/Add";
export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="border p-2 mb-3 rounded-full flex items-center shadow-md hover:shadow-2xl"
    >
      <AddIcon />

      <span className="pl-3 pr-7"> Create</span>
    </button>
  );
}
