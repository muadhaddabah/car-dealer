<script>
    export let contacts;
</script>

{#each contacts as contact}
    <div class="col my-3">
        <div class="card text-dark bg-light" style="width: 18rem;">
            <!-- <img src="..." class="card-img-top" alt="..." /> -->
            <div class="card-body">
                <small class="d-flex text-muted fs-6  justify-content-end"
                    >{contact.Date}</small
                >
                <h5 class="card-title">
                    {contact.FirstName}
                    {contact.LastName}
                </h5>

                <h6 class="card-subtitle mb-2 text-muted">
                    <i class="fas fa-mobile-alt fa-lg mx-1" />
                    {contact.Phone}
                </h6>
                <h6 class="card-subtitle mb-2 text-muted">
                    <i class="fas fa-envelope fa-md mx-1" />
                    {contact.Email}
                </h6>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <h6 class="card-subtitle mb-1 text-muted">Message:</h6>
                    <p>
                        {contact.Comment}
                    </p>
                </li>
                <!-- <li class="list-group-item ">Actions?:</li> -->
            </ul>
        </div>
    </div>
{/each}
