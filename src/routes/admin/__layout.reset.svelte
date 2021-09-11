<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
        <a class="navbar-brand" href="/admin">Admin</a>
        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a
                        class="nav-link active"
                        aria-current="page"
                        href="/admin/add-car">New Car</a
                    >
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/admin/contacts">Contacts</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/admin/testimonials"
                        >Testimonials</a
                    >
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="/admin/staff">Staff</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Settings</a>
                </li>
            </ul>
            <div class="d-flex">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</nav>

<main class="container">
    <slot />
</main>

<style>
    main {
        padding: 50px 10px;
    }
</style>
