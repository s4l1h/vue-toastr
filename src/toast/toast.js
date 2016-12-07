import template from './toast.html';
export default {
    template: template,
    props: ['data'],
    mounted() {
        //console.log("ready", this.data);
    },
    created() {
        //console.log("created", this.data);
        if (typeof this.data.timeout != "undefined" && this.data.timeout != 0) {
            this.setTimeout();
        }
    },
    methods: {
        // Enter Hover
        onMouseOver() {
            //console.log("onMouseOver")
            if (typeof this.data.onMouseOver != "undefined") {
                this.data.onMouseOver();
            }
            if (!this.data.closeOnHover) {
                clearInterval(this.data.intervalId);
            }
        },
        // Leave Hover 
        onMouseOut() {
            //console.log("onMouseOut")
            if (typeof this.data.onMouseOut != "undefined") {
                this.data.onMouseOut();
            }
            if (!this.data.closeOnHover) {
                this.setTimeout();
            }
        },
        // Set timeout to close
        setTimeout() {
            //console.log("setTimeout")
            this.data.intervalId = setTimeout(function () {
                this.close();
            }.bind(this), this.data.timeout);
            //console.log(this.data.intervalId)
        },
        // Clicked Toast
        clicked() {
            if (typeof this.data.onClicked != "undefined") {
                this.data.onClicked();
            }
            this.cclose();
        },
        // Click Close?
        cclose() {
            if (typeof this.data.clickClose != "undefined" && this.data.clickClose == false) {
                return;
            }
            this.close();
        },
        // Close Toast
        close() {
            //console.log(typeof this.$parent, this);
            // if toast not manuel closed.
            if (this.$parent != null) {
                this.$parent.Close(this.data);
            }
        }
    }
}