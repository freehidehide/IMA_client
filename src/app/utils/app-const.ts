
export class AppConst {
    public static readonly NON_AUTH_SERVER_URL = {
        REGISTER: '/users/register',
        LOGIN: '/users/login',
        USER: '/users',
        FORGETPASSWORD: '/users/forgot_password',
        CHANGEPASSWORD: '/users/change_password',
        ALLCATEGORY: '/catagories',
        CONTESTANTS: '/contestants',
        HIGHEST_VOTES: '/contestants/highest_votes',
        RECENT_WINNER: '/contestants/recent_winner',
        ADVERTISEMENTS: '/advertisements',
        PRODUCTS: '/products',
        ATTACHMENTS: '/attachments',
        SETTINGS: '/settings?is_web=true',
        TRANSACTIONS: '/transactions',
        VOTEPACKAGES: '/vote_packages',
        CONTEST: '/contest'
    };

    public static readonly NON_AUTH_SERVER_URL_LIST = [
        '/users/register',
        '/users/login',
        '/users/forgot_password',
        '/change_password',
        '/catagories',
        '/contestants',
        '/products',
        '/advertisements',
        '/settings?is_web=true',
        '/contestants/highest_votes',
        '/contestants/recent_winner'
    ];

    public static readonly SERVICE_STATUS = {
        SUCCESS: 0,
        FAILED: 1
    };

    public static readonly ROLE = {
        ADMIN: 0,
        USER: 1,
        CONTESTANT: 2
    };

    public static readonly MONTH_NAMES = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    public static readonly WEEK_DAYS = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
    ];
}
