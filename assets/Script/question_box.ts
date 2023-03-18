// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    mush:cc.Prefab = null;

    @property(cc.Prefab)
    coin:cc.Prefab = null;

    @property({type:cc.AudioClip})
    mush_effect: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    coin_effect: cc.AudioClip = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        
    }

    start () {
        this.node.getComponent(cc.Animation).play('box');
    }

    // update (dt) {}

    onBeginContact(contact, self, other){
        if(other.node.name == 'player'){
            if(contact.getWorldManifold().normal.y==-1 && contact.getWorldManifold().normal.x==0){
                if(this.mush != null)this.make_mush();
                if(this.coin != null){
                    other.node.getComponent('player').score += 100;
                    console.log(other.node.getComponent('player').score);
                    this.make_coin();
                }
                this.node.destroy();
            }
            /*
            console.log("x is" + contact.getWorldManifold().normal.x);
            console.log("y is" + contact.getWorldManifold().normal.y);
            */
        }
        /*
        console.log(other.node.name);
        console.log("x is" + contact.getWorldManifold().normal.x);
        console.log("y is" + contact.getWorldManifold().normal.y);
        */
    }

    make_mush(){
        let scene = cc.director.getScene();
        let mushroom = cc.instantiate(this.mush);
        let pos = this.node.position;

        mushroom.parent = this.node.parent;
        mushroom.setPosition(cc.v2(this.node.getPosition().x,this.node.getPosition().y+40))
        cc.audioEngine.playEffect(this.mush_effect,false);
        //console.log(this.node.getPosition().x);
        //console.log(this.node.getPosition().y);
    }

    make_coin(){
        let scene = cc.director.getScene();
        let coin = cc.instantiate(this.coin);
        let pos = this.node.position;

        coin.parent = this.node.parent;
        coin.setPosition(cc.v2(this.node.getPosition().x,this.node.getPosition().y+30))
        cc.audioEngine.playEffect(this.coin_effect,false);
        //console.log(this.node.getPosition().x);
        //console.log(this.node.getPosition().y);
    }
}
