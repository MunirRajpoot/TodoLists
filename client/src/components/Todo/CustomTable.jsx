import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function CustomTable({ columns = [], rows = [], tableStyles = {} }) {
    return (
        <TableContainer component={Paper} sx={tableStyles.container}>
            <Table sx={{ minWidth: 650, ...tableStyles.table }} aria-label="custom table">
                {/* Table Head */}
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#2a5298" }}>
                        {columns.map((col) => (
                            <TableCell
                                key={col.field}
                                align={col.align || "left"}
                                sx={{
                                    color: "white", // ✅ White text
                                    fontWeight: "bold",
                                    ...tableStyles.headerCell
                                }}
                            >
                                {col.headerName}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                {/* Table Body */}
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                ...tableStyles.row
                            }}
                        >
                            {columns.map((col) => (
                                <TableCell
                                    key={col.field}
                                    align={col.align || "left"}
                                    sx={tableStyles.cell}
                                >
                                    {/* ✅ Support custom rendering */}
                                    {col.renderCell
                                        ? col.renderCell({ row, value: row[col.field] })
                                        : row[col.field]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
