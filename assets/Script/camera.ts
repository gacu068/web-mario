// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;

 

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {
        if(!this.player)return;

        let w_pos = this.player.convertToWorldSpaceAR(cc.v2(0,0));
        let n_pos = this.node.parent.convertToNodeSpaceAR(w_pos);
        if(n_pos.x>=0)this.node.position =cc.v3( n_pos.x , this.node.position.y , this.node.position.z);
        //console.log(n_pos.x);
    }
}
