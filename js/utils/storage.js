const tokenKey = "token";
const userKey = "user";

export function saveToken(token) {
    saveToStorage(tokenKey, token);
}

export function getToken() {
    return getFromStorage(tokenKey)
}

export function saveUser(user) {
    saveToStorage(userKey, user);
}

export function getUserName() {
    const user = getFromStorage(userKey);

    if (user) {
        return user.username;
    }

    return null;
}

export function removeUser() {
    deleteFromStorage(userKey);
    deleteFromStorage(tokenKey);
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function deleteFromStorage(key) {
    localStorage.removeItem(key);
}

export function clearFromStorage() {
    localStorage();
}

function getFromStorage(key) {
    const value = localStorage.getItem(key);

    if (!value) {
        return [];
    }

    return JSON.parse(value);
}
