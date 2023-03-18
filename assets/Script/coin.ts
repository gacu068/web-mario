// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onLoad () {
        
    }

    start () {
        
        let easeRate: number = 2;
        let action : cc.Action;
        let action1 = cc.moveBy(1,0,30);
        let action2 = cc.fadeTo(1,0)
        let spawn1 = cc.spawn(action1,action2);
        this.node.runAction(spawn1);
        this.scheduleOnce(this.des,2.2)
    }

    des(){this.node.destroy();}
        
    
    // update (dt) {}

}

