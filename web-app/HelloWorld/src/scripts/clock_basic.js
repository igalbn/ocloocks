// Clock ⌚ //
document.addEventListener('DOMContentLoaded', () => {

let basicClock = new BasicClock(); 
});


class BasicClock{
    constructor(){
        this.postInit();
    }
    postInit(){

        this.makeClock();
        

    }
    makeClock(){
        this.clockElement = document.createElement('time');
        this.clockElement.textContent = glbC.BLANK_STR; 
        document.getElementById('app').appendChild(this.clockElement);
        this.updateClock();
        this.clockInterval = setInterval(()=>{this.updateClock()}, 1000);
    }
    updateClock(){
        let now = new Date();
        this.clockElement.textContent = `${now.getHours().toString().padStart(2,glbC.NUM_ZERO)}:${now.getMinutes().toString().padStart(2,glbC.NUM_ZERO)}:${now.getSeconds().toString().padStart(2,glbC.NUM_ZERO)}`;
        console.log(this.clockElement.textContent);
        // this.clockElement.textContent = glbC.BLANK_STR + "***"; 
    }
    removeClock(){

    }

}

