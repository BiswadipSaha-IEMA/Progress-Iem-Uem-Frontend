import React from 'react'
import TableData from '../TableData/TableData'

sessionStorage.setItem('nav','/api/moderator/cseiot-faculty');
function CSEIOTFacultyListComp() {
  return (
    <TableData department="CSE (IOT)"/>
  )
}

export default CSEIOTFacultyListComp