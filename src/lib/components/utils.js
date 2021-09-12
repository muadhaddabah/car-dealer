
export const groupBy = (arr, key) =>
    arr.reduce((prev, curr) => {
        (prev[curr[key]] = prev[curr[key]] || []).push(curr);
        return prev;
    }, {});

export const contactTypes1 = [
    {
        id: 1,
        typeName: "General Inquiry",
        component: "GeneralInquiry",
        sKey: "general-inquiry",
        isDefault: 1
    },
    {
        id: 2,
        typeName: "Trade-In",
        component: "TradeIn",
        sKey: "trade-in",
        isDefault: 0
    }
]

export const contactTypes = {
    generalInquiry: {
        id: 1,
        typeName: "General Inquiry",
        component: "GeneralInquiry",
        sKey: "general-inquiry",
        isDefault: 1
    },
    tradeIn: {
        id: 2,
        typeName: "Trade-In",
        component: "TradeIn",
        sKey: "trade-in",
        isDefault: 0
    }
}