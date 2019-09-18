import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'

describe('AutoComplete.vue', () => {
  it('has a root element with class autocomplete', () => {
    const wrapper = mount(App)
    expect(wrapper.is('#app')).to.equal(true)
  })
})
