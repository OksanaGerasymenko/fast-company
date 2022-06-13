const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";

export function setToken({ idToken, refreshToken, expiresIn = 3600 }) {
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresIn);
};

export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
};

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
};

export function getTokenExpiresData() {
    return localStorage.getItem(EXPIRES_KEY);
};

const localStorageService = {
    setToken,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresData
};
export default localStorageService;
