import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";
import ExportButton from "./ExportButton";
import ImportButton from "./ImportButton";
export default function Sidebar() {
  return (
    <aside className="border p-5 w-64">
      <CreateEventButton />
      <ExportButton/>
      <ImportButton/>
      <SmallCalendar />
      <Labels />
    </aside>
  );
}
