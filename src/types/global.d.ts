export interface User {
  _id: any;
  id: string;
  name: string;
  foto: string;
  startDate: string;
  description: string;
  email: string;
  contact: string;
  status: string;
}
  export interface Room {
    _id: any;
    photo: string;
    number: string;
    id: string;
    BedType: string;
    Amenities: string [];
    Rate: number;
    OfferPrice: number;
    Status: string; 
    RoomFloor: string;
  }

   export interface Booking {
    _id: any;
    id: string;
    Name: string;
    OrderDate: string;
    CheckIn: string;
    CheckOut: string;
    SpecialRequest: string;
    RoomType: string;
    RoomNumber: string;
    Status: string;
  }

  export interface ContactMessage {
    _id: any;
    id: number;
    date: string;
    name: string;
    email: string;
    subject: string;
    comment: string;
    action: string; 
}

export interface ColumnType<T> {
  headerColumn: string,
  columnsData: keyof T;
  columnRenderer?: (row: T) => React.ReactNode;
}

export interface UserStateStates {
  data: User[];
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
}

export interface BookingState {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  data: Booking[];
  error: string | null;
}

interface ContactState {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  data: ContactMessage[];
  error: string | null;
  message: ContactMessage | null;
}