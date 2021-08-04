import { mount } from "@vue/test-utils";
import ToastProgress from "@/components/ToastProgress.vue";

describe("ToastProgress.vue", () => {
    it("renders props.percent when passed", () => {
        const percent = 100;
        const wrapper = mount(ToastProgress, {
            props: { percent },
        });
        expect(wrapper.html()).toContain("100%");
    });
});
