import React from 'react'
import TableData from '../TableData/TableData'

sessionStorage.setItem('nav','/api/moderator/cse-faculty');
export const CSEFacultyListComp = () => {
  return (
    <TableData department="CSE"/>
  )
}

