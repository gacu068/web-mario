// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class enenmy extends cc.Component {

    
    @property()
    movetype: number = 1;

    @property()
    anima:string = 'enemy2_idle';

    @property({type:cc.AudioClip})
    die_effect: cc.AudioClip = null;

    @property({type:cc.AudioClip})
    power_down: cc.AudioClip = null;



    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        
    }

    platformMove(movetype: number, delayTime: number)
    {
        let easeRate: number = 2;
        let action : cc.Action;
        let action1 = cc.moveBy(2,0,-70);
        let action2 = cc.moveBy(2,0,70);
        let sequence1 = cc.sequence(action1,action2,cc.delayTime(2));

        if(movetype == 1){
            action = cc.repeatForever(sequence1);
        }

        this.scheduleOnce(()=>{
            this.node.runAction(action);
        },delayTime)

        //console.log("enemy1 move");
    }


    start () {
        this.platformMove(this.movetype, 1);
        this.node.getComponent(cc.Animation).play(this.anima);
    }

    

    onBeginContact(contact, self, other){
        if(other.node.name == 'player'){
            if(contact.getWorldManifold().normal.y==1 && contact.getWorldManifold().normal.x==0){
                if(other.node.getComponent('player').died == 0){
                    cc.audioEngine.playEffect(this.die_effect,false);
                    other.node.getComponent('player').score += 100;
                    this.node.destroy();
                }
            }else{
                if(other.node.getComponent('player').second_life == 1){
                    if(other.node.getComponent('player').died == 0){other.node.getComponent('player').die();}
                }else{
                    other.node.getComponent('player').score += 100;
                    this.node.destroy();
                    other.node.getComponent('player').second_life = 1;
                    cc.audioEngine.playEffect(this.power_down,false);
                }
            }
         
        }
        /*
        console.log(other.node.name);
        console.log("x is" + contact.getWorldManifold().normal.x);
        console.log("y is" + contact.getWorldManifold().normal.y);
        */
    }


    // update (dt) {}
}

