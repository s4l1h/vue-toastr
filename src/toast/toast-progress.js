export default {
    template: `<div class="toast-progress" v-bind:style="style"></div>`,
    props: ['data'],
    data() {
        return {
            intervalId: false,
            hideEta: false,
            progressBarValue: this.data.progressBarValue,
            style: {
                width: '100%'
            }
        }
    },
    mounted() {
        if (this.progressBarValue === null) {
            this.hideEta = new Date().getTime() + this.data.timeout;
            this.setTimer();
        } else {
            this.updateProgress();
        }
    },
    destroyed() {
        clearInterval(this.intervalId);
    },
    methods: {
        setTimer() {
            // console.log(this.hideEta)
            this.intervalId = setInterval(() => {
                this.updateProgress();
            }, 10);
            //console.log(this.data.intervalId)
        },
        setValue(newValue) {
            this.progressBarValue = newValue;
            this.updateProgress();
        },
        updateProgress() {
            var percentage;
            if (this.progressBarValue === null) {
                var diff = ((this.hideEta - (new Date().getTime())));
                percentage = (diff / this.data.timeout) * 100;
                percentage = Math.floor(percentage);
                // console.log(diff, this.data.timeout, percentage)
                this.style.width = percentage + '%';
            } else {
                percentage = Math.floor(this.progressBarValue);
                this.style.width = percentage + '%';
            }
        }
    }

}