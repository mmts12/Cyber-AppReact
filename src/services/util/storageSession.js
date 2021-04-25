export const sesStorage = {
    saveUser, getUser, removeUSer, clear
}

function saveUser(key, value) {
    // Save data to sessionStorage
    sessionStorage.setItem(key, JSON.stringify(value));

}

function getUser(key) {
    // Get saved data from sessionStorage    
    var value = sessionStorage.getItem(key);
    if (!value) return null
    else return JSON.parse(value)
}

function removeUSer(key) {
    // Remove saved data from sessionStorage
    sessionStorage.removeItem(key);
}

function clear() {
    sessionStorage.clear();
}

