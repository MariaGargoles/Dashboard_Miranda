import { PaginationContainer, PaginationButton, Table, EncabezadoTabla, BodyTable, TableCell, TableHeadText } from "../ContactComponent/ContactStyled";
import { useState, useEffect } from "react";


interface Column {
  headerColumn: string;
  columnsData: string;
  columnRenderer?: (row: Data) => JSX.Element;
}

interface Data {
  id: number;
  [key: string]: any;
}

interface TableComponentProps {
  columns: Column[];
  data: Data[];
}

export const TableComponent: React.FC<TableComponentProps> = ({ columns, data }) => {
    const pageSize = 5;

    
    const createPagination = <T,>(array: T[], size: number): T[][] => {
        const aux: T[][] = [];
        for (let i = 0; i < array.length; i += size) {
            aux.push(array.slice(i, i + size));
        }
        return aux;
    };

    const [num, setNum] = useState(0);
    const [pages, setPages] = useState<Data[][]>(createPagination(data, pageSize));


    const handlePrev = () => {
        if (num > 0) {
            setNum(num - 1);
        }
    };

   
    const handleNext = () => {
        if (num + 1 < pages.length) {
            setNum(num + 1);
        }
    };

    useEffect(() => {
        setPages(createPagination(data, pageSize));
        setNum(0); 
    }, [data]);

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
                {pages[num] && pages[num].map((row) => (
                    <BodyTable key={row.id}>
                        <tr>
                            {columns.map((col, colIndex) => (
                                <TableCell key={colIndex}>
                                    {col.columnRenderer ? col.columnRenderer(row) : row[col.columnsData]}
                                </TableCell>
                            ))}
                        </tr>
                    </BodyTable>
                ))}
            </Table>
            <PaginationContainer>
                <PaginationButton onClick={handlePrev} disabled={num === 0}>Prev</PaginationButton>
                <PaginationButton onClick={handleNext} disabled={num + 1 >= pages.length}>Next</PaginationButton>
            </PaginationContainer>
        </>
    );
};