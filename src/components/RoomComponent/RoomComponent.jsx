import React, { useState } from 'react';
import data from "../../data/Rooms.json";
import { TableContainer, TableFilters, TableButtonFilter, Table, EncabezadoTabla, BodyTable, TableCell, TableHeadText } from "../ContactComponent/ContactStyled";
import { TableComponent } from '../TableComponent/TableComponent';
import { ImageRoom, StatusButton, SelectorContainer, ButtonRoom, Selector,  } from "./RoomStyled";
import { NavLink } from 'react-router-dom';


export const RoomComponent = () => {
    const columns = [
        { headerColumn: 'Photo', columnsData: 'photo', columnRenderer: (row) => <ImageRoom src={row.photo} alt="Room Photo" /> },
        { headerColumn: 'Number', columnsData: 'number' },
        { headerColumn: 'Bed Type', columnsData: 'BedType' },
        { headerColumn: 'Amenities', columnsData: 'Amenities', columnRenderer: (row) => row.Amenities.join(', ') },
        { headerColumn: 'Rate', columnsData: 'Rate' },
        { headerColumn: 'Offer Price', columnsData: 'OfferPrice' },
        { headerColumn: 'Status', columnsData: 'Status', columnRenderer: (row) => <StatusButton status={row.Status}>{row.Status}</StatusButton> },
        { headerColumn: 'Room Floor', columnsData: 'RoomFloor' }
    ];

    const [rooms, setRooms] = useState(data);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('');

    const filterActions = {
        all: () => setRooms(data),
        available: () => setRooms(data.filter(room => room.Status === 'Available')),
        booked: () => setRooms(data.filter(room => room.Status === 'Booked')),
    };

    const handleFilterClick = (action) => {
        filterActions[action]();
    };

    const handleSortChange = (event) => {
        const sortValue = event.target.value;
        setSortOption(sortValue);
        const sortedData = [...rooms].sort((a, b) => {
            switch (sortValue) {
                case 'roomNumberAsc':
                    return a.number.localeCompare(b.number);
                case 'roomNumberDesc':
                    return b.number.localeCompare(a.number);
                case 'priceHighLow':
                    return b.OfferPrice - a.OfferPrice;
                case 'priceLowHigh':
                    return a.OfferPrice - b.OfferPrice;
                default:
                    return 0;
            }
        });
        setRooms(sortedData);
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        if (value === '') {
            setRooms(data);
        } else {
            setRooms(data.filter(room => room.number.toLowerCase().includes(value.toLowerCase())));
        }
    };

    return (
        <>
            <TableContainer>
                <TableFilters>
                    <TableButtonFilter onClick={() => handleFilterClick('all')}>All Rooms</TableButtonFilter>
                    <TableButtonFilter onClick={() => handleFilterClick('available')}>Available</TableButtonFilter>
                    <TableButtonFilter onClick={() => handleFilterClick('booked')}>Booked</TableButtonFilter>
                </TableFilters>
                <SelectorContainer>
                    <NavLink to="BookingRoom"><ButtonRoom>+ New Room</ButtonRoom></NavLink>
                    <Selector value={sortOption} onChange={handleSortChange}>
                        <option value="">Sort By</option>
                        <option value="roomNumberAsc">Room Number Ascending</option>
                        <option value="roomNumberDesc">Room Number Descending</option>
                        <option value="priceLowHigh">Price Lowest to Highest</option>
                        <option value="priceHighLow">Price Highest to Lowest</option>
                    </Selector>
                </SelectorContainer>
                <TableComponent columns={columns} data={rooms} />
            </TableContainer>
        </>
    );
};