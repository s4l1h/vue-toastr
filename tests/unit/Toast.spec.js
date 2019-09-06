import { shallowMount } from '@vue/test-utils';
import Toast from '@/components/Toast.vue';

const mockProps = {
	data: {
		msg: 'Toast Msg',
		progressbar: false,
		timeout: 1000,
		title: 'Toast Title',
		type: 'error'
	}
};
describe('Toast.vue', () => {
	// it("default props value", () => {
	//   const wrapper = shallowMount(Toast, {});
	//   expect(wrapper.props()).toEqual(mockProps);
	// });

	it('renders props when passed', () => {
		const wrapper = shallowMount(Toast, {
			propsData: mockProps
		});
		expect(wrapper.props()).toEqual(mockProps);
	});

	it('match attributes', () => {
		const wrapper = shallowMount(Toast, {
			propsData: mockProps
		});
		expect(wrapper.attributes()).toEqual({
			class: 'toast toast-error',
			style: 'display: block;'
		});
	});
	it('match classNames', () => {
		const props = {
			data: { ...mockProps.data, classNames: [ 'animated', 'bounce' ] }
		};
		const wrapper = shallowMount(Toast, {
			propsData: props
		});
		expect(wrapper.attributes()).toEqual({
			class: 'toast toast-error animated bounce',
			style: 'display: block;'
		});
	});
	it('matches slot msg', () => {
		const wrapper = shallowMount(Toast, {
			propsData: mockProps,
			slots: {
				default: '<div class="fake-msg"></div>'
			}
		});
		expect(wrapper.contains('.fake-msg')).toBe(true);
	});

	it('matches snapshot', () => {
		const wrapper = shallowMount(Toast, {
			propsData: mockProps
		});
		expect(wrapper.html()).toMatchSnapshot();
	});
});
