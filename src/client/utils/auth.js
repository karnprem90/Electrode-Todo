

export class Auth {


    /**
     * Authenticate a user. Save a token string in Local Storage
     *
     * @param {string} token
     */
    static authenticateUser(token) {
        if (typeof window !== "undefined" && window.localStorage) {
            window.localStorage.setItem('token', token);
        }
    }

    /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     * @returns {boolean}
     */
    static isUserAuthenticated() {
        var local_storage = localStorage.getItem('token');
        var cookie_token = this.getCookieToken();
        if(!local_storage && !cookie_token){
            return true;
        }
        return false;

    }

    /**
     * Get a token value.
     *
     * @returns {string}
     */
    static getToken() {
        if (typeof window !== "undefined" && window.localStorage) {
             return window.localStorage.getItem('token');
        }
    }




}
export default Auth;
