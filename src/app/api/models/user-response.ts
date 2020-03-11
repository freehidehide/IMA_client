import { ServiceResponse } from './service-response';
import { Role } from './role';
export class UserResponse extends ServiceResponse {
    id: string;
    access_token: string;
    expires_in: string;
    token_type: string;
    scope: string;
    refresh_token: string;
    username: string;
    first_name: string;
    last_name: string;
    votes: number;
    rank: number;
    instagram_url: string;
    tiktok_url: boolean;
    youtube_url: string;
    twitter_url: string;
    facebook_url: string;
    is_paypal_connect: number;
    is_stripe_connect: number;
    subscription_end_date: string;
    role: Role; 
}
