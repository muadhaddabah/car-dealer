<script>
    import { each, onMount } from "svelte/internal";

    let settings = [];
    $: saveIsVisible = true;

    const getSettings = async () => {
        const res = await fetch(`http://localhost:3999/settings`);
        settings = await res.json();
    };

    const handleChange = async (event, dealerAddress) => {
        console.log(event.target.innerText);

        settings.Address = event.target.innerText;
        saveIsVisible = !(event.target.innerText != dealerAddress);
    };

    const handleSave = async (event) => {
        try {
            const res = await fetch(`http://localhost:3999/settings`, {
                method: "POST",
                body: JSON.stringify(settings),
                headers: { "content-type": "application/json" },
            });
            console.log(res);
            const json = await res.json();

            if (res.status == 200) {
                await getSettings();
            }

            if (res.status == 404) {
                errors = json.errors;
                console.log("wtll");
            }
        } catch (error) {
            console.log(error);
        }
    };

    onMount(getSettings);
</script>

<div class="text-center">
    {#each settings as setting}
        <h1>
            <span
                contenteditable
                on:input={(event) => handleChange(event, setting.dealerAddress)}
            >
                {setting.dealerAddress}
            </span>
            <button
                class="btn btn-primary float-right "
                class:invisible={saveIsVisible}
                on:click|preventDefault={handleSave}>Save</button
            >
        </h1>

        <div class="card text-center">
            <div class="card-header">
                Welcome, {setting.dealerFirstName}
                {setting.dealerLastName}
            </div>
            <div class="card-body">
                <h4>Dealer Details</h4>
                <h1 class="card-title">{setting.companyName}</h1>
                <h5>
                    <i class="fas fa-phone-alt" />{setting.companyNumber}
                </h5>
                <h5 class="card-text">
                    {setting.dealerAddress}
                </h5>

                <h4>Owner Details</h4>

                <h6>
                    {setting.dealerFirstName}
                    {setting.dealerLastName}
                </h6>
                <h6>Phone: {setting.dealerNumber}</h6>
                <h6>Email: {setting.dealerEmail}</h6>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            <div class="card-footer text-muted">2 days ago</div>
        </div>
    {/each}
</div>
