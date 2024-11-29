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

const saveClientCreated = (state) => {
    sessionStorage.setItem("clientCreated", state);
}

const getUserID = () => {
    const id = sessionStorage.getItem("userID");
    return id;
}

const getClientCreated = () => {
    const state = sessionStorage.getItem("clientCreated");
    return state;
}

const saveBudgetID = (id) => {
    sessionStorage.setItem("budgetID", id);
}

const clearBudgetID = () => {
    sessionStorage.removeItem("budgetID");
}

const getBudgetID = () => {
    const id = sessionStorage.getItem("budgetID");
    return id;
}

export { saveToken, loadToken, clearToken, saveUserID, getUserID, saveBudgetID, clearBudgetID, getBudgetID, saveClientCreated, getClientCreated }