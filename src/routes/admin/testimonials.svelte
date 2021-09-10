<script>
    import { onMount } from "svelte";

    let testimonials = [];
    let allTestimonials = [];
    let status = 0;
    $: displayStatus = ["Pending", "Approved", "Rejected"][status];

    const filterTestimonials = (key) => {
        status = key;
        testimonials = allTestimonials.filter((it) => it.status === key);
    };

    const getTestimonials = async () => {
        const res = await fetch("http://localhost:3999/testimonials");
        allTestimonials = await res.json();
        filterTestimonials(0);
    };

    onMount(getTestimonials);
</script>

<div class="d-flex justify-content-center">
    <button
        class="btn btn-success "
        class:disabled={status === 1}
        on:click={() => filterTestimonials(1)}>Approved</button
    >
    <button
        class="btn btn-primary mx-3"
        class:disabled={status === 0}
        on:click={() => filterTestimonials(0)}>Pending</button
    >
    <button
        class="btn btn-danger"
        class:disabled={status === 2}
        on:click={() => filterTestimonials(2)}>Rejcted</button
    >
</div>

<h1 class="text-center my-2">{displayStatus} Testimonials</h1>
<div class="row row-cols-3 mt-3">
    {#each testimonials as testimonial}
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
