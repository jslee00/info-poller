<template>
</template>

<script>
import pollerAPI from "../../api/pollerAPI";
import CONFIG from "../../config";
import CONSTANT from "../../constant";

export default {
  name: "logout",
  mounted: function() {
    this.$store.dispatch(CONSTANT.LOGOUT);
  }
};
</script>

<style scoped>

</style>
