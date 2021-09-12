<script>
    export let contacts;
    export let handleDelete = () => {};
    export let handleSaveForLater = () => {};
</script>

{#each contacts as contact}
    <div class="card mb-3" style="max-width: 800px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img
                    src="https://picsum.photos/300/340"
                    class="img-fluid rounded-start border-end"
                    alt="..."
                />
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <small class="d-flex text-muted fs-6 justify-content-end"
                        >{contact.Date}</small
                    >
                    <h5 class="card-title">
                        {contact.FirstName}
                        {contact.LastName}
                    </h5>
                    <h6 class="card-subtitle mb-2 text-muted">
                        <i class="fas fa-mobile-alt fa-md mx-1" />
                        {contact.Phone}
                    </h6>
                    <h6 class="card-subtitle mb-2 text-muted">
                        <i class="fas fa-envelope fa-md mx-1" />
                        {contact.Email}
                    </h6>
                    <div class="my-3 border-top">
                        <h5>
                            {contact.Year}
                            {contact.Make}
                            {contact.Model}
                        </h5>
                        <div class="row">
                            <h6 class="col">
                                Mileage: {contact.Mileage}
                            </h6>
                            <h6 class="col">
                                Condition: {contact.Condition}
                            </h6>
                        </div>
                    </div>
                    <h6 class="card-subtitle text-muted">Comment:</h6>
                    <p class="card-text">
                        {contact.Comment}
                    </p>
                </div>
                <div class="d-flex card-footer justify-content-end">
                    <div
                        class="btn-group"
                        role="group"
                        aria-label="Basic mixed styles example"
                    >
                        <button
                            type="button"
                            on:click={() => handleDelete(contact.id)}
                            class="btn btn-danger mx-1">Delete</button
                        >

                        <button
                            type="button"
                            on:click={() => handleSaveForLater(contact.id)}
                            class="btn btn-success">Mark as Read</button
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
{/each}
