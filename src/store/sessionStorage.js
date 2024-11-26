const saveToken = (token) => {
    sessionStorage.setItem("token", token);
};

const loadToken = () => {
    const currentJWT = sessionStorage.getItem("token")
    if (currentJWT) {
        return currentJWT;
    }
    else {
        return "";
    }
};

const clearToken = () => {
    sessionStorage.removeItem("token");
};

const saveUserID = (id) => {
    sessionStorage.setItem("userID", id);
}

const getUserID = () => {
    const id = sessionStorage.getItem("userID");
    return id;
}

export { saveToken, loadToken, clearToken, saveUserID, getUserID }