import * as React from 'react';
import { shallow, mount } from 'enzyme';

const Foo = props => <div onClick={props.onClick} className="foo" />;

describe('foo', () => {
  it('work', async () => {
    const fn = jest.fn();
    const render = shallow(<Foo onClick={fn} />);

    const node = render.find('div');
    expect(node.props().className).toBe('foo');
    // node.simulate('click');

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
