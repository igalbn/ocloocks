console.log('My clock');
const templateClock = document.createElement('template');
templateClock.innerHTML = 
`
<style> 
[data-id="clock-container"]{
    user-select: none;
    padding: 0.5208vw;
    background: linear-gradient(135deg,  dodgerblue 0%,rgb(19, 189, 231) 100%);
    width: 8.1vw;
    height: 5.6vw;
    color: floralwhite;
    border-radius: 0.651vw;
    box-shadow: 0.1041vw 0.1041vw 0.1041vw grey;
    p{
        margin: 0;
        font-family: 'monofonto-rg';
        text-shadow: 0.0651vw 0.0976vw rgb(13, 88, 163);
    }
    [data-id="time"]{
        font-size: 2vw;
    }
}

[data-id="date"]{
    font-size: 1.6vw;
}

[data-id="day"]{
    font-size: 0.91vw;
    display:inline;
    float:left;
}
[data-id="indicator-day"]{
    font-size: 1.01vw;
    display:inline;
    float:right;
    padding-right: 0.1302vw;
}        

</style>

<div data-id="clock-container">
    <p data-id="time">@</p>
    <p data-id="date"></p>
    <p data-id="day"></p>
    <p data-id="indicator-day"></p>
</div>
`;

class ClockApp extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(templateClock.content.cloneNode(true));
        this.clockRefreshRate = 1000;
        this.timeSeparator = ':';
        this.dateSeparator = '-';
        this.otherDaySymbol = 'o';
        this.currentDaySymbol = '@';
        this.TWO_DIGITS = 2;
        this.NUM_ZERO = 0;
        this.NUM_ONE = 1;
        this.LEFT_CLICK = 0;
        this.RIGHT_CLICK = 2;

        this.showMinutes = true;
        this.showSeconds = true;
        this.showYear = true;

        //clipboard
        this.allowClipboard = true;// allow copy the date to clipboard
    }

    connectedCallback(){
        this.updateClock(); //prevent blank clock before the setInterval starts
        this.clockInterval = setInterval(()=>{
            this.updateClock();
        },this.clockRefreshRate);
    }

    disconnectedCallback() {
    }

    updateClock(){
        this.now = new Date();
        this.updateTime();
        this.updateDate();
        this.updateDay();
        this.updateIndicatorDay();
    }

    updateTime(){
        let currentTime = this.now.getHours().toString().padStart(this.TWO_DIGITS,this.NUM_ZERO);
        if (this.showMinutes){
            currentTime += (this.timeSeparator + this.now.getMinutes().toString().padStart(this.TWO_DIGITS,this.NUM_ZERO));
        }
        if (this.showSeconds)
        {
            currentTime += (this.timeSeparator + this.now.getSeconds().toString().padStart(this.TWO_DIGITS,this.NUM_ZERO));
        }
    
        const timeElement = this.shadowRoot.querySelector('[data-id="time"]');
        timeElement.textContent = currentTime;
    }
    updateDate(){
        let currentDate = this.now.getDate().toString().padStart(this.TWO_DIGITS,this.NUM_ZERO) + this.dateSeparator
        + this.now.getMonth().toString().padStart(this.TWO_DIGITS,this.NUM_ZERO);
        if (this.showYear){
            currentDate += (this.dateSeparator + this.now.getFullYear().toString());
        }

        const dateElement = this.shadowRoot.querySelector('[data-id="date"]');
        dateElement.textContent = currentDate;

        // Copy to clipboard. On left click copy the dd-mm-yyyy. On right the Date().
        dateElement.addEventListener('mousedown', (event) => {
            console.log(event.button);
            if (event.button === this.LEFT_CLICK){
                this.copyStrToClipboard(currentDate);
            }
            else if (event.button === this.RIGHT_CLICK){
                this.copyStrToClipboard(Date());
            }
        });
    }
    updateDay(){
        const dateString = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][this.now.getDay()];
        const dayElement = this.shadowRoot.querySelector('[data-id="day"]');
        dayElement.textContent = dateString;
    }
    updateIndicatorDay(){
        const SEVEN_DAYS = 7;
        let indicatorDayStr = this.otherDaySymbol.repeat(SEVEN_DAYS);
        const currentDayIndex = this.now.getDay();
        indicatorDayStr = indicatorDayStr.slice(this.NUM_ZERO, currentDayIndex) + this.currentDaySymbol + indicatorDayStr.slice(currentDayIndex + this.NUM_ONE);

        const indicatorDayElement = this.shadowRoot.querySelector('[data-id="indicator-day"]');
        indicatorDayElement.textContent = indicatorDayStr;
    }

    copyStrToClipboard(the_str){
                navigator.clipboard.writeText(the_str)
        .then(() => {
            console.log("String copied to clipboard successfully!");
        })
        .catch((error) => {
            console.error("Error copying string to clipboard:", error);
        });
        }
}

window.customElements.define('clock-app',ClockApp);