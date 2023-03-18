// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class time extends cc.Component {

    @property()
    time: number = 300;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.time = 300;
        let action
        this.schedule(this.count,1)
    }

    update (dt) {
        this.node.getComponent(cc.Label).string = this.time.toString();
    }

    count(){
        this.time -= 1;
    }
}
