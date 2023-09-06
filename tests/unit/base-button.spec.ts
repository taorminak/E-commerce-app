import { shallowMount } from '@vue/test-utils';
import BaseButton from '@/components/ui/auth/BaseButton.vue';

describe('YourComponent.vue', () => {
  it('renders the close button when close prop is true', () => {
    const wrapper = shallowMount(BaseButton, {
      props: {
        close: true,
      },
    });

    const closeButton = wrapper.find('.button__close');
    const nextButton = wrapper.find('.button__next');

    expect(closeButton.exists()).toBe(true);
    expect(nextButton.exists()).toBe(false);

    expect(closeButton.find('.button-icon').exists()).toBe(true);
  });

  it('renders the next button when close prop is false', () => {
    const wrapper = shallowMount(BaseButton, {
      props: {
        close: false,
      },
    });

    const closeButton = wrapper.find('.button__close');
    const nextButton = wrapper.find('.button__next');

    expect(closeButton.exists()).toBe(false);
    expect(nextButton.exists()).toBe(true);

    expect(nextButton.find('span').exists()).toBe(true);
  });
});
