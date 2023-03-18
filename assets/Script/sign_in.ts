// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
//declare const firebase: any;

@ccclass
export default class sign_in extends cc.Component {

    @property(cc.Node)
    account: cc.Node = null;

    @property(cc.Node)
    password: cc.Node = null;

    @property(cc.Node)
    username: cc.Node = null;

    


    loadGameScene3(){
        var username_value = this.username.getComponent(cc.EditBox).string;
        var password_value = this.password.getComponent(cc.EditBox).string;
        var account_value = this.account.getComponent(cc.EditBox).string;
        cc.log("sign in");
        firebase.auth().createUserWithEmailAndPassword(account_value, password_value).then(function(result){
            var id = firebase.auth().currentUser.uid;
            firebase.database().ref(id).set({
                name:username_value,
                id:id,
                mail:account_value,
                life:5,
                pass_stage_1:false,
                score:0
            }).then(function(result){
                cc.director.loadScene("stage_select");
            })
        }).catch(function(error){
            console.log(error.message);
            alert("fail");
        });
        //cc.log(this.username.getComponent(cc.EditBox).string);
        //cc.director.loadScene("stage1");
    }

    loadGameScene4(){
        var password_value = this.password.getComponent(cc.EditBox).string;
        var account_value = this.account.getComponent(cc.EditBox).string;
        cc.log("log in");
        cc.log(account_value);
        //cc.director.loadScene("stage1");
        
        firebase.auth().signInWithEmailAndPassword(account_value, password_value).then(function(result){
            cc.director.loadScene("stage_select");
        }).catch(function(error){
            console.log(error.message);
            alert("fail");
        });
        
        //cc.log(this.username.getComponent(cc.EditBox).string);
        
    }

    onLoad () {}

    start () {

    }

    // update (dt) {}
}
