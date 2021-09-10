<script>
    import { onMount } from "svelte";
    import { identity } from "svelte/internal";

    $: decoded = false;
    $: hasResults = false;
    const data = {};
    const decodeVin = () => {
        decoded = true;
        data.title = "car Title";
        data.year = "2020";
        data.make = "benze";
        data.model = "s550";
    };

    const handleSave = async () => {
        console.log(vehicle);
        await fetch("add-car.json", {
            method: "post",
            body: JSON.stringify(vehicle),
            headers: {
                "content-type": "application/json",
            },
        });
    };

    const chunkArray = (arr, chunkSize) => {
        const result = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            result.push(arr.slice(i, i + chunkSize));
        }
        return result;
    };

    let vin = "";
    let vehicle = {
        Miles: "",
        Price: "",
        ExteriorColor: "",
        ExteriorColorSecondary: "",
        InteriorColor: "",
        Features: [],
        Photos: [],
    };

    // const features = [
    //     "Heated Seats",
    //     "A/C seats",
    //     "rear window defroster",
    //     "heated steering wheel",
    //     "panaramic roof",
    // ];
    let features = [];

    const getFeatures = async () => {
        const res = await fetch("http://localhost:3999/features");
        features = await res.json();
        // features = json.data;
    };

    const searchVIN = async () => {
        // https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/1FTFW1RG2LFB85006?format=json
        const url = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`;
        const res = await fetch(url);
        const json = await res.json();
        const temp = {};
        Object.entries(json.Results[0]).forEach(
            (it) =>
                it[1].length &&
                it[1].toLowerCase() != "not applicable" &&
                (temp[it[0]] = it[1])
        );

        const {
            MakeID,
            Make,
            ModelID,
            Model,
            ModelYear,
            Trim,
            VIN,
            VehicleType,
            ...additionalData
        } = temp;

        vehicle = {
            ...vehicle,
            MakeID,
            Make,
            ModelID,
            Model,
            ModelYear,
            Trim,
            VIN,
            VehicleType,
            additionalData: chunkArray(Object.entries(additionalData), 3),
        };

        hasResults = true;
        console.log(vehicle);
    };

    // Add Photos

    let fileinput;

    const readImage = (image) => {
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e) => {
            vehicle.Photos = [
                ...vehicle.Photos,
                e.target.result.replace(/^data:(.*,)?/, ""),
            ];
        };
    };

    const onFileSelected = (e) => {
        Array.from(e.target.files).forEach((it) => readImage(it));
    };

    onMount(getFeatures);
</script>

<!-- Nav-Tabs -->
<ul class="nav nav-tabs" role="tablist">
    <li class="nav-item" role="presentation">
        <button
            class="nav-link active"
            id="home-tab"
            data-bs-toggle="tab"
            data-bs-target="#home"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="true">Add Car</button
        >
    </li>
    <li class="nav-item" role="presentation">
        <button
            class="nav-link"
            class:disabled={!decoded}
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false">Features</button
        >
    </li>
    <li class="nav-item" role="presentation">
        <button
            class="nav-link "
            class:disabled={!decoded}
            id="contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#contact"
            type="button"
            role="tab"
            aria-controls="contact"
            aria-selected="false">Add Photos</button
        >
    </li>
</ul>

<!-- Tab-Content -->
<div class="tab-content">
    <div
        class="tab-pane fade show active"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
    >
        <!-- test -->
        <div class="container">
            <form on:submit|preventDefault={searchVIN} method="POST">
                <div class="row">
                    <div class="col-10">
                        <div class="form-floating mb-3">
                            <input
                                bind:value={vin}
                                type="text"
                                class="form-control"
                                id="floatingInput"
                                placeholder="123abc"
                            />
                            <label for="floatingInput">VIN Number</label>
                        </div>
                    </div>
                    <div class="col-2">
                        <button
                            class="btn btn-primary"
                            on:click={decodeVin}
                            type="submit">Search</button
                        >
                    </div>
                </div>
            </form>
        </div>

        {#if hasResults}
            <div class="container">
                <div class="card" style="width: 18rem;">
                    <div class="card-header">
                        <h6>
                            {vehicle.ModelYear}
                            {vehicle.Make}
                            {vehicle.Model}
                            {vehicle.Trim}
                        </h6>
                    </div>
                </div>
                <!-- price  miles colors -->
                <div class="row row-cols-2 g-3">
                    <!-- miles -->
                    <div class="col">
                        <div class=" input-group mt-3" style="width: 15rem;">
                            <span class="input-group-text">Miles</span>

                            <input
                                bind:value={vehicle.Miles}
                                type="text"
                                class="form-control"
                                aria-label="Dollar amount (with dot and two decimal places)"
                            />
                        </div>
                    </div>
                    <!-- price -->
                    <div class="col">
                        <div class="input-group mt-3" style="width: 15rem;">
                            <span class="input-group-text">$</span>

                            <input
                                bind:value={vehicle.Price}
                                type="text"
                                class="form-control"
                                aria-label="Dollar amount (with dot and two decimal places)"
                            />
                        </div>
                    </div>
                    <!--exterior 1 color -->
                    <div class="col">
                        <label for="exteriorColorInput" class="form-label"
                            >Primary Color:</label
                        >
                        <input
                            bind:value={vehicle.ExteriorColor}
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
                            bind:value={vehicle.ExteriorColorSecondary}
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
                            bind:value={vehicle.InteriorColor}
                            type="color"
                            class="form-control form-control-color"
                            id="interiorColorInput"
                            title="Choose your color"
                        />
                    </div>
                </div>
            </div>
            {#each vehicle.additionalData as group (group.flat().join("_"))}
                <ul class="list-group list-group-horizontal">
                    {#each group as item}
                        <li class="list-group-item flex-fill">
                            <strong
                                >{item[0].replace(/([A-Z])/g, " $1")}:</strong
                            >
                            {item[1]}
                        </li>
                    {/each}
                </ul>
            {/each}
        {/if}
    </div>
    <div
        class="tab-pane fade"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
    >
        Features
        <div class="row row-cols-3">
            {#each features as { id, feature } (`${id}_${feature}`)}
                <div class="col">
                    <input
                        bind:group={vehicle.Features}
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
        id="contact"
        role="tabpanel"
        aria-labelledby="contact-tab"
    >
        Add Photos p.3
        <div id="app">
            {#if vehicle.Photos.length}
                <div class="row">
                    {#each vehicle.Photos as Thumbnail}
                        <div class="col">
                            <img class="Thumbnail" src={Thumbnail} alt="d" />
                        </div>
                    {/each}
                </div>
            {:else}
                <img
                    class="Thumbnail"
                    src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
                    alt=""
                />
            {/if}
            <img
                class="upload"
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

        <button class="btn btn-primary float-end" on:click={handleSave}
            >Submit</button
        >
    </div>
</div>

<style>
    div.tab-content > div {
        padding: 25px;
    }

    /* Add Photos */
    #app {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
    }

    .upload {
        display: flex;
        height: 50px;
        width: 50px;
        cursor: pointer;
    }
    .Thumbnail {
        /* display: flex; */
        height: 200px;
        width: 200px;
    }
</style>
