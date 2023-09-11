import { createApp } from 'vue'
import App from './App.vue'

import {createRouter, createWebHistory} from 'vue-router'
// import Home from './components/HelloWorld'
import Subject from './components/SubjectComp'
import Chapter from './components/ChapterComp'
import Question from "@/components/QuestionComp";
import LoginComponent from "@/components/LoginComponent";
import UserComp from "@/components/TestResult/UserComp";
import ResultComp from "@/components/TestResult/ResultComp";
import FormAnswerComp from "@/components/TestResult/FormAnswerComp";
const routes = [
    {
        path: '/',
        name: 'Login',
        component: LoginComponent,//shsould be imported
    },
    {
        path: '/subject',
        name: 'Subject',
        component: Subject,//shsould be imported
    },
    {
        path: '/chapter/:subjid',
        name: 'Chapter',
        component: Chapter,//shsould be imported
    },    {
        path: '/question/:chapid',
        name: 'Question',
        component: Question,//shsould be imported
    },    {
        path: '/user',
        name: 'User',
        component: UserComp,//shsould be imported
    },    {
        path: '/user/uid/:uid',
        name: 'UserbyId',
        component: UserComp,//shsould be imported
    },    {
        path: '/result/user/:uid',
        name: 'ResultUser',
        component: ResultComp,//shsould be imported
    },    {
        path: '/result/type/:type/id/:csid',
        name: 'ResultTypeId',
        component: ResultComp,//shsould be imported
    },    {
        path: '/fanswer/:formId',
        name: 'FAnswer',
        component: FormAnswerComp,//shsould be imported
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
createApp(App).use(router).mount('#app')