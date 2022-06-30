import React, { useContext } from "react";
import { useCSVDownloader } from 'react-papaparse';
import GlobalContext from "../context/GlobalContext";


export default function ExportButton() {
  const { CSVDownloader, Type } = useCSVDownloader();
  const { filteredEvents } = useContext(GlobalContext);
  return (
    <CSVDownloader
      type={Type.Button}
      filename={"Events-" + new Date().toJSON().slice(0, 10)}
      bom={true}
      config={{
        delimiter: ";",
      }}
      data={filteredEvents}
      className="export"
    >
      <span className="exportName">
        <i className="material-symbols-outlined">ios_share</i>
        Export
      </span>
    </CSVDownloader>
  );
}
