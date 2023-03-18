// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        var pass;
        firebase.database().ref('/'+firebase.auth().currentUser.uid).once('value',e=>{
            pass = e.val().pass_stage_1;
        }).then(()=>{
            this.judge(pass);
        })
    }

    update (dt) {
        
        
    }

    judge(e){
        console.log(e);
        if(e){
            this.getComponent(cc.Button).interactable = true;
        }else{
            this.getComponent(cc.Button).interactable = false;
        }
    }
}
