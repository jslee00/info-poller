<template>
  <div class="modal" id="change-array-modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">수정</h5>
        </div>
        <div class="modal-body">
          <div class="input-group" v-for="(item, index) in items" :key="index">
            <input class="form-control" :value="item">
            <div class="input-group-append">
              <button class="btn btn-outline-danger" @click="deleteItem(index)">-</button>
            </div>
          </div>
          <button class="btn btn-outline-success btn-block" @click="addItem">+</button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" onclick="history.back()">취소</button>
          <button type="button" class="btn btn-primary" @click="commitChange">확인</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "change-array-modal",
  props: ["mode"],
  mounted: function() {
    $("#change-array-modal").modal("show");
  },
  data: function() {
    return {
      items: ["월요일", "8교시"]
    };
  },
  methods: {
    addItem: function() {
      this.items.push("");
    },
    deleteItem: function(index) {
      this.items.splice(index, 1);
    },
    commitChange: function() {}
  }
};
</script>

<style scoped>
.input-group {
  margin-bottom: 10px;
}
</style>
