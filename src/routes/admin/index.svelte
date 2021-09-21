<script>
    import { onMount } from "svelte";

    let cars = [];

    const getCars = async () => {
        const res = await fetch("http://localhost:3999/cars");
        cars = await res.json();
    };

    const toggleActive = async (e, carId) => {
        const active = e.target.checked ? 1 : 0;
        const res = await fetch(`http://localhost:3999/cars/${carId}`, {
            method: "PATCH",
            body: JSON.stringify({ IsActive: active }),
            headers: {
                "content-type": "application/json",
            },
        });
    };

    onMount(getCars);
</script>

<div class="row ">
    <div class="col-xl-2 col-md-2">
        <div class="widget widget-stats bg-blue">
            <div class="stats-info border-bottom border-2 border-light">
                <h4 class="text-center">Total Cars</h4>
            </div>
            <h2 class="text-center mt-2">57</h2>
        </div>
    </div>
    <div class="col-xl-2 col-md-2">
        <div class="widget widget-stats bg-warning text-dark">
            <div class="stats-info border-bottom border-2 border-dark">
                <h4 class="text-center">Private Cars</h4>
            </div>
            <h2 class="text-center mt-2">17</h2>
        </div>
    </div>
    <div class="col-xl-2 col-md-2">
        <div class="widget widget-stats bg-success text-light">
            <div class="stats-info border-bottom border-2 border-light">
                <h4 class="text-center">Public Cars</h4>
            </div>
            <h2 class="text-center mt-2">40</h2>
        </div>
    </div>
</div>

<div class="row">
    <div class="position-relative">
        <div class="position-absolute top-0 end-0">
            <a href="/admin/add-car" class="btn btn-success">Add</a>
        </div>
    </div>
</div>
<div class="row row-cols-2 ">
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

                            <div
                                class="card-footer row d-flex justify-content-center"
                            >
                                <button
                                    type="button"
                                    class="btn col-2 btn-danger"
                                    ><i class="fas fa-trash-alt" /></button
                                >
                                <a
                                    href={`/admin/cars/${car.id}`}
                                    class="btn border-2 border-info col-2 mx-3"
                                >
                                    <i class="fas fa-edit" /></a
                                >

                                <div class="form-check col-2 form-switch">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        checked={car.IsActive}
                                        on:change={(e) =>
                                            toggleActive(e, car.id)}
                                        id="flexSwitchCheckDefault"
                                    />
                                    <label
                                        class="form-check-label"
                                        for="flexSwitchCheckDefault"
                                        >Publish</label
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/each}
</div>
<!-- noew -->
<div class="col">
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img
                    src="/static/images/cars/1126"
                    class="img-fluid rounded-start"
                    alt="..."
                />
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">2015 Mercades-Benze s550</h5>

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

<style>
    .widget.widget-stats {
        /* position: relative; */
        color: #fff;
        padding: 0.77rem;
        border-radius: 4px;
    }
    .widget {
        overflow: hidden;
        margin-bottom: 20px;
        background: #fff;
        color: inherit;
        padding: 0;
    }
    .bg-blue {
        background-color: steelblue !important;
    }
</style>
