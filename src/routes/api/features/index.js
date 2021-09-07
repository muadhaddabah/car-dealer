export async function get({ params }) {
    const features = [
        "Heated Seats",
        "A/C seats",
        "rear window defroster",
        "heated steering wheel",
        "panaramic roof",
        "Dynamic Seats",
    ]
    return {
        body: {
            data: features
        }
    }
}

export async function post({ params }) { }
