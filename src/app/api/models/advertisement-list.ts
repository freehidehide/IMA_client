
import {Advertisement} from './advertisement';
import {Metadata} from './metadata';
import {Error} from './error';
export interface AdvertisementList {
    data: Advertisement[];
    _metadata: Metadata;
    error: Error;
}
