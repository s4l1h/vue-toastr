import template from './toast.html';
export default {
    template: template,
    props: ['data'],
    mounted () {
        //console.log("ready", this.data);
    },
    created() {
        //console.log("created", this.data);
        if (typeof this.data.timeout != "undefined" && this.data.timeout != 0) {
            setTimeout(function() {
                this.close();
            }.bind(this), this.data.timeout);
        }
    },
    methods: {
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
