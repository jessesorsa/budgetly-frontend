import React, { useEffect, useState } from "react";
import { loadToken } from "../store/sessionStorage";
import { useSynchronization } from '../store/SynchronizationFeature';

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

    const body = { "FirstName": firstName, "LastName": lastName, "Email": email, "Password": hashedPassword }

    const response = await fetch(`${loginURL}/signUp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    const res = await response.json();
    return res;
}

const login = async (email, password) => {

    const hashedPassword = await hashPassword(password);

    const body = { "Email": email, "Password": hashedPassword }

    const response = await fetch(`${loginURL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    const res = await response.json();
    return res;
}

/*
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
*/

const createPlan = async (startDate, endDate, userID, budgetID) => {

    const token = loadToken();
    console.log("creating plan");

    const plan = {
        "creator": userID,
        "BudgetPlanID": budgetID,
        "startDate": startDate,
        "endDate": endDate
    }

    console.log(plan);

    const response = await fetch(`${backendURL}/monthlyPlan`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(plan)
    });

    const res = await response.json();
    return res;
}

const getMonth = async (monthID) => {
    const token = loadToken();
    const response = await fetch(`${backendURL}/month/${monthID}/turnovers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
    const res = await response.json();
    return res;
};

const getPlan = async (budgetID) => {
    const token = loadToken();
    const response = await fetch(`${backendURL}/monthlyPlan/${budgetID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
    const res = await response.json();
    return res;
}

const createEvent = async (name, category, amount, recurring, userID, monthID, budgetID, numberOfReoccurences) => {
    const token = loadToken();

    console.log("monthID", monthID);

    const body = {
        "Creator": userID,
        "Total": amount,
        "Name": name,
        "Reoccuring": recurring,
        "Valuta": "2024-12-02",
        "isAsset": false,
        "startOfReoccurence": "",
        "endOfReoccurence": "",
        "numberOfReoccurences": numberOfReoccurences,
        "categoryID": category,
        "monthlyPlanID": monthID,
        "BudgetPlanID": budgetID,
    }

    const response = await fetch(`${backendURL}/turnover`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });
    return response;
}

const deleteEvent = async (eventID, reoccurences) => {

    const token = loadToken();

    console.log(eventID);

    const response = await fetch(`${backendURL}/turnover/${eventID}?reoccurences=${reoccurences}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    console.log(response);
}

const fetchCategories = async () => {
    const token = loadToken();
    const response = await fetch(`${backendURL}/categories`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
    const res = await response.json();
    return res;
}



export { createPlan, testApi, login, signUp, getMonth, getPlan, createEvent, deleteEvent, fetchCategories }
