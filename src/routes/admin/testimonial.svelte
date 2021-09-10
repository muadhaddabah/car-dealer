<script>
    import { onMount } from "svelte";

    let testimonials = [];

    const getTestimonials = async () => {
        const res = await fetch("http://localhost:3999/testimonials");
        testimonials = await res.json();
    };

    onMount(getTestimonials);
</script>

<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
    <li class="nav-item" role="presentation">
        <button
            class="nav-link active"
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-home"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true">Active</button
        >
    </li>
    <li class="nav-item" role="presentation">
        <button
            class="nav-link"
            id="pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-profile"
            type="button"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false">Pending</button
        >
    </li>
    <li class="nav-item" role="presentation">
        <button
            class="nav-link btn-danger link-color-danger"
            id="pills-contact-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-contact"
            type="button"
            role="tab"
            aria-controls="pills-contact"
            aria-selected="false">Rejected</button
        >
    </li>
</ul>
<div class="tab-content" id="pills-tabContent">
    <div
        class="tab-pane fade show active"
        id="pills-home"
        role="tabpanel"
        aria-labelledby="pills-home-tab"
    >
        {#if testimonials.approved === true}
            <div class="row row-cols-3 g-4">
                {#each testimonials as testimonial}
                    <!-- start row-cols-md-3-->
                    <!-- <div class="row-cols-3"> -->
                    <div class="col">
                        <div class="card">
                            <!-- <img src="..." class="card-img-top" alt="..." /> -->
                            <h5 class="card-header">{testimonial.name}</h5>
                            <div class="card-body">
                                <p class="card-text">
                                    "{testimonial.testimonial}"
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- </div> -->
                    <!-- end -->
                {/each}
            </div>
        {:else}
            <p>you failed</p>
        {/if}
    </div>
    <div
        class="tab-pane fade"
        id="pills-profile"
        role="tabpanel"
        aria-labelledby="pills-profile-tab"
    >
        <!-- {#if testimonials.approved === true} -->
        <div class="row row-cols-3 g-4">
            {#each testimonials as testimonial}
                <!-- start row-cols-md-3-->
                <!-- <div class="row-cols-3"> -->
                <div class="col">
                    <div class="card">
                        <!-- <img src="..." class="card-img-top" alt="..." /> -->
                        <h5 class="card-header">{testimonial.name}</h5>
                        <div class="card-body">
                            <p class="card-text">
                                "{testimonial.testimonial}"
                            </p>
                        </div>
                    </div>
                </div>
                <!-- </div> -->
                <!-- end -->
            {/each}
        </div>
        <!-- {/if} -->
    </div>
    <div
        class="tab-pane fade"
        id="pills-contact"
        role="tabpanel"
        aria-labelledby="pills-contact-tab"
    >
        ...
    </div>
</div>
