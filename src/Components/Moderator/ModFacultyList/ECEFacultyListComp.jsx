import React from 'react'
import TableData from '../TableData/TableData'

sessionStorage.setItem('nav','/api/moderator/ece-faculty');
export const ECEFacultyListComp = () => {
  return (
    <TableData department="ECE"/>
  )
}
