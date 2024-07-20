import React, { useState, useEffect } from 'react';
import { PaginationContainer, PaginationButton, Table, EncabezadoTabla, BodyTable, TableCell, TableHeadText } from '../ContactComponent/ContactStyled';

interface Column<T> {
  headerColumn: string;
  columnsData?: keyof T;
  columnRenderer?: (row: T) => JSX.Element;
}

interface TableComponentProps<T> {
  columns: Column<T>[];
  data: T[];
}

export const TableComponent = <T,>({ columns, data }: TableComponentProps<T>) => {
  const pageSize = 5;

  const createPagination = (array: T[], size: number): T[][] => {
    const aux: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      aux.push(array.slice(i, i + size));
    }
    return aux;
  };

  const [num, setNum] = useState(0);
  const [pages, setPages] = useState<T[][]>(createPagination(data, pageSize));

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
        {pages[num] && pages[num].map((row, rowIndex) => (
          <BodyTable key={rowIndex}>
            <tr>
              {columns.map((col, colIndex) => (
                <TableCell key={colIndex}>
                  {col.columnRenderer 
                    ? col.columnRenderer(row) 
                    : (col.columnsData ? (row[col.columnsData] as any) : null)}
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
