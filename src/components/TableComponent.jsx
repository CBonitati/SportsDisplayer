import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const ScoreTables = ({teamName, data, labelColor, labelFontColor}) => {

  const labelStyle = {
    backgroundColor: labelColor,
    height: "35px", // Set the desired height here
    lineHeight: "35px",
    color: labelFontColor,
    fontWeight: "bold"
  }

  const tableCellStyle = {
    height: "5px",
    lineHeight: "5px",
    maxHeight: "5px",
    fontWeight: "bold"
  }

  return (
    <Paper sx={{ width: '100%' }}>
      <div className="team-name" style={labelStyle}>{teamName}</div>
      <TableContainer sx={{ maxHeight: 450 }}>
        <Table stickyHeader aria-label="sticky table" className='table' headerHeight={70} rowHeight={30} >
          <TableHead className='table-head' sx={tableCellStyle}>
            <TableRow>
                <TableCell align="center" colSpan={1} sx={tableCellStyle} >
                    Name
                </TableCell>
                <TableCell align="center" colSpan={1} sx={tableCellStyle} >
                    Date
                </TableCell>
                <TableCell align="center" colSpan={1} sx={tableCellStyle} >
                    Time
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='table-body'>       
                    
            {data.map((game, index) => (
                <TableRow key={index} >
                    <TableCell align="center" >
                        {game.teamName}
                    </TableCell>
                    <TableCell align="center" >
                        {game.date}
                    </TableCell>
                    <TableCell align="center" >
                        {game.time}
                    </TableCell>
                </TableRow>
                        
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default ScoreTables;
