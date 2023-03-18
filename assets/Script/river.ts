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

     onLoad () {
        cc.director.getPhysicsManager().enabled = true;
     }

    start () {

    }

    // update (dt) {}

    onBeginContact(contact, self, other){
        if(other.node.name == 'player'){
            other.node.getComponent('player').die();
        }
        /*
        console.log(other.node.name);
        console.log("x is" + contact.getWorldManifold().normal.x);
        console.log("y is" + contact.getWorldManifold().normal.y);
        */
    }

}
