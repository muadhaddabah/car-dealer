<script>
    export let testimonials;
    export let approveTestimonial = () => {};
    export let rejectTestimonial = () => {};
</script>

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
                    class="btn btn-success mx-1">Approve</button
                >

                <button
                    type="button"
                    on:click={() => rejectTestimonial(testimonial.id)}
                    class="btn btn-danger">Reject</button
                >
            </div>
        </div>
    </div>
{/each}
