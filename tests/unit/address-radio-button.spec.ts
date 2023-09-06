import { shallowMount } from '@vue/test-utils';
import AddressComponent from '@/components/auth/registration/HeaderSecondStep.vue';

describe('AddressComponent.vue', () => {
  it('renders billing and shipping address titles', () => {
    const wrapper = shallowMount(AddressComponent);

    const h2Elements = wrapper.findAll('h2');

    const shippingTitle = h2Elements[0].text();

    expect(shippingTitle).toBe('Shipping address');

    const billingTitle = h2Elements[1].text();

    expect(billingTitle).toBe('Billing address');
  });
});
