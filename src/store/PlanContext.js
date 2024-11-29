import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getPlan } from "../http-actions/http";
import { getUserID, loadToken, getClientCreated, saveClientCreated } from "./sessionStorage";

export const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
    const [plan, setPlan] = useState([]);
    const planRef = useRef(plan);

    const[connected, setConnected] = useState(false);

    useEffect(() => {
        planRef.current = plan;
    }, [plan]);
    
    useEffect(() => {
        const customerID = getUserID();

        if (!connected) {
            connectToWebsocket(customerID, updatePlanStateFromAPI);
            setConnected(true);
            saveClientCreated(true);
        }
    }, [connected]);

    const connectToWebsocket = async (customerID, updatePlanStateFromAPI) => {
        const token = loadToken();
        const wsURL = "wss://e7ec9c2btrial-dev-budgetly-srv.cfapps.us10-001.hana.ondemand.com/connect?customerID=" + customerID;
        const socket = new WebSocket(wsURL);
    
        socket.onopen = () => {
            console.log("connected");
        }
    
        socket.onmessage = (event) => {
            console.log(event.data);
            updatePlanStateFromAPI(event.data);
        }
    
        socket.onclose = () => {
            console.log("disconnected");
        }
    }

    const updatePlanStateFromAPI = (data) => {
        console.log(planRef.current);
        const newTurnover = JSON.parse(data);
        if (newTurnover.total > 0) {
            updateMonthInPlan(true, newTurnover.total, newTurnover.monthlyPlanID);
        } else {
            updateMonthInPlan(false, newTurnover.total, newTurnover.monthlyPlanID);
        }
    };

    const updateMonthInPlan = (isIncome, amount, monthID) => {
        const updatedMonth = planRef.current.find(month => month.monthlyPlanID === monthID);
        if (updatedMonth) {
            if (isIncome) {
                updatedMonth.totalRevenue = (parseFloat(updatedMonth.totalRevenue)) + (parseFloat(amount));
                updatedMonth.sum = (parseFloat(updatedMonth.sum)) + (parseFloat(amount));
            } else {
                updatedMonth.totalCosts = (parseFloat(updatedMonth.totalCosts)) + (parseFloat(amount));
                updatedMonth.sum = (parseFloat(updatedMonth.sum)) + (parseFloat(amount));
            }
            setPlan([...planRef.current]);
            console.log("After update:")
            console.log(planRef.current.find(month => month.monthlyPlanID === monthID))
        }
    };

    return (
        <PlanContext.Provider value={{ plan, setPlan, updateMonthInPlan }}>
            {children}
        </PlanContext.Provider>
    );
};