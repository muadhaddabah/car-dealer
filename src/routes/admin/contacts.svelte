<script>
    import { contactTypes, contactTypes1 } from "$lib/components/utils";
    import { onMount } from "svelte";
    import GeneralInquiry from "./components/general-inquiry.svelte";
    import TradeIn from "./components/trade-in.svelte";

    let contacts = [];
    let allContacts = [];
    $: inquiries = contacts.filter(
        (it) => it.ContactTypeId === contactTypes.generalInquiry.id
    );

    $: tradeIns = contacts.filter(
        (it) => it.ContactTypeId === contactTypes.tradeIn.id
    );

    const setUp = async (filterType) => {
        const contactsResponse = await fetch("http://localhost:3999/contacts");
        allContacts = await contactsResponse.json();

        filterContactForms(filterType || contactTypes.generalInquiry.id);
    };

    const handleSaveForLater = async (id) => {
        console.log(id);
        const res = await fetch(`http://localhost:3999/contacts/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ IsSaved: 1, IsDeleted: 0 }),
            headers: {
                "content-type": "application/json",
            },
        });
        if (res.ok) {
            await setUp();
        }
    };

    const handleDelete = async (id, filterType) => {
        console.log(id);
        const res = await fetch(`http://localhost:3999/contacts/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ IsDeleted: 1, IsSaved: 0 }),
            headers: {
                "content-type": "application/json",
            },
        });
        if (res.ok) {
            await setUp(filterType);
        }
    };

    const filterContactForms = (reqType) => {
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
        <!-- Pill Tabs -->
        {#each Object.values(contactTypes) as type}
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
            aria-selected="false">Read</button
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
        {#each Object.values(contactTypes) as type}
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
                        <TradeIn
                            contacts={tradeIns}
                            handleDelete={(id) => {
                                handleDelete(id, contactTypes.tradeIn.id);
                            }}
                            {handleSaveForLater}
                        />
                    {/if}
                    {#if type.component === "GeneralInquiry"}
                        <GeneralInquiry
                            contacts={inquiries}
                            handleDelete={(id) => {
                                handleDelete(
                                    id,
                                    contactTypes.generalInquiry.id
                                );
                            }}
                            {handleSaveForLater}
                        />
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
            <TradeIn contacts={tradeIns} {handleDelete} />
            <GeneralInquiry contacts={inquiries} {handleDelete} />
        </div>
        <div
            class="tab-pane fade"
            id="v-pills-settings"
            role="tabpanel"
            aria-labelledby="v-pills-settings-tab"
        >
            {#if contacts.length}
                <TradeIn
                    contacts={tradeIns}
                    handleDelete={(id) => {
                        handleDelete(id, contactTypes.tradeIn.id);
                    }}
                    {handleSaveForLater}
                />

                <GeneralInquiry contacts={inquiries} {handleSaveForLater} />
            {:else}
                <h2>No Deleted Items to show orr something</h2>
            {/if}
        </div>
    </div>
</div>
