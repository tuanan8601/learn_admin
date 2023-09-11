import axios from "axios";
import {Cookie} from "@/cookie";
import {LearnApi} from "@/data";
export class Account {
    static _uid = null;

    static get uid() {
        return this._uid;
    }

    static set uid(value) {
        this._uid = value;
    }

    static isLogged(){
        return this._uid!=null&&this._uid.trim()!="";
    }

    static login(username,password,call){
        console.log(username+" - "+password);
        axios.get(LearnApi.link+"api/user/username/"+username)
            .then(response=>{
                console.log(response.data);
                if(response.data==null||response.data==""){
                    alert("Tên tài khoản không chính xác");
                }
                else if(response.data.password!=password){
                    alert("Mật khẩu không chính xác");
                }
                else if(response.data.role!="admin"){
                    alert("Bạn phải là admin mới có thể đăng nhập");
                }
                else {
                    this._uid = response.data.uid;
                    Cookie.setCookie("uid",this._uid,1);
                    alert("Đăng nhập thành công");
                    call();
                }
            })
    }
    static logout(){
        this._uid=null;
        Cookie.delete_cookie("uid")
    }
}