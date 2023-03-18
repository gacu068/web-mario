// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    
    @property({type:cc.AudioClip})
    powerup: cc.AudioClip = null;

    @property(cc.Node)
    timer:cc.Node = null;

    face:number = 1;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        
    }

    start () {

    }

    update (dt) {
        /*
        var lv = this.node.getComponent(cc.RigidBody).linearVelocity;
        lv.x = 100 * this.face * -1;
        this.node.getComponent(cc.RigidBody).linearVelocity = lv;
        //console.log(lv.x);
        */
    }

    onBeginContact(contact, self, other){
        if(other.node.name == 'player'){
            this.node.destroy();
            other.node.getComponent('player').second_life = 1.5;
            //other.node.getComponent('player').score += 300;
            other.node.getComponent('player').add_time(30);
            cc.audioEngine.playEffect(this.powerup,false);
        }/*else if(other.node.name == 'wall'){
            if(this.face == 1)this.face = -1;
            else this.face = 1;
            console.log(this.face);
        }*/
    }
}
