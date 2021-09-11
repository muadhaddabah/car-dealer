export const groupBy = (arr, key) =>
    arr.reduce((prev, curr) => {
        (prev[curr[key]] = prev[curr[key]] || []).push(curr);
        return prev;
    }, {});