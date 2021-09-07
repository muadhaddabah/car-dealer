export const post = async (request) => {
    const { Photos, ...vehicle } = request.body
    console.log(Photos);
    await fetch("http://localhost:3999/cars", {
        method: "post",
        body: JSON.stringify(vehicle),
        headers: {
            "content-type": "application/json",
        },
    });
};