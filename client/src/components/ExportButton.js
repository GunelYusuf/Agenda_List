import React, { useContext } from "react";
import { CSVLink } from "react-csv";
import GlobalContext from "../context/GlobalContext";
export default function ExportButton() {
  const { filteredEvents } = useContext(GlobalContext);
  return (
   <CSVLink data={filteredEvents}>Export</CSVLink>
  );
}
