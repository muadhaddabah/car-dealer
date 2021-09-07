export async function get({ params }) {
    const id = params.id
    return {
        body: {
            data: features
        }
    }
}

export async function del({ params }) {
    const id = params.id
    return {
        body: {
            data: features
        }
    }
}

// save an existing record 
export async function put({ params }) {
    const id = params.id
    return {
        body: {
            data: features
        }
    }
}