export class AppConst {
    public static readonly SERVER_URL = {
        REGISTER: "/register",
        LOGIN: "/users/login",
        ROLE: "/role",
        USER: "/users",
        FORGETPASSWORD: "/forgot_password",
        CHANGEPASSWORD: "/change_password"
    };

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
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];

    public static readonly WEEK_DAYS = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];
}
