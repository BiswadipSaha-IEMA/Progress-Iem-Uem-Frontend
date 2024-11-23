import React from 'react'
import TableData from '../TableData/TableData'

sessionStorage.setItem('nav','/api/moderator/mca-faculty');
export const MCAFacultyListComp = () => {
  return (
    <TableData department="MCA"/>
  )
}
