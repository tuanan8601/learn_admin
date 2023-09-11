<template>
  <div id="addQuestion" class="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <form>
          <div class="modal-header">
            <h4 class="modal-title">Add Question</h4>
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="disappear()">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Name</label>
              <input id="question" type="text" class="form-control" required>
            </div>
            <div class="form-group">
              <label>Image</label>
              <input id="image" type="text" class="form-control">
            </div>
            <div class="form-group">
              <label>Answers</label>
              <textarea id="answers" type="text" class="form-control" style="height: 120px" required/>
            </div>
            <div class="form-group">
              <label>Solution Head</label>
              <input id="solutionHead" type="text" class="form-control" required>
            </div>
            <div class="form-group">
              <label>Feedback</label>
              <input id="feedback" type="text" class="form-control">
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
  name: "AddQuestion",
  methods: {
    appear(chapId) {
      this.chapId = chapId
      $("#addQuestion").css("display", "block");
    },
    disappear() {
      $("#addQuestion").css("display", "none");
    },
    add(){
      let answerList = []
      let solution = ""
      let stranswer = $("#answers").val()
      let result = stranswer.split(/\r?\n/);
      for (let i = 0; i < result.length; i++) {
        console.log(result[i])
        if(result[i].trim()!="") {
          let answer = {
            answer: result[i],
            answerHead: result[i].substring(0, 1)
          }
          answerList.push(answer)
          if (answer.answer.substring(0, 1) == ($("#solutionHead").val().substring(0, 1)))
            solution = answer.answer;
        }
      }
      let data=
          {
            title:$("#question").val(),
            answers:answerList,
            solution:solution,
            solutionHead:$("#solutionHead").val(),
            feedback:$("#feedback").val(),
            image:$("#image").val()
          }
      if (data.feedback.trim()=="") data.feedback = null;
      if (data.image.trim()=="") data.image = null;
      console.log(data)
      axios.post(LearnApi.link+"api/objectivetest/"+this.chapId+"/question/add",
          data).then(function (response){
        console.log(response)
        $("#addQuestion").css("display","none");
        location.reload();
      });
    }
  },
  data(){
    return{
      chapId:""
    }
  }
}
</script>

<style scoped>

</style>