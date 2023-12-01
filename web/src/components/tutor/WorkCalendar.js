import React from "react";
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import "./../../styles/tutorPage.css";

function createData(day, date, startTime, endTime, duration) {
  return { day, date, startTime, endTime, duration };
}

const data = [
  createData("Su", "01", "16h", "16h", "70m"),
  createData("Mo", "02", "16h", "16h", "50m"),
  createData("Tu", "03", "16h", "16h", "50m"),
  createData("We", "04", "16h", "16h", "50m"),
  createData("Th", "05", "16h", "16h", "50m"),
  createData("Fr", "06", "16h", "16h", "50m"),
  createData("Sa", "07", "16h", "16h", "50m"),
];

function WorkCalendar(props) {
  return (
    <table>
      <th>
        <tr>
          <td>--</td>
          <td>Date</td>
          <td>Start</td>
          <td>End</td>
          <td>Duration</td>
        </tr>
      </th>
      {data.map((col) => (
        <tr key={col.day}>
          <td className="dayText">{col.day}</td>
          <td className="calendarText">{col.date}</td>
          <td className="calendarText">{col.startTime}</td>
          <td className="calendarText">{col.endTime}</td>
          <td className="durationText">{col.duration}</td>
        </tr>
      ))}
    </table>
  );
}

export default WorkCalendar;
