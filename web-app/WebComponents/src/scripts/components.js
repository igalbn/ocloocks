const templateClock = document.createElement('template');
templateClock.innerHTML = `
<style>
    time{
        background-color: MidnightBlue;
        color: floralwhite;
        user-select: none;
        font-size: 10vw;
        padding: 2vw;
        border-radius: 0.9vw;
    }
</style>

    <time></time>  
`;

class ClockApp extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(templateClock.content.cloneNode(true));

        this.makeClock();
    }

    makeClock(){
        this.clockElement = this.shadowRoot.querySelector('time');
        this.clockElement.textContent = '';
        this.updateClock();
        this.clockInterval = setInterval(()=>{this.updateClock()}, 1000);
    }
    updateClock(){
        let now = new Date();
        this.clockElement.textContent = `${now.getHours().toString().padStart(2,0)}:${now.getMinutes().toString().padStart(2,0)}:${now.getSeconds().toString().padStart(2,0)}`;
    }
}

window.customElements.define('clock-app', ClockApp);