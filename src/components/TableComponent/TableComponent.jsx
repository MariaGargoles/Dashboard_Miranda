import { TableContainer, TableFilters, TableButtonFilter, Table, EncabezadoTabla, BodyTable, TableCell, TableHeadText } from "../ContactComponent/ContactStyled"

export const TableComponent = ({columns, data}) => {

    
    return (
        <>
            <Table>
                <EncabezadoTabla>
                    <tr>
                        {columns.map((column, index) => (
                            <TableHeadText key={index}>{column.headerColumn}</TableHeadText>
                        ))}
                    </tr>
                </EncabezadoTabla>
                {data.map((row) => (
                    <BodyTable key={row.id}>
                        <tr >
                            {columns.map((col, colIndex) => (
                                <TableCell key={colIndex}>
                                    {col.columnRenderer ? col.columnRenderer(row) : row[col.columnsData]}
                                </TableCell>
                            ))}
                        </tr>
                    </BodyTable>
                ))}
            </Table>
        </>
    )
}