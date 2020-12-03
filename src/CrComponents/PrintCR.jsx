import React from "react";

function PrintCR({ student }) {
  return (
    <tr>
      <td>{student.rollNo}</td>
      <td>{student.name}</td>
      <td>{student.email}</td>
      <td>
        <i className="fa fa-ban"></i>
      </td>
    </tr>
  );
}

export default PrintCR;
