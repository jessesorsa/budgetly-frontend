import React, { createContext, useContext, useState, useEffect } from 'react';
import { connectToWebsocket, getPlan } from "../http-actions/http";
import { getUserID } from "./sessionStorage";
import { PlanContext, PlanProvider } from "./PlanContext";

export const SynchronizationContext = createContext();

export const SynchronizationProvider = ({ children }) => {
   /* const [synchronization, setSynchronization] = useState([]);
    const { updateMonthInPlan } = useContext(PlanContext);

    useEffect(() => {
        const customerID = getUserID();
        connectToWebsocket(customerID, updatePlanStateFromAPI);
    }, []);

    const updatePlanStateFromAPI = (data) => {
        const {plan, setPlan, updateMonthInPlan} = React.useContext(PlanContext);
        console.log(plan);
        const newTurnover = JSON.parse(data);
        if (newTurnover.total > 0) {
            updateMonthInPlan(true, newTurnover.total, newTurnover.monthlyPlanID);
            console.log(newTurnover)
        } else {
            updateMonthInPlan(false, newTurnover.total, newTurnover.monthlyPlanID);
        }
    };

    return (
        <PlanProvider>
            <SynchronizationContext.Provider value={{ synchronization, updatePlanStateFromAPI }}>
                {children}
            </SynchronizationContext.Provider>
        </PlanProvider>


    );*/
    return(<></>)
};
