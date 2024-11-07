import React from 'react'
import TableData from '../TableData/TableData'

sessionStorage.setItem('nav','/api/moderator/cseaiml-faculty');
function CSEAIMLFacultyListComp() {
  return (
    <TableData department="CSE (AI/ML)"/>
  )
}

export default CSEAIMLFacultyListComp