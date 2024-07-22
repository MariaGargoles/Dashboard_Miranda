export interface User {
  id: string;
  name: string;
  foto: string;
  startDate: string;
  description: string;
  email: string;
  contact: string;
  status: 'ACTIVE' | 'INACTIVE';
}
  export interface Room {
    photo: string;
    number: string;
    id: string;
    BedType: string;
    Amenities: string [];
    Rate: number;
    OfferPrice: number;
    Status: 'Available' | 'Unavailable'; 
    RoomFloor: string;
  }

   export interface Booking {
    id: string;
    Name: string;
    OrderDate: string;
    CheckIn: string;
    CheckOut: string;
    SpecialRequest: string;
    RoomType: string;
    RoomNumber: string;
    Status: 'Check In' | 'Check Out' | 'In Progress';
  }

  export interface ContactMessage {
    id: number;
    date: string;
    name: string;
    email: string;
    subject: string;
    comment: string;
    action: 'publish' | 'archived'; 
}

export interface ColumnType {
  headerColumn: string,
  columnsData: keyof T;
  columnRenderer?: (row: T) => React.ReactNode;
}