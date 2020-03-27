/** @format */

import {Detail} from './detail';
import {Color} from './color';
import {User} from './user';
export interface Product {
	id: number;
	user_id: number;
	name: string;
	description: string;
	price: number;
	user: User;
	details: Detail[];
	colors: Color[];
}
