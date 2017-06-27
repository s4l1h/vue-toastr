export default {
    template: `<div class="toast-progress" v-bind:style="style"></div>`,
    props: ['data'],
    data() {
        return {
            intervalId: false,
            hideEta: false,
            style: {
                width: '100%'
            }
        }
    },
    mounted() {
        this.hideEta = new Date().getTime() + this.data.timeout;
        this.setTimer();
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
        updateProgress() {
            var diff = ((this.hideEta - (new Date().getTime())));
            var percentage = (diff / this.data.timeout) * 100;
            percentage = Math.floor(percentage);
            // console.log(diff, this.data.timeout, percentage)
            this.style.width = percentage + '%';
        }
    }

}