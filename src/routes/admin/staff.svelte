<script>
    import { onMount } from "svelte";

    let staffMembers = [];
    const defaultFormData = {
        FirstName: "",
        LastName: "",
        Email: "",
        Title: "",
        Phone: "",
        Mobile: "",
        Bio: "",
    };
    let formData = { ...defaultFormData };

    const getStaffMembers = async () => {
        const res = await fetch("http://localhost:3999/staff");

        staffMembers = await res.json();
    };

    const handleSave = async () => {
        // await fetch("http://localhost:3999/staff", {
        //     method: "post",
        //     body: JSON.stringify(formData),
        //     headers: {
        //         "content-type": "application/json",
        //     },
        // });

        // await getStaffMembers();
        formData = { ...defaultFormData };

        document.getElementById("exampleModal").classList.toggle("show");
    };

    onMount(getStaffMembers);
</script>

<div class="container">
    <div class="row">
        <div class="position-relative">
            <div class="position-absolute top-0 end-0">
                <button
                    type="button"
                    class="btn btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                >
                    Add Member
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Modal -->
<div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header ">
                <h5 class="modal-title" id="exampleModalLabel">
                    Add New Staff Member
                </h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                />
            </div>
            <!-- midal body -->
            <div class="modal-body">
                <div class="row mb-2">
                    <div class="col">
                        <input
                            bind:value={formData.FirstName}
                            type="text"
                            class="form-control"
                            placeholder="First name"
                            aria-label="First name"
                        />
                    </div>
                    <div class="col">
                        <input
                            bind:value={formData.LastName}
                            type="text"
                            class="form-control"
                            placeholder="Last name"
                            aria-label="Last name"
                        />
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col">
                        <input
                            bind:value={formData.Email}
                            type="text"
                            class="form-control"
                            placeholder="Email"
                            aria-label="Email"
                        />
                    </div>
                    <div class="col">
                        <input
                            bind:value={formData.Title}
                            type="text"
                            class="form-control"
                            placeholder="Title"
                            aria-label="Title"
                        />
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col">
                        <input
                            bind:value={formData.Phone}
                            type="text"
                            class="form-control"
                            placeholder="Phone"
                            aria-label="Phone"
                        />
                    </div>
                    <div class="col">
                        <input
                            bind:value={formData.Mobile}
                            type="text"
                            class="form-control"
                            placeholder="Mobile"
                            aria-label="Mobile"
                        />
                    </div>
                    <div class="form-floating mt-2">
                        <input
                            bind:value={formData.Bio}
                            class="form-control"
                            placeholder="Bio"
                            id="floatingTextarea"
                        />
                        <label class="text-secondary"> Bio</label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal">Close</button
                >
                <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                    on:click={handleSave}>Save changes</button
                >
            </div>
        </div>
    </div>
</div>

<div class="row mt-5">
    {#if staffMembers.length}
        {#each staffMembers as staff}
            <div class="col my-3">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">
                            {staff.FirstName}
                            {staff.LastName}
                            <button
                                class="btn text-danger fas fa-trash float-end"
                            />
                            <button
                                class="btn text-muted fas fa-edit float-end"
                            />
                        </h5>

                        <h6 class="card-subtitle mb-2 text-muted">
                            {staff.Title}
                        </h6>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            Phone: {staff.Phone}
                        </li>
                        <li class="list-group-item">
                            Email: {staff.Email}
                        </li>
                    </ul>
                </div>
            </div>
        {/each}
    {:else}
        <p>No staff members Click here to add one</p>
    {/if}
</div>
