//import React from 'react'
import qs from 'query-string'
import { useLocation } from 'react-router-dom'

export default () => {
  const { search } = useLocation()
  return qs.parse(search)
}