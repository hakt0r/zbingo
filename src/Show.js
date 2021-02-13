
import React from 'react'
import { useSelector } from 'react-redux';

export default ({stateKey,children}) => {
  const value = useSelector( state => state[stateKey] );
  return value ? children : null;
}
