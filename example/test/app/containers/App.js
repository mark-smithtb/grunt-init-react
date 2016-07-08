import ConnectedApp, { App } from '~/src/app/containers/App';
import { Provider } from 'react-redux';
import React from 'react';
import { expect } from 'chai';
import { getMockStore } from '~/test/util';
import { mount } from 'enzyme';
import td from 'testdouble';
let options;

describe('<App />', () => {
  beforeEach(() => {
    const router = {
      router: {
        isActive: td.function(),
        createHref: td.function()
      }
    };
    options = {
      childContextTypes: router,
      context: router
    };
  });
  afterEach(() => td.reset());
  it('renders 1 app', () => {
    const wrapper = mount(
      <Provider store={getMockStore()}>
        <App />
      </Provider>,
      options
    );
    expect(wrapper.find('header')).to.have.length(1);
    expect(wrapper.find('footer')).to.have.length(1);
  });
  it('renders the connected App', () => {
    const wrapper = mount(
      <Provider store={getMockStore()}>
        <ConnectedApp />
      </Provider>,
      options
    );
    expect(wrapper.find('header')).to.have.length(1);
    expect(wrapper.find('footer')).to.have.length(1);
  });
});
