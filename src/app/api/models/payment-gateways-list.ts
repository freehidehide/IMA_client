
import { Attachment } from './attachment';
import { Error } from './error';
export interface PaymentGatewaysList {
    id: number;
    name: string;
    attachment: Attachment;
    error: Error;
}
