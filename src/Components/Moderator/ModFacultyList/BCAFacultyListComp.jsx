import React from 'react'
import TableData from '../TableData/TableData'

sessionStorage.setItem('nav','/api/moderator/bca-faculty');
export const BCAFacultyListComp = () => {
  return (
    <TableData department="BCA"/>
  )
}
