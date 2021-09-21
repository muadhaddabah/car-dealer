<script context="module">
    export async function load({ page, fetch, session, context }) {
        const url = `http://localhost:3999/cars/${page.params.id}`;
        const res = await fetch(url);

        if (res.ok) {
            const json = await res.json();
            console.log("🚀 ~ file: [id].svelte ~ line 8 ~ load ~ json", json);

            return {
                props: {
                    car: json,
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
    import { onMount } from "svelte";
    import Thumbnails from "../components/thumbnails.svelte";

    export let fileinput = [];
    let features = [];
    export let car = {};
    let data = {
        Miles: car.Miles,
        Price: car.Price,
        Features: car.Features,
    };

    $: saveIsVisible = true;

    const handleChange = async (event, Miles) => {
        console.log(event.target.innerText);

        car.Miles = event.target.innerText;
        saveIsVisible = !(event.target.innerText != Miles);
    };

    $: console.log(features.filter((it) => it.checked));
    $: console.log(
        features.filter((it) => it.checked).map(({ checked, ...rest }) => rest)
    );

    const getFeatures = async () => {
        const res = await fetch("http://localhost:3999/features");
        const json = await res.json();
        console.log("feater");
        features = json.map((it) => ({
            ...it,
            checked: checkExistingFeature(it.id),
        }));
    };

    const handleSubmit = async (event) => {
        console.log(
            "🚀 ~ file: [id].svelte ~ line 72 ~ handleSubmit ~ data",
            data
        );
        try {
            const res = await fetch(`http://localhost:3999/cars/${car.id}`, {
                method: "PATCH",
                body: JSON.stringify(data),
                headers: { "content-type": "application/json" },
            });
            console.log(res);

            const json = await res.json();

            if (res.status == 200) {
                // await getCars();
                console.log("should work");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const checkExistingFeature = (id) =>
        car.Features.map((it) => it.id).includes(id);

    const readImage = (image) => {
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e) => {
            car.Photos = [
                ...car.Photos,
                e.target.result.replace(/^data:(.*,)?/, ""),
            ];
        };
    };

    const onFileSelected = (e) => {
        Array.from(e.target.files).forEach((it) => readImage(it));
    };

    onMount(getFeatures);
</script>

<h1 class="text-center">
    {car.ModelYear}
    {car.Make}
    {car.Model}
    {car.Trim}
</h1>

<div class="container-fluid">
    <!-- Tabs -->
    <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button
                class="nav-link active"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true">Edit</button
            >
            <button
                class="nav-link"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-profile"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false">Features</button
            >
            <button
                class="nav-link"
                id="nav-contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-contact"
                type="button"
                role="tab"
                aria-controls="nav-contact"
                aria-selected="false">Photos</button
            >
            <button
                class="nav-link"
                id="nav-finish-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-finish"
                type="button"
                role="tab"
                aria-controls="nav-finish"
                aria-selected="false">Finish</button
            >
        </div>
    </nav>
    <!-- content -->
    <div class="tab-content" id="nav-tabContent">
        <div
            class="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
        >
            <div class="card-header border border-1 my-3">
                <h2 class="text-center my-1">
                    {car.ModelYear}
                    {car.Make}
                    {car.Model}
                    {car.Trim}
                </h2>
            </div>
            <!-- card -->
            <div class="row">
                <div class="col-3">
                    <div
                        class="card text-white bg-dark mb-3"
                        style="max-width: 18rem;"
                    >
                        <h5 class="card-header text-center">
                            Specs Non-Editable
                        </h5>
                        <div class="card-body">
                            <!-- new list -->
                            <ul class="list-group list-group-flush">
                                <li
                                    class="list-group-item bg-secondary text-white"
                                >
                                    <strong>VIN</strong>
                                    <p class=" text-end">
                                        {car.VIN}
                                    </p>
                                </li>
                                <!-- v2 -->
                                <li
                                    class="list-group-item bg-secondary text-white"
                                >
                                    <div class="row">
                                        <strong class="col text-start">
                                            Year
                                        </strong>
                                        <p class="col text-end">
                                            {car.ModelYear}
                                        </p>
                                    </div>
                                </li>
                                <li
                                    class="list-group-item bg-secondary text-white"
                                >
                                    <div class="row">
                                        <strong class="col text-start">
                                            Make
                                        </strong>
                                        <p class="col text-end">{car.Make}</p>
                                    </div>
                                </li>
                                <li
                                    class="list-group-item bg-secondary text-white"
                                >
                                    <div class="row">
                                        <strong class="col text-start">
                                            Model
                                        </strong>
                                        <p class="col text-end">{car.Model}</p>
                                    </div>
                                </li>
                                <li
                                    class="list-group-item bg-secondary text-white"
                                >
                                    <div class="row">
                                        <strong class="col"> Trim </strong>
                                        <p class="col text-end">{car.Trim}</p>
                                    </div>
                                </li>

                                <li
                                    class="list-group-item bg-secondary text-white"
                                >
                                    <div class="row">
                                        <strong class="col text-start">
                                            Engine
                                        </strong>
                                        <p class="col text-end">V-8</p>
                                    </div>
                                </li>
                                <!-- v2 -->
                            </ul>
                            <!-- endlis -->
                        </div>
                    </div>
                </div>

                <div class="col-8">
                    <h4 class="text-center">Editable</h4>
                    <div class="row">
                        <div class="col input-group mt-3">
                            <span class="input-group-text">Milesz</span>

                            <input
                                bind:value={data.Miles}
                                placeholder={data.Miles}
                                type="text"
                                class="form-control"
                                aria-label="Dollar amount (with dot and two decimal places)"
                            />
                        </div>

                        <!-- price -->
                        <div class="col input-group mt-3">
                            <span class="input-group-text">$</span>

                            <input
                                bind:value={data.Price}
                                type="text"
                                class="form-control"
                                aria-label="Dollar amount (with dot and two decimal places)"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label for="exteriorColorInput" class="form-label"
                                >Primary Color:</label
                            >
                            <input
                                bind:value={car.ExteriorColor}
                                type="color"
                                class="form-control form-control-color"
                                id="exteriorColorInput"
                                title="Choose your color"
                            />
                        </div>
                        <!-- exterior 2 -->
                        <div class="col">
                            <label for="exteriorColorInput" class="form-label"
                                >Secondary Color:</label
                            >
                            <input
                                bind:value={car.ExteriorColorSecondary}
                                type="color"
                                class="form-control form-control-color"
                                id="exteriorColorInput"
                                title="Choose your color"
                            />
                        </div>
                        <!--interior color -->
                        <div class="col">
                            <span for="interiorColorInput" class="input-group"
                                >Interior Color:</span
                            >
                            <input
                                bind:value={car.InteriorColor}
                                type="color"
                                class="form-control form-control-color"
                                id="interiorColorInput"
                                title="Choose your color"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="tab-pane fade"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
        >
            <h4>Features</h4>
            <div class="row row-cols-3">
                {#each features as { id, feature, checked }, idx (`${id}_${feature}`)}
                    <div class="col">
                        <input
                            bind:group={data.Features}
                            bind:checked
                            on:input={() => (features[idx].checked = !checked)}
                            type="checkbox"
                            value={{ id, feature }}
                        />
                        {feature}
                    </div>
                {/each}
            </div>
        </div>
        <div
            class="tab-pane fade"
            id="nav-contact"
            role="tabpanel"
            aria-labelledby="nav-contact-tab"
        >
            <h3 class="text-center">Edit Photos</h3>
            <div id="app">
                {#if car.Photos}
                    <div class="row">
                        {#each car.Photos as Thumbnail}
                            <div class="col">
                                <img
                                    class="Thumbnail"
                                    src={Thumbnail}
                                    alt="d"
                                />
                            </div>
                        {/each}
                    </div>
                {:else}
                    <img
                        class="Thumbnail"
                        style="width: 250px;"
                        src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-312.png"
                        alt=""
                    />
                {/if}
                <img
                    class="upload"
                    style="width: 75px;"
                    src="https://static.thenounproject.com/png/625182-200.png"
                    alt=""
                    on:click={() => {
                        fileinput.click();
                    }}
                />
                <div
                    on:click={() => {
                        fileinput.click();
                    }}
                >
                    Choose Image
                </div>
                <input
                    multiple
                    style="display:none"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    on:change={(e) => onFileSelected(e)}
                    bind:this={fileinput}
                />
            </div>
        </div>
        <div
            class="tab-pane fade"
            id="nav-finish"
            role="tabpanel"
            aria-labelledby="nav-finish-tab"
        >
            <div class="container row mt-5">
                <h5 class=" text-center">
                    {car.id}
                    {car.ModelYear}
                    {car.Make}
                    {car.Model}
                    {car.Trim}
                </h5>
                <!-- black card -->

                <div
                    class="card text-white bg-dark mb-3"
                    style="max-width: 18rem;"
                >
                    <h5 class="card-header text-center">
                        {car.id}
                        {car.ModelYear}
                        {car.Make}
                        {car.Model}
                        {car.Trim}
                    </h5>
                    <div class="card-body">
                        <!-- new list -->
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item bg-secondary text-white">
                                <strong>VIN</strong>
                                <p class=" text-end">
                                    {car.VIN}
                                </p>
                            </li>

                            <!-- v2 -->
                            <li class="list-group-item bg-secondary text-white">
                                <div class="row">
                                    <strong class="col text-start">
                                        Miles
                                    </strong>
                                    <p class="col text-end">{data.Miles}</p>
                                </div>
                            </li>
                            <li class="list-group-item bg-secondary text-white">
                                <div class="row">
                                    <strong class="col text-start">
                                        Price
                                    </strong>
                                    <p class="col text-end">{car.Price}</p>
                                </div>
                            </li>
                            <li class="list-group-item bg-secondary text-white">
                                <div class="row">
                                    <strong class="col text-start">
                                        Year
                                    </strong>
                                    <p class="col text-end">{car.ModelYear}</p>
                                </div>
                            </li>
                            <li class="list-group-item bg-secondary text-white">
                                <div class="row">
                                    <strong class="col text-start">
                                        Make
                                    </strong>
                                    <p class="col text-end">{car.Make}</p>
                                </div>
                            </li>
                            <li class="list-group-item bg-secondary text-white">
                                <div class="row">
                                    <strong class="col text-start">
                                        Model
                                    </strong>
                                    <p class="col text-end">{car.Model}</p>
                                </div>
                            </li>
                            <li class="list-group-item bg-secondary text-white">
                                <div class="row">
                                    <strong class="col"> Trim </strong>
                                    <p class="col text-end">{car.Trim}</p>
                                </div>
                            </li>

                            <li class="list-group-item bg-secondary text-white">
                                <div class="row">
                                    <strong class="col text-start">
                                        Engine
                                    </strong>
                                    <p class="col text-end">V-8</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- Carousel -->
                <div
                    style="width: 600px; "
                    id="carouselExampleIndicators"
                    class="carousel slide container-fluid"
                    data-bs-ride="carousel"
                >
                    <div class="carousel-indicators">
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="0"
                            class="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        />
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="1"
                            aria-label="Slide 2"
                        />
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="2"
                            aria-label="Slide 3"
                        />
                    </div>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img
                                src="https://picsum.photos/500"
                                class="d-block w-100"
                                alt="..."
                            />
                        </div>
                        <div class="carousel-item">
                            <img
                                src="https://picsum.photos/500"
                                class="d-block w-100"
                                alt="..."
                            />
                        </div>
                        <div class="carousel-item">
                            <img
                                src="https://picsum.photos/500"
                                class="d-block w-100"
                                alt="..."
                            />
                        </div>
                    </div>
                    <button
                        class="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev"
                    >
                        <span
                            class="carousel-control-prev-icon"
                            aria-hidden="true"
                        />
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button
                        class="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next"
                    >
                        <span
                            class="carousel-control-next-icon"
                            aria-hidden="true"
                        />
                        <span class="visually-hidden">Next</span>
                    </button>
                    <!-- slides -->
                    <div class="row" />
                </div>
                <!--white card -->
                <div class="card bg-light mb-3" style="max-width: 18rem;">
                    <div class="card-header">Features</div>
                    <div class="card-body">
                        {#if data.Features.length}
                            <ul>
                                {#each data.Features as { feature }}
                                    <li>{feature}</li>
                                {/each}
                            </ul>
                        {/if}
                    </div>
                </div>

                <!-- <Thumbnail Gallery /> -->
                <div class="row">
                    <img
                        src="https://picsum.photos/200"
                        class="col img-thumbnail"
                        alt="..."
                        style="width: 150px;"
                    />
                    <img
                        src="https://picsum.photos/200"
                        class="col img-thumbnail"
                        alt="..."
                        style="width: 150px;"
                    />
                    <img
                        src="https://picsum.photos/200"
                        class="col img-thumbnail"
                        alt="..."
                        style="width: 150px;"
                    />
                    <img
                        src="https://picsum.photos/200"
                        class="col img-thumbnail"
                        alt="..."
                        style="width: 200px;"
                    />
                    <img
                        src="https://picsum.photos/200"
                        class="col img-thumbnail"
                        alt="..."
                        style="width: 50rem;"
                    />
                    <img
                        src="https://picsum.photos/200"
                        class="col img-thumbnail"
                        alt="..."
                        style="width: 5rem;"
                    />
                </div>
            </div>
            <!-- Additional Data -->
            <div class="row mt-5">
                {#each car.additionalData as group (group.flat().join("_"))}
                    <ul class="col-12 list-group list-group-horizontal">
                        {#each group as item}
                            <li class="list-group-item flex-fill">
                                <strong
                                    >{item[0].replace(
                                        /([A-Z])/g,
                                        " $1"
                                    )}:</strong
                                >
                                {item[1]}
                            </li>
                        {/each}
                    </ul>
                {/each}
            </div>
        </div>
        <button class="btn btn-success mt-3 float-end" on:click={handleSubmit}>
            Save Changes
        </button>
    </div>
</div>

<style>
    .specs {
        padding-right: 25px;
    }
</style>
