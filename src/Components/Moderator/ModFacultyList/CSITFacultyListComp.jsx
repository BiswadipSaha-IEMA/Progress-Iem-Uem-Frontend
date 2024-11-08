import React from 'react'
import TableData from '../TableData/TableData'

sessionStorage.setItem('nav','/api/moderator/csit-faculty');
export const CSITFacultyListComp = () => {
  return (
    <TableData department="CS IT"/>
  )
}
