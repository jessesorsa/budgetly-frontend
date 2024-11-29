import React, { createContext, useState } from "react";

export const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
    const [plan, setPlan] = useState([]);

    const updateMonthInPlan = (isIncome, amount, monthID) => {
        const updatedMonth = plan.find(month => month.monthlyPlanID === monthID);
        if (isIncome) {
            //const currentRevenue = parseFloat(updatedMonth.totalRevenue);
            //updatedMonth.totalRevenue = currentRevenue + amount;
        } else {
            // updatedMonth.totalCosts += amount;
        }
        setPlan([...plan]);
    };

    return (
        <PlanContext.Provider value={{ plan, setPlan, updateMonthInPlan }}>
            {children}
        </PlanContext.Provider>
    );
};