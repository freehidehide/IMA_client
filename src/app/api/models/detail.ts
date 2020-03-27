/** @format */

import {Attachment} from './attachment';
import {ProductSize} from './product-size';
export interface Detail {
	id: number;
	product_id: number;
	product_color_id: number;
	attachments: Attachment[];
	sizes: ProductSize[];
}
