import { shallowMount } from "@vue/test-utils"
import ToastProgress from "@/components/ToastProgress.vue"

describe("ToastProgress.vue", () => {
  it("default props value", () => {
    const wrapper = shallowMount(ToastProgress, {})
    expect(wrapper.props()).toEqual({ percent: 100 })
  })

  it("renders props.percent when passed", () => {
    const props = { percent: 90 }
    const wrapper = shallowMount(ToastProgress, {
      propsData: props
    })
    expect(wrapper.props()).toEqual(props)
  })

  it("match attributes", () => {
    const wrapper = shallowMount(ToastProgress, {
      propsData: { percent: 90 }
    })
    expect(wrapper.attributes()).toEqual({
      class: "toast-progress",
      style: "width: 90%;"
    })
  })

  it("matches snapshot", () => {
    const wrapper = shallowMount(ToastProgress, {
      propsData: { percent: 90 }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
