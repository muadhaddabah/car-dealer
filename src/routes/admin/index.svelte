<script>
    import { onMount } from "svelte";

    let cars = [];

    const getCars = async () => {
        const res = await fetch("http://localhost:3999/cars");
        cars = await res.json();
    };

    onMount(getCars);
</script>

<!-- Admin list of cars -->

<div class="row">
    <div class="position-relative">
        <div class="position-absolute top-0 end-0">
            <a href="/admin/add-car" class="btn btn-success">Add</a>
        </div>
    </div>
</div>
{#each cars as car}
    <div class="col">
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img
                        src="https://picsum.photos/200"
                        class="img-fluid rounded-start"
                        alt="..."
                    />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{car.Make} {car.Model}</h5>

                        <ul>
                            <li>VIN: {car.VIN}</li>
                            <li>Price: {car.Price}</li>
                            <li>Milage: {car.Miles}</li>
                        </ul>
                        <button type="button" class="btn btn-primary"
                            >Edit</button
                        >
                        <button type="button" class="btn btn-primary"
                            >delete</button
                        >
                        <button type="button" class="btn btn-primary"
                            >delete</button
                        >
                        <button type="button" class="btn btn-primary"
                            >delete</button
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
{/each}
<!-- noew -->
<div class="col">
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img
                    src="https://picsum.photos/200"
                    class="img-fluid rounded-start"
                    alt="..."
                />
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">2015 Mercades-Benze s550</h5>
                    <!-- <p class="card-text">
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                        </p> -->
                    <ul>
                        <li>VIN: 213546</li>
                        <li>Price: 45,000</li>
                        <li>Milage: 55k</li>
                    </ul>
                    <button type="button" class="btn btn-primary">Edit</button>
                    <button type="button" class="btn btn-primary">delete</button
                    >
                    <button type="button" class="btn btn-primary">delete</button
                    >
                    <button type="button" class="btn btn-primary">delete</button
                    >
                </div>
            </div>
        </div>
    </div>
</div>
