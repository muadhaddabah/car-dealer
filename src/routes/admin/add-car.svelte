<script>
    import Index from "../index.svelte";
    import CarForm from "./components/car-form.svelte";

    $: decoded = false;
    const data = {};
    const decodeVin = () => {
        decoded = true;
        data.title = "car Title";
    };
</script>

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
            aria-selected="true">Home</button
        >
    </li>
    <li class="nav-item" role="presentation">
        <button
            class="nav-link "
            class:disabled={!decoded}
            id="profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected="false">Profile</button
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
            aria-selected="false">Contact</button
        >
    </li>
</ul>
<div class="tab-content">
    <div
        class="tab-pane fade show active"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
    >
        Home pG1
        {#if !decoded}
            <button class="btn btn-primary mt-3" on:click={decodeVin}
                >add</button
            >
        {:else}
            <p>show form here</p>
            <CarForm {...data} />
        {/if}
    </div>
    <div
        class="tab-pane fade"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
    >
        profile pg2
    </div>
    <div
        class="tab-pane fade"
        id="contact"
        role="tabpanel"
        aria-labelledby="contact-tab"
    >
        contact pg3
    </div>
</div>

<style>
    div.tab-content > div {
        padding: 25px;
    }
</style>
