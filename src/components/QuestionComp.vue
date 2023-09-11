<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

  <div class="container-xl" v-if="isLogged()">
    <div class="bread-crumb">
      <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/subject">Subject</router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link :to="'/chapter/'+subjId">{{subjectname}}</router-link>
          </li>
          <li class="breadcrumb-item" aria-current="page"><span style="color:black">{{chapName}}</span></li>
        </ol>
      </nav>
    </div>
    <div class="table-responsive">
      <div class="table-wrapper">
        <div class="table-title">
          <div class="row">
            <div class="col-sm-6">
              <h2>Manage <b>Questions</b> of<br>{{this.chapName}}</h2>
            </div>
            <div class="col-sm-6">
              <a href="#" class="btn btn-success" data-toggle="modal" @click="importQuestion"><i
                  class="material-icons">&#xE147;</i> <span>Import Questions</span></a>
              <a href="#" class="btn btn-success" data-toggle="modal" @click="addQuestion"><i
                  class="material-icons">&#xE147;</i> <span>Add New Questions</span></a>
              <a href="#" class="btn btn-danger" data-toggle="modal" @click="deleteMany"><i class="material-icons">&#xE15C;</i>
                <span>Delete</span></a>
            </div>
          </div>
        </div>
        <table class="table table-striped table-hover">
          <thead>
          <tr>
            <th>
							<span class="custom-checkbox">
								<input type="checkbox" id="selectAll" @change="checkAll($event)">
								<label for="selectAll"></label>
							</span>
            </th>
            <th>Question</th>
            <th>Image</th>
            <th>Answers</th>
            <th>Solution</th>
            <th>Feedback</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <QuestionItem :questprops="quest" v-for="quest in questions" :key="quest.qid" @checkMed="check"
          @deleteQuest="deleteQuestion"
          @editQuest="editQuestion"/>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div v-else style="margin-top: 40px"> <h2>Bạn phải đăng nhập để xem được trang này!</h2> </div>
  <AddQuestion ref="addCo"/>
  <EditQuestion ref="editCo"/>
  <DeleteModal ref="deleteCo"
               @submitDelete="submitDelete"
               @sumitManyDelete="sumitDeleteMany"/>
</template>

<script>
import {Account} from "@/account";

global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

import axios from "axios";
import QuestionItem from "@/components/QuestionItem";
import AddQuestion from "@/components/AddQuestion";
import EditQuestion from "@/components/EditQuestion";
import DeleteModal from "@/components/DeleteModal";
import {LearnApi} from "@/data";

export default {
  name: "ChapterComp",
  components: {
    QuestionItem,
    AddQuestion,
    EditQuestion,
    DeleteModal
  },
  methods: {
    isLogged(){
      return Account.isLogged()
    },
    addQuestion(){
      this.$refs.addCo.appear(this.chapId);
    },
    editQuestion(qid){
      this.$refs.editCo.appear(qid,this.chapId);
    },
    deleteQuestion(qid){
      this.$refs.deleteCo.appear(qid);
    },
    deleteMany(){
      this.$refs.deleteCo.appear();
    },
    sumitDeleteMany(){
      let listId = [];
      $("input:checkbox[name='options[]']").each((i,cb)=>{
        console.log(cb.checked)
        if(cb.checked) {
          let cbId = cb.id.substring(8);
          console.log(cbId)
          listId.push(cbId)
        }
      })
      axios.put(LearnApi.link+"api/objectivetest/"+this.chapId+"/question/many",listId).then(function (response){
        console.log(response)
        $("#deleteRecord").css("display","none");
        location.reload();
      });
    },
    importQuestion(){
      var input = document.createElement("input");
      let chapId = this.chapId;
      input.type = "file";
      input.click();
      input.addEventListener("change", handleFiles, false);
      function handleFiles() {
        const fileList = this.files;
        console.log(fileList[0])
        let reader = new FileReader();
        reader.addEventListener("loadend", () => {
          let data = {
            name: fileList[0].name,
            content: reader.result
          }
          console.log(data)
          axios.post(LearnApi.link+"api/objectivetest/upload/"+chapId,data).then(response=>{
            console.log(response)
            location.reload();
          })
        });
        reader.readAsText(fileList[0]);
      }
      console.log("Tai file len");
    },
    submitDelete(qid){
      axios.delete(LearnApi.link+"api/objectivetest/"+this.chapId+"/question/"+qid).then(function (response){
        console.log(response)
        $("#deleteRecord").css("display","none");
        location.reload();
      });
    },
    checkAll(event) {
      if (event.target.checked)
        $("input:checkbox[name='options[]']").prop('checked', true);
      else
        $("input:checkbox[name='options[]']").prop('checked', false);
    },
    check(event) {
      if (!event.target.checked)
        $("#selectAll").prop('checked', false);
    }
  },
  data() {
    console.log(this.$route.params.chapid)
    return {
      chapId: this.$route.params.chapid,
      subjId:"",
      subjectname:"",
      chapName: "",
      questions:[]
    };
  },
  mounted() {
    axios.get(LearnApi.link+"api/objectivetest/" + this.chapId)
        .then(response => {
          let chapter = response.data
          this.chapName = chapter.testName
          this.questions = chapter.questions
          this.subjId = chapter.subjId
          axios.get(LearnApi.link+"api/subject/" + chapter.subjId)
              .then(response => {
                this.subjectname = response.data.name
              })
          console.log(chapter)
          console.log(this.questions)
        })
  }
}
</script>

