<script context="module">
    export async function load({ page, fetch, session, context }) {
        const url = `http://localhost:3999/cars/${page.params.id}`;
        const res = await fetch(url);

        if (res.ok) {
            const json = await res.json();

            return {
                props: {
                    car: json.data,
                },
            };
        }

        return {
            status: res.status,
            error: new Error(`Could not load ${url}`),
        };
    }
</script>

<script>
    export let car = [];
    let data = {
        Make: car.Make,
        ModelID: car.ModelID,
        Model: car.Model,
        ModelYear: car.ModelYear,
        Trim: car.Trim,
        VIN: car.VIN,
    };
</script>

<h1>
    {car.Make}{car.Model}
    yo
</h1>
