<script>
    $: show = false;

    const staffMembers = [
        {
            FirstName: "Muad",
            LastName: "Hadd",
            Title: "Sales Rep",
            Phone: "(727) 275-6789",
            Email: "mhaa@gmail.som",
        },
        {
            FirstName: "jake",
            LastName: "statefarm",
            Title: "Sales rep",
            Phone: "7272727565",
            Email: "jakeforsstate@amdflad.com",
        },
        {
            FirstName: "Rick",
            LastName: "farm",
            Title: "Sales rep",
            Phone: "7275654452",
            Email: "rickfarm@amdflad.com",
        },
    ];
</script>

<!-- {#if show} -->
<div class="row">
    {#each staffMembers as staff}
        <div class="col">
            <div class="card" style="width: 18rem;">
                <!-- <img src="..." class="card-img-top" alt="..." /> -->
                <div class="card-body">
                    <h5 class="card-title">
                        {staff.FirstName}{staff.LastName}
                    </h5>

                    <h6 class="card-subtitle mb-2 text-muted">
                        {staff.Title}
                    </h6>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Phone: {staff.Phone}</li>
                    <li class="list-group-item">Email: {staff.Email}</li>
                </ul>
            </div>
        </div>
    {/each}
</div>
<!-- {/if} -->
