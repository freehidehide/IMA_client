
import {Product} from './product';
import {Metadata} from './metadata';
import {Error} from './error';
export interface ProductList {
    data: Product[];
    _metadata: Metadata;
    error: Error;
}
