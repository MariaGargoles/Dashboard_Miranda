
import data from './Reviews.json';
import { TableContainer, TableFilters, TableButtonFilter, Table, EncabezadoTabla, BodyTable, TableCell, TableHeadText } from "./ReviewsStyled";


export const ContactMessagesComponent = () => {
    

    return (
        <>
            <TableContainer>
                <TableFilters>
                    <TableButtonFilter>All Contacts</TableButtonFilter>
                    <TableButtonFilter>Published</TableButtonFilter>
                    
                </TableFilters>
                <Table>
                    <EncabezadoTabla>
                        <tr>
                            <TableHeadText><input type="checkbox" />Order ID</TableHeadText>
                            <TableHeadText>Date</TableHeadText>
                            <TableHeadText>Name</TableHeadText>
                            <TableHeadText>Email</TableHeadText>
                            <TableHeadText>Subject</TableHeadText>
                            <TableHeadText>Comment</TableHeadText>
                        </tr>
                    </EncabezadoTabla>
                    <BodyTable>
                        {data.map(comment => (
                            <tr key={comment.id}>
                                <TableCell><input type="checkbox" />#000123456</TableCell>
                                <TableCell>{comment.date}</TableCell>
                                <TableCell>{comment.name}</TableCell>
                                <TableCell>{comment.email}</TableCell>
                                <TableCell>{comment.subject}</TableCell>
                                <TableCell>{comment.comment}</TableCell>
                            </tr>
                        ))}
                    </BodyTable>
                </Table>
            </TableContainer>
        </>
    );
};