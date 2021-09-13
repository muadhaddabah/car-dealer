<script>
    import { onMount } from "svelte";
    import Testimonial from "./components/testimonial.svelte";

    let testimonials = [];
    let allTestimonials = [];
    let status = 0;
    $: displayStatus = ["Pending", "Approved", "Rejected"][status];

    const getTestimonials = async () => {
        const res = await fetch("http://localhost:3999/testimonials");
        allTestimonials = await res.json();
        filterTestimonials(0);
    };

    const approveTestimonial = async (id) => {
        console.log(id);
        const res = await fetch(`http://localhost:3999/testimonials/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ status: 1 }),
            headers: {
                "content-type": "application/json",
            },
        });
        if (res.ok) {
            await getTestimonials();
        }
    };

    const rejectTestimonial = async (id) => {
        console.log(id);
        const res = await fetch(`http://localhost:3999/testimonials/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ status: 2 }),
            headers: {
                "content-type": "application/json",
            },
        });
        if (res.ok) {
            await getTestimonials();
        }
    };

    const filterTestimonials = (key) => {
        status = key;
        testimonials = allTestimonials.filter((it) => it.status === key);
    };

    onMount(getTestimonials);
</script>

<div class="d-flex justify-content-center">
    <button
        class="btn btn-success "
        class:disabled={status === 1}
        on:click={() => filterTestimonials(1)}
        ><i class="fas fa-check-double mx-1" />Approved</button
    >
    <button
        class="btn btn-primary mx-3"
        class:disabled={status === 0}
        on:click={() => filterTestimonials(0)}>Pending</button
    >
    <button
        class="btn btn-danger"
        class:disabled={status === 2}
        on:click={() => filterTestimonials(2)}
        ><i class="fas fa-trash-alt px-1" />Deleted</button
    >
</div>

<h1 class="text-center my-2">{displayStatus} Testimonials</h1>
<div class="row row-cols-3 mt-3">
    {#each testimonials as testimonial}
        <div class="col my-1">
            <div class="card">
                <h5 class="card-header">{testimonial.name}</h5>
                <div class="card-body">
                    <p class="card-text">
                        "{testimonial.testimonial}"
                    </p>
                </div>
                <div class="card-footer d-flex justify-content-end">
                    <button
                        type="button"
                        on:click={() => approveTestimonial(testimonial.id)}
                        class="btn btn-success mx-1"
                        ><i class="far fa-check-circle mx-1" />Approve</button
                    >

                    <button
                        type="button"
                        on:click={() => rejectTestimonial(testimonial.id)}
                        class="btn btn-danger"
                        ><i class="fas fa-trash-alt m-1" />Delete</button
                    >
                </div>
            </div>
        </div>

        <!-- {#if testimonial.length} -->
        <!-- <Testimonial {approveTestimonial} {rejectTestimonial} /> -->
        <!-- {/if} -->
    {/each}
</div>
