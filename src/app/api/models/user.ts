/** @format */

import {ServiceResponse} from './service-response'
import {Role} from './role'
import {Attachment} from './attachment'
import {Error} from './error'
import {Address} from './address'
export class User extends ServiceResponse {
	access_token: string
	expires_in: number
	token_type: string
	scope: string
	refresh_token: string
	id: number
	username: string
	email: string
	mobile?: any
	first_name: string
	last_name: string
	votes: number
	instagram_url?: any
	tiktok_url?: any
	youtube_url?: any
	twitter_url?: any
	facebook_url?: any
	is_paypal_connect: number
	is_stripe_connect: number
	subscription_end_date: string
	device_details?: any
	attachment: Attachment
	role: Role
	address: Address
	cart_count: number
	error: Error
}
