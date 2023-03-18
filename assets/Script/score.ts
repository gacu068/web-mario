const {ccclass, property} = cc._decorator;

@ccclass
export default class score extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt) {
        this.node.getComponent(cc.Label).string = this.player.getComponent('player').score;
    }

    count(){
        
    }
}