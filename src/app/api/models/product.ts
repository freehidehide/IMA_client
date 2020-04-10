
import { Detail } from './detail';
import { Color } from './color';
import { User } from './user';
import { Attachment } from './attachment';
export interface Product {
    id: number;
    user_id: number;
    name: string;
    description: string;
    price: number;
    user: User;
    details: Detail[];
    colors: Color[];
    showDetail?: Detail;
}
