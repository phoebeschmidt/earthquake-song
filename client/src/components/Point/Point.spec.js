import React from 'react';
import Point from './Point'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { Circle } from 'react-konva';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

describe("Point component", () => {
    let props, component;
    const shallowRenderWithProps = () => {
        component = shallow(<Point {...props} />);
    };

    beforeEach(() => {
        props = {
            x: -1,
            y: -1,
            mag: -1,
            playClip: undefined
        };
        shallowRenderWithProps();
    });

    it("Renders konva Circle component", () => {
        expect(component.find(Circle).length).toBe(1);
    });

    it("Passes x, y, and magnitude props to Circle", () => {
        const circle = component.find(Circle);
        const expected = <Circle x={props.x} y={props.y} radius={props.mag * component.state().radiusMultiplier} />;
        expect(circle.matchesElement(expected)).toBe(true);
    });

    it("If focused, the stroke of Circle is black", () => {
        component.setState({ isFocused: true});
        const circle = component.find(Circle);
        expect(circle.props().stroke).toBe("black");
    });

    it("If focused, the opacity of Circle is state.focusOpacity, otherwise state.unfocusOpacity", () => {
        let circle = component.find(Circle);
        expect(component.state().isFocused).toBe(false);
        expect(circle.props().opacity).toBe(component.state().unfocusOpacity);
        component.setState({ isFocused: true });
        circle = component.find(Circle);
        expect(circle.props().opacity).toBe(component.state().focusOpacity);
    });

    it("focusAndPlay shoudl call temporarilyFocus and props.playClip", () => {
        const temporarilyFocusMock = sinon.stub();
        const playClipMock = sinon.stub();
        props.playClip = playClipMock;
        shallowRenderWithProps();
        component.instance().temporarilyFocus = temporarilyFocusMock;
        component.instance().focusAndPlay();
        expect(temporarilyFocusMock.called).toBe(true);
        expect(playClipMock.called).toBe(true);
    });

});