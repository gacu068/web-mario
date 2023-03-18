// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Menu extends cc.Component {;
    
    @property()
    stage:number = null;

    loadGameScene(){
        cc.log("change to login");
        cc.director.loadScene("log_in");
    }

    loadGameScene2(){
        cc.log("change to signin");
        cc.director.loadScene("sign_in");
    }


    loadGameScene5(){
        this.stage = 1;
        cc.log("change to stage1");
        cc.director.loadScene("stage1_loading");
    }

    loadGameScene6(){
        this.stage = 2;
        cc.log("change to stage2");
        cc.director.loadScene("stage2_loading");
    }

    loadGameScene7(){
        cc.log("change to welcome");
        cc.director.loadScene("welcome");
    }
}
