import {expect} from 'chai'
import {mount} from '@vue/test-utils'
import AutoComplete from '@/components/AutoComplete.vue'

describe('AutoComplete.vue', () => {
  it('has a root element with class autocomplete', () => {
    const wrapper = mount(AutoComplete)
    expect(wrapper.is('.autocomplete')).to.equal(true)
  })

  it('sets the prop value', () => {
    const passedProp = []
    const wrapper = mount(AutoComplete, {
      propsData: {
        items: passedProp
      }
    })
    const li = wrapper.findAll('li')
    expect(li.length).to.equal(passedProp.length)
  })

  it('opened list', () => {
    const passedProp = [{id: 1, title: 'dfdfd'}, {id: 2, title: 'fhfhf'}]
    const wrapper = mount(AutoComplete, {
      propsData: {
        items: passedProp
      }
    })
    const input = wrapper.find('input')
    input.trigger('focus')
    input.trigger('input')
    expect(wrapper.vm.isOpen).to.equal(true)
    expect(wrapper.vm.results).to.eql(passedProp);
  })

  it('show menu on focus', () => {
    const passedProp = [{id: 1, title: 'dfdfd'}, {id: 2, title: 'fhfhf'}]
    const wrapper = mount(AutoComplete, {
      propsData: {
        items: passedProp
      }
    })
    const input = wrapper.find('input')
    input.trigger('focus')
    expect(wrapper.vm.isOpen).to.equal(true)
  })

  it('hide menu after select', () => {
    const passedProp = [{id: 1, title: 'dfdfd'}, {id: 2, title: 'fhfhf'}]
    const wrapper = mount(AutoComplete, {
      propsData: {
        items: passedProp
      }
    })
    const input = wrapper.find('input')
    input.trigger('focus')
    const li = wrapper.find('li')
    li.trigger('click')
    expect(wrapper.vm.isOpen).to.equal(false)
  })
})

describe('Key event tests', () => {
  it('arrowCounter is zero by default', () => {
    const wrapper = mount(AutoComplete)
    expect(wrapper.vm.arrowCounter).to.equal(0)
  })

  it('Down arrow key decrements arrowCounter by 1', () => {
    const passedProp = [{id: 1, title: 'dfdfd'}, {id: 2, title: 'fhfhf'}]
    const wrapper = mount(AutoComplete, {
      propsData: {
        items: passedProp
      }
    })
    const input = wrapper.find('input')
    input.trigger('focus')
    wrapper.vm.arrowCounter = 0
    input.trigger('keydown.down')
    expect(wrapper.vm.arrowCounter).to.equal(1)
  })

  it('Down arrow key increments arrowCounter by 1', () => {
    const passedProp = [{id: 1, title: 'some text'}, {id: 2, title: 'title'}]
    const wrapper = mount(AutoComplete, {
      propsData: {
        items: passedProp
      }
    })
    const input = wrapper.find('input')
    input.trigger('focus')
    wrapper.vm.arrowCounter = 1
    input.trigger('keydown.up')
    expect(wrapper.vm.arrowCounter).to.equal(0)
  })

})
