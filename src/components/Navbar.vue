<template>
  <div>
    <header class="navbar">
      <section class="navbar-section">

        <router-link to="/" class="btn btn-link" exact active-class="bg-primary text-light">Visual</router-link>
        <router-link to="/raw" class="btn btn-link" exact active-class="bg-primary text-light">Raw</router-link>

      </section>
    </header>

  </div>
</template>

<script>

export default {
  name: 'Navbar',
}
</script>


