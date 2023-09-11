<template>
  <div id="editQuestion" class="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <form>
          <div class="modal-header">
            <h4 class="modal-title">Edit Question</h4>
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="disappear">&times;
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Question</label>
              <input id="edit_question" type="text" class="form-control" required>
            </div>
            <div class="form-group">
              <label>Image</label>
              <input id="edit_image" type="text" class="form-control">
            </div>
            <div class="form-group">
              <label>Answers</label>
              <textarea id="edit_answers" class="form-control" style="height: 120px" required/>
            </div>
            <div class="form-group">
              <label>Solution Head</label>
              <input id="edit_solutionHead" type="text" class="form-control" required>
            </div>
            <div class="form-group">
              <label>Feedback</label>
              <input id="edit_feedback" type="text" class="form-control">
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
  name: "EditQuestion",
  methods: {
    appear(id,chapId) {
      this.qid = id;
      this.chapId = chapId;
      axios.get(LearnApi.link+"api/objectivetest/"+this.chapId+"/question/" + this.qid)
          .then(response => {
            let question = response.data
            $("#edit_question").val(question.title)
            $("#edit_image").val(question.image)
            $("#edit_solutionHead").val(question.solutionHead)
            $("#edit_feedback").val(question.feedback)
            // eslint-disable-next-line no-unused-vars
            $("#edit_answers").val("")
            $.each(question.answers,function (i,v){
              $("#edit_answers").val($("#edit_answers").val()+v.answer+"\n")
            })
            console.log(question)
          })
      $("#editQuestion").css("display", "block");
    },
    disappear() {
      $("#editQuestion").css("display", "none");
    },
    saveEdit() {
      let answerList = []
      let solution = ""
      let stranswer = $("#edit_answers").val()
      let result = stranswer.split(/\r?\n/);
      for (let i = 0; i < result.length; i++) {
        console.log(result[i])
        if(result[i].trim()!="") {
          let answer = {
            answer: result[i],
            answerHead: result[i].substring(0, 1)
          }
          answerList.push(answer)
          if (answer.answer.substring(0, 1) == ($("#edit_solutionHead").val().substring(0, 1)))
            solution = answer.answer;
        }
      }
      let data=
          {
            title:$("#edit_question").val(),
            answers:answerList,
            solution:solution,
            solutionHead:$("#edit_solutionHead").val(),
            feedback:$("#edit_feedback").val(),
            image:$("#edit_image").val()
          }
      if (data.feedback.trim()=="") data.feedback = null;
      if (data.image.trim()=="") data.image = null;
      console.log(data)
      axios.put(LearnApi.link+"api/objectivetest/" + this.chapId+"/question/"+this.qid,
          data).then(response => {
        console.log(response)
        $("#editQuestion").css("display", "none");
        location.reload()
      })
    }
  },
  data(){
    return{
      qid:"",
      chapId:""
    }
  }
}
</script>

<style scoped>

</style>