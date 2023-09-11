<template>
  <div id="editChapter" class="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <form>
          <div class="modal-header">
            <h4 class="modal-title">Edit Chapter</h4>
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="disappear">&times;
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Name</label>
              <input id="editName" type="text" class="form-control" required>
            </div>
          </div>
          <div class="modal-footer">
            <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" @click="disappear">
            <input type="button" class="btn btn-info" value="Save" @click="saveEdit">
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
  name: "EditChapter",
  methods: {
    appear(id) {
      this.chapId = id;
      console.log(this.chapId)
      axios.get(LearnApi.link+"api/objectivetest/" + this.chapId)
          .then(response => {
            this.chapter = response.data
            $("#editName").val(this.chapter.testName)
            console.log(this.chapter)
          })
      $("#editChapter").css("display", "block");
    },
    disappear() {
      $("#editChapter").css("display", "none");
    },
    saveEdit(){
      this.chapter.testName = $("#editName").val();
      this.chapter.id = null;
      this.chapter.subject_id = null;
      let data = this.chapter;
      console.log(data)
      axios.put(LearnApi.link+"api/objectivetest/" + this.chapId,
          data).then(response => {
        console.log(response)
        $("#editSubject").css("display", "none");
        location.reload()
      })
    }
  },
  data(){
    return{
      chapId:"",
      chapter:""
    }
  }
}
</script>

<style scoped>

</style>