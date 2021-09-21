<script>
    import { onMount } from "svelte/internal";

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
                method: "PUT",
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

<div class="row">
    <div class="col-7 text-center">
        {#each settings as setting}
            <div class="card">
                <!-- <div class="card-header">
                    Welcome, {setting.dealerFirstName}
                    {setting.dealerLastName}
                </div> -->
                <div class="row card-body">
                    <div class="col-6">
                        <h4>Company Details</h4>

                        <form class="form-floating my-2">
                            <input
                                type="Company"
                                class="form-control"
                                on:input={(event) =>
                                    handleChange(event, setting.companyName)}
                                id="floatingInputValue"
                                value={setting.companyName}
                            />
                            <label for="floatingInputValue">Company</label>
                        </form>
                        <form class="form-floating my-2">
                            <input
                                type="phone"
                                class="form-control"
                                on:input={(event) =>
                                    handleChange(event, setting.companyNumber)}
                                id="floatingInputValue"
                                value={setting.companyNumber}
                            />
                            <label for="floatingInputValue"
                                >Company Number</label
                            >
                        </form>
                        <form class="form-floating my-2">
                            <input
                                type="Address"
                                class="form-control"
                                id="floatingInputValue"
                                on:input={(event) =>
                                    handleChange(event, setting.dealerAddress)}
                                value={setting.companyAddress}
                            />
                            <label for="floatingInputValue">Address</label>
                        </form>
                        <form class="form-floating">
                            <input
                                type="email"
                                class="form-control"
                                on:input={(event) =>
                                    handleChange(event, setting.companyEmail)}
                                id="floatingInputValue"
                                value={setting.companyEmail}
                            />
                            <label for="floatingInputValue">Email</label>
                        </form>
                    </div>
                    <div class="col-6 ">
                        <h4>Personal Info</h4>
                        <form class="form-floating">
                            <input
                                type="FirstName"
                                class="form-control"
                                on:input={(event) =>
                                    handleChange(
                                        event,
                                        setting.dealerFirstName
                                    )}
                                id="floatingInputValue"
                                value={setting.dealerFirstName}
                            />
                            <label for="floatingInputValue">First Name</label>
                        </form>
                        <form class="form-floating my-2">
                            <input
                                type="LastName"
                                class="form-control"
                                on:input={(event) =>
                                    handleChange(event, setting.dealerLastName)}
                                id="floatingInputValue"
                                value={setting.dealerLastName}
                            />
                            <label for="floatingInputValue">Last Name</label>
                        </form>
                        <form class="form-floating my-2">
                            <input
                                type="Mobile Number"
                                class="form-control"
                                on:input={(event) =>
                                    handleChange(event, setting.dealerNumber)}
                                id="floatingInputValue"
                                value={setting.dealerNumber}
                            />
                            <label for="floatingInputValue">Mobile Number</label
                            >
                        </form>
                        <form class="form-floating my-2">
                            <input
                                type="Email"
                                class="form-control"
                                on:input={(event) =>
                                    handleChange(event, setting.dealerEmail)}
                                id="floatingInputValue"
                                value={setting.dealerEmail}
                            />
                            <label for="floatingInputValue">Email</label>
                        </form>
                    </div>
                </div>
                <div class="float-end">
                    <button
                        class="btn btn-success my-2 col-2"
                        class:invisible={saveIsVisible}
                        on:click|preventDefault={handleSave}>Save</button
                    >
                </div>
                <div class="card-footer text-muted">Click to edit</div>
            </div>
        {/each}
    </div>
    <div class="my-2 col-5">
        <a class="link-unstyled" href="/admin">
            <div class="row ">
                <div class="col-xl-4 col-md-2">
                    <div class="widget widget-stats bg-blue">
                        <div
                            class="stats-info border-bottom border-2 border-light"
                        >
                            <h4 class="text-center">Total Cars</h4>
                        </div>
                        <h2 class="text-center mt-2">57</h2>
                    </div>
                </div>
                <div class="col-xl-4 col-md-2">
                    <div class="widget widget-stats bg-success text-light">
                        <div
                            class="stats-info border-bottom border-2 border-light"
                        >
                            <h4 class="text-center">Public Cars</h4>
                        </div>
                        <h2 class="text-center mt-2">40</h2>
                    </div>
                </div>
                <div class="col-xl-4 col-md-2">
                    <div class="widget widget-stats bg-secondary text-light">
                        <div
                            class="stats-info border-bottom border-2 border-light"
                        >
                            <h4 class="text-center">Private Cars</h4>
                        </div>
                        <h2 class="text-center mt-2">17</h2>
                    </div>
                </div>
            </div>
        </a>
        <!-- contacts -->
        <a class="link-unstyled" href="/admin/contacts">
            <div class="row">
                <div class="col-xl-5 widget widget-stats bg-blue mx-3">
                    <div
                        class="stats-info  border-bottom border-2 border-light"
                    >
                        <h4 class="text-center">General Inquiries</h4>
                    </div>
                    <h2 class="text-center mt-2">24</h2>
                </div>
                <div class="col-xl-5 widget widget-stats bg-slate">
                    <div
                        class="stats-info  border-bottom border-2 border-light"
                    >
                        <h4 class="text-center">Trade-Ins</h4>
                    </div>
                    <h2 class="text-center mt-2">8</h2>
                </div>
            </div>
        </a>
        <!-- Testimonials -->
        <a class="link-unstyled" href="/admin/testimonials">
            <div class="row">
                <div class="col-xl-5 widget widget-stats bg-blue mx-3">
                    <div
                        class="stats-info  border-bottom border-2 border-light"
                    >
                        <h4 class="text-center">Testimonials</h4>
                    </div>
                    <h2 class="text-center mt-2">53</h2>
                </div>
                <div class="col-xl-5 widget widget-stats bg-success">
                    <div
                        class="stats-info  border-bottom border-2 border-light"
                    >
                        <h4 class="text-center">Approved</h4>
                    </div>
                    <h2 class="text-center mt-2">19</h2>
                </div>
            </div>
        </a>
    </div>
</div>

<style>
    .widget.widget-stats {
        /* position: relative; */
        color: #fff;
        padding: 0.9375rem;
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
        background-color: #348fe2 !important;
    }
    .bg-slate {
        background-color: palevioletred !important;
    }
    .link-unstyled,
    .link-unstyled:link,
    .link-unstyled:hover {
        color: inherit;
        text-decoration: inherit;
    }
</style>
