import { TableRow } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { TableBody } from '@material-ui/core';
import { Table } from '@material-ui/core';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Bingo = () => {
  const bingo = useSelector( state => state.bingo );
  const dispatch = useDispatch();
  return <div className="bingo container">
    <Table className="bingo">
      <TableBody>
        { bingo.map( (row,y) => <TableRow key={'row_'+y}>
          { row.map( ({name,value},x) =>
          <TableCell
          key={'cell_'+x} className={value ? 'bingo blue' : 'bingo white' }
          onClick={ e => dispatch({ type: 'bingoClick', x, y  }) }
          >{ name }</TableCell> )}
        </TableRow>)}
      </TableBody>
    </Table>
  </div>;
}

export default Bingo;