<style scoped>
body {
  color: #566787;
  background: #f5f5f5;
  font-family: 'Varela Round', sans-serif;
  font-size: 13px;
}

.table-responsive {
  margin: 30px 0;
}

.table-wrapper {
  background: #fff;
  padding: 20px 25px;
  border-radius: 3px;
  min-width: 1000px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
}

.table-title {
  padding-bottom: 15px;
  background: #435d7d;
  color: #fff;
  padding: 16px 30px;
  min-width: 100%;
  margin: -20px -25px 10px;
  border-radius: 3px 3px 0 0;
}

.table-title h2 {
  margin: 5px 0 0;
  font-size: 24px;
}

.table-title .btn-group {
  float: right;
}

.table-title .btn {
  color: #fff;
  float: right;
  font-size: 13px;
  border: none;
  min-width: 50px;
  border-radius: 2px;
  border: none;
  outline: none !important;
  margin-left: 10px;
}

.table-title .btn i {
  float: left;
  font-size: 21px;
  margin-right: 5px;
}

.table-title .btn span {
  float: left;
  margin-top: 2px;
}

table.table tr th, table.table tr td {
  border-color: #e9e9e9;
  padding: 12px 15px;
  vertical-align: middle;
}

table.table tr th:first-child {
  width: 60px;
}

table.table tr th:last-child {
  width: 100px;
}

table.table-striped tbody tr:nth-of-type(odd) {
  background-color: #fcfcfc;
}

table.table-striped.table-hover tbody tr:hover {
  background: #f5f5f5;
}

table.table th i {
  font-size: 13px;
  margin: 0 5px;
  cursor: pointer;
}

table.table td:last-child i {
  opacity: 0.9;
  font-size: 22px;
  margin: 0 5px;
}

table.table td a {
  font-weight: bold;
  color: #566787;
  display: inline-block;
  text-decoration: none;
  outline: none !important;
}

table.table td a:hover {
  color: #2196F3;
}

table.table td a.edit {
  color: #FFC107;
}

table.table td a.delete {
  color: #F44336;
}

table.table td i {
  font-size: 19px;
}

table.table .avatar {
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 10px;
}

.pagination {
  float: right;
  margin: 0 0 5px;
}

.pagination li a {
  border: none;
  font-size: 13px;
  min-width: 30px;
  min-height: 30px;
  color: #999;
  margin: 0 2px;
  line-height: 30px;
  border-radius: 2px !important;
  text-align: center;
  padding: 0 6px;
}

.pagination li a:hover {
  color: #666;
}

.pagination li.active a, .pagination li.active a.page-link {
  background: #03A9F4;
}

.pagination li.active a:hover {
  background: #0397d6;
}

.pagination li.disabled i {
  color: #ccc;
}

.pagination li i {
  font-size: 16px;
  padding-top: 6px
}

.hint-text {
  float: left;
  margin-top: 10px;
  font-size: 13px;
}

/* Custom checkbox */
.custom-checkbox {
  position: relative;
}

.custom-checkbox input[type="checkbox"] {
  opacity: 0;
  position: absolute;
  margin: 5px 0 0 3px;
  z-index: 9;
}

.custom-checkbox label:before {
  width: 18px;
  height: 18px;
}

.custom-checkbox label:before {
  content: '';
  margin-right: 10px;
  display: inline-block;
  vertical-align: text-top;
  background: white;
  border: 1px solid #bbb;
  border-radius: 2px;
  box-sizing: border-box;
  z-index: 2;
}

.custom-checkbox input[type="checkbox"]:checked + label:after {
  content: '';
  position: absolute;
  left: 6px;
  top: 3px;
  width: 6px;
  height: 11px;
  border: solid #000;
  border-width: 0 3px 3px 0;
  transform: inherit;
  z-index: 3;
  transform: rotateZ(45deg);
}

.custom-checkbox input[type="checkbox"]:checked + label:before {
  border-color: #03A9F4;
  background: #03A9F4;
}

.custom-checkbox input[type="checkbox"]:checked + label:after {
  border-color: #fff;
}

.custom-checkbox input[type="checkbox"]:disabled + label:before {
  color: #b8b8b8;
  cursor: auto;
  box-shadow: none;
  background: #ddd;
}

/* Modal styles */
.modal .modal-dialog {
  max-width: 400px;
}

.modal .modal-header, .modal .modal-body, .modal .modal-footer {
  padding: 20px 30px;
}

.modal .modal-content {
  border-radius: 3px;
  font-size: 14px;
}

.modal .modal-footer {
  background: #ecf0f1;
  border-radius: 0 0 3px 3px;
}

.modal .modal-title {
  display: inline-block;
}

.modal .form-control {
  border-radius: 2px;
  box-shadow: none;
  border-color: #dddddd;
}

.modal textarea.form-control {
  resize: vertical;
}

.modal .btn {
  border-radius: 2px;
  min-width: 100px;
}

.modal form label {
  font-weight: normal;
}
.bread-crumb{
}
</style>