import React from 'react'
import TableData from '../TableData/TableData'

sessionStorage.setItem('nav','/api/moderator/be-faculty');
export const BEFacultyListComp = () => {
  return (
    <TableData department="BE"/>
  )
}
