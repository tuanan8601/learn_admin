<template>
  <div id="addChapter" class="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <form>
          <div class="modal-header">
            <h4 class="modal-title">Add Chapter</h4>
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="disappear()">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Name</label>
              <input id="name" type="text" class="form-control" required>
            </div>
          </div>
          <div class="modal-footer">
            <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" @click="disappear()">
            <input type="button" class="btn btn-success" value="Add" @click="add()">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {LearnApi} from "@/data";
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;
export default {
  name: "AddChapter",
  methods: {
    appear(subjectId) {
      this.subjId=subjectId
      $("#addChapter").css("display", "block");
    },
    disappear() {
      $("#addChapter").css("display", "none");
    },
    add(){
      let data = {testName:$("#name").val(),
        subjId:this.subjId}
      console.log(data);
      axios.post(LearnApi.link+"api/objectivetest/add",
          data
      ).then(function (response){
        console.log(response)
        $("#addChapter").css("display","none");
        location.reload();
      });
    }
  },
  data(){
    return {
      subjId:""
    }
  }
}
</script>

<style scoped>

</style>