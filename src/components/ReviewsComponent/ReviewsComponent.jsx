import { useState, useEffect } from "react"
import data from './Reviews.json';
import { TableContainer, TableFilters, TableButtonFilter } from "./ReviewsStyled";


export const ContactMessagesComponent = () => {
    return (
        <>
            <TableContainer>
                <TableFilters>
                    <TableButtonFilter>All Contacts</TableButtonFilter>
                    <TableButtonFilter>Published</TableButtonFilter>
                    
                </TableFilters>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Subject</th>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(comment => (
                            <tr key={comment.id}>
                                <td>{comment.date}</td>
                                <td>{comment.name}</td>
                                <td>{comment.email}</td>
                                <td>{comment.subject}</td>
                                <td>{comment.comment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </TableContainer>
        </>
    );
};
