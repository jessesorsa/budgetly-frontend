import { loadToken } from "../store/sessionStorage";

const backendURL = "https://e7ec9c2btrial-dev-budgetly-srv.cfapps.us10-001.hana.ondemand.com/rest/budgetly/v1";
const loginURL = "https://e7ec9c2btrial-dev-budgetly-srv.cfapps.us10-001.hana.ondemand.com";

const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    // Perform the SHA-256 hash
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    // Convert the hash to a hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return hashHex;
};

/*
get plan data by userid
create plan
get monthly data by planID
create month in plan
*/

const testApi = async () => {
    console.log("fetch");
    const response = await fetch(`${backendURL}/test`, {
        method: 'GET',
        mode: 'no-cors',
    });
    console.log(response)
    const res = await response.json();
    return res;
}

const signUp = async (firstName, lastName, email, password) => {

    const hashedPassword = await hashPassword(password);
    console.log(password);
    console.log(hashedPassword);

    const body = { "FirstName": firstName, "LastName": lastName, "Email": email, "Password": hashedPassword }
    console.log(body);

    const response = await fetch(`${loginURL}/signUp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    console.log(response);
    const res = await response.json();
    console.log(res);
    return res;
}

const login = async (email, password) => {

    const hashedPassword = await hashPassword(password);

    const body = { "Email": email, "Password": hashedPassword }
    console.log(body);

    const response = await fetch(`${loginURL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    const res = await response.json();
    console.log(res);
    return res;
}

const getPlan = async (user_uuid) => {
    let res;
    try {
        const response = await fetch(`${backendURL}/budgetPlan/${user_uuid}`);
        res = await response.json();
    } catch (error) {
        res = "hello";
    }
    return res;
}

const createPlan = async (startDate, endDate, userID) => {

    const token = loadToken();
    console.log("creating plan");
    console.log(token)

    const budget = {
        "createdBy": userID,
        "modifiedBy": userID,
        "name": "name",
        "description": "desc",
        "customerID": userID
    }

    console.log(budget);

    const budget_plan = await fetch(`${backendURL}/budgetPlan`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(budget)
    });

    const budgetPlan = await budget_plan.json();
    console.log("res1", budgetPlan);

    const plan = {
        "creator": userID,
        "BudgetPlanID": budgetPlan.id,
        "startDate": startDate,
        "endDate": endDate
    }

    const response = await fetch(`${backendURL}/monthlyPlan`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(plan)
    });
    const res = await response.json();


    console.log("res", res);
    return res;
}

const getMonth = async (month_id) => {
    let res;
    try {
        const response = await fetch(`${backendURL}/month/${month_id}`);
        res = await response.json();
    } catch (error) {
        res = "hello";
    }
    return res;
};


const getMonths = async (plan_id) => {
    const response = await fetch(`${backendURL}/monthlyPlan/${plan_id}`);
    const res = await response.json();
    return res;
}

const createMonth = async (month, token) => {
    const response = await fetch(`${backendURL}/monthlyPlan`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: month
    });
    const res = await response.json();
    console.log(res);
    return res;
}


const createEvent = async (eventData) => {
    const response = await fetch(`${backendURL}/event`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: eventData
    });
    const res = await response.json();
    console.log(res);
    return res;
}

export { getPlan, createPlan, testApi, login, signUp, getMonth, getMonths, createEvent, createMonth }
