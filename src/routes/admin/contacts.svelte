<script>
    import { groupBy } from "$lib/components/utils";
    import { onMount } from "svelte";
    import AddCar from "./add-car.svelte";
    import GeneralInquiry from "./components/general-inquiry.svelte";
    import TradeIn from "./components/trade-in.svelte";

    let contacts = [];
    let allContacts = [];
    let contactTypes = [];
    let RequestType = 0;
    let components = [];

    const setUp = async () => {
        const contactsResponse = await fetch("http://localhost:3999/contacts");
        allContacts = await contactsResponse.json();
        const contactTypesResponse = await fetch(
            "http://localhost:3999/contact-types"
        );
        contactTypes = await contactTypesResponse.json();

        const defaultTypeIndex = contactTypes.findIndex((it) => it.isDefault);

        filterContactForms(contactTypes[defaultTypeIndex].id);
    };

    const handleDelete = async (id) => {
        console.log(id);
        const res = await fetch(`http://localhost:3999/contacts/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ IsDeleted: 1, IsSaved: 0 }),
            headers: {
                "content-type": "application/json",
            },
        });
        if (res.ok) {
            await setUp();
            const defaultTypeIndex = contactTypes.findIndex(
                (it) => it.isDefault
            );

            filterContactForms(contactTypes[defaultTypeIndex].id);
        }
    };

    const filterContactForms = (reqType) => {
        RequestType = reqType;
        contacts = allContacts.filter(
            (it) => it.ContactTypeId === reqType && !it.IsDeleted && !it.IsSaved
        );
    };

    const filterSaved = () => {
        contacts = allContacts.filter((it) => it.IsSaved);
    };

    const filterDeleted = () => {
        contacts = allContacts.filter((it) => it.IsDeleted);
    };

    onMount(setUp);
</script>

<div class="d-flex align-items-start">
    <div
        class="nav flex-column nav-pills me-3 p-3 border-end border-secondary border-1"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
    >
        <!-- Tabs -->
        {#each contactTypes as type}
            <button
                class="nav-link"
                class:active={type.isDefault}
                on:click={() => filterContactForms(type.id)}
                id={`v-pills-${type.sKey}-tab`}
                data-bs-toggle="pill"
                data-bs-target={`#v-pills-${type.sKey}`}
                type="button"
                role="tab"
                aria-controls={`v-pills-${type.sKey}`}
                aria-selected="true">{type.typeName}</button
            >
        {/each}

        <button
            class="nav-link"
            on:click={filterSaved}
            id="v-pills-messages-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-messages"
            type="button"
            role="tab"
            aria-controls="v-pills-messages"
            aria-selected="false">Saved For Later</button
        >
        <button
            class="nav-link"
            on:click={filterDeleted}
            id="v-pills-settings-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-settings"
            type="button"
            role="tab"
            aria-controls="v-pills-settings"
            aria-selected="false">Deleted</button
        >
    </div>
    <div class="tab-content" id="v-pills-tabContent">
        {#each contactTypes as type}
            <div
                class="tab-pane fade"
                class:show={type.isDefault}
                class:active={type.isDefault}
                id={`v-pills-${type.sKey}`}
                role="tabpanel"
                aria-labelledby={`v-pills-${type.sKey}-tab`}
            >
                <div class="row">
                    {#if type.component === "TradeIn"}
                        <TradeIn {contacts} {handleDelete} />
                    {/if}
                    {#if type.component === "GeneralInquiry"}
                        <GeneralInquiry {contacts} {handleDelete} />
                    {/if}
                </div>
            </div>
        {/each}

        <!-- next -->

        <div
            class="tab-pane fade"
            id="v-pills-messages"
            role="tabpanel"
            aria-labelledby="v-pills-messages-tab"
        >
            <TradeIn {contacts} {handleDelete} />
        </div>
        <div
            class="tab-pane fade"
            id="v-pills-settings"
            role="tabpanel"
            aria-labelledby="v-pills-settings-tab"
        >
            {#if contacts.length}
                <TradeIn {contacts} {handleDelete} />
            {:else}
                <h2>No Deleted Items to show orr something</h2>
            {/if}
        </div>
    </div>
</div>
