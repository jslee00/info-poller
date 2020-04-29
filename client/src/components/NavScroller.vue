<template>
  <div class="nav-scroller bg-white box-shadow">
    <nav class="nav nav-underline">
      <a class="nav-link" v-for="(item, index) in submenu" :key="index" v-if="item.type=='link' && item.newPage" :href="item.to" target="_blank" tabindex="0">
        {{ item.text }}  
        <span v-if="item.badge > 0" class="badge badge-pill bg-light align-text-bottom">{{ item.badge }}</span>
      </a>
      <a class="nav-link" v-else-if="item.type=='link'" :href="item.to" tabindex="0">
        {{ item.text }}  
        <span v-if="item.badge > 0" class="badge badge-pill bg-light align-text-bottom">{{ item.badge }}</span>
      </a>
      <a class="nav-link" v-else-if="item.type=='function'" @click="item.to" tabindex="0">
        {{ item.text }}
        <span v-if="item.badge > 0" class="badge badge-pill bg-light align-text-bottom">{{ item.badge }}</span>
      </a>
      <router-link class="nav-link" v-else-if="item.type=='exact'" exact-active-class="active" :to="item.to">
        {{ item.text }}
        <span v-if="item.badge > 0" class="badge badge-pill bg-light align-text-bottom">{{ item.badge }}</span>
      </router-link>
      <router-link class="nav-link" v-else active-class="active" :to="item.to">
        {{ item.text }}
        <span v-if="item.badge > 0" class="badge badge-pill bg-light align-text-bottom">{{ item.badge }}</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "nav-scroller",
  props: ["submenu"]
};
</script>

<style scoped>
.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  color: rgba(255, 255, 255, 0.75);
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.nav-underline .nav-link {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 0.875rem;
  color: var(--secondary);
  text-decoration: none;
  cursor: pointer;
}

.nav-underline .nav-link:hover {
  color: var(--blue);
}

.nav-underline .active {
  font-weight: bold;
  color: var(--gray-dark);
}
</style>
