import React from 'react';
import { Dimensions, PixelRatio } from 'react-native';
import { create, act } from 'react-test-renderer';
import { findAllByType, toBeCloseTo } from './utils';

import { Header } from '../../app/components';

const { height, width } = Dimensions.get('window');

jest.useFakeTimers();

expect.extend({
  // custom closeTo
  toBeCloseTo,
});

describe('Header', () => {
  let tree;
  act(() => {
    tree = create(<Header />);
  });
  const headerText = findAllByType(tree.toJSON(), 'Text'); // array
  const headerImages = findAllByType(tree.toJSON(), 'Image');

  it('Header width is set properly', () => {
    try {
      expect(tree.toJSON().props.style.width).toBeCloseTo({ value: width * 1.1, percentage: 80 });
    } catch (e) {
      expect(tree.toJSON().props.style.width).toBeCloseTo({ value: width, percentage: 75 });
    }
  });
  it('Header container has proper alignment', () => {
    expect(tree.toJSON().props.style).toEqual(
      expect.objectContaining({ alignItems: 'center', flexDirection: 'row', flex: 1 })
    );
  });
  it('Header has the right number of children', () => {
    expect(tree.toJSON().children.length).toBe(3);
  });
  it('Header has the right children', () => {
    expect(headerText.length).toBe(1);
    expect(headerImages.length).toBe(2);
  });
  it('Header text has the right font', () => {
    expect(headerText[0].children[0]).toBe('ensom');
    expect(headerText[0].props.style.fontFamily).toBe('SydneyBold');
  });
  it('Header text has the right style', () => {
    expect(headerText[0].props.style.fontSize).toBeCloseTo({
      value: PixelRatio.getFontScale() * height * 0.05,
      percentage: 5,
    });
  });
  it('Header images match in style', () => {
    expect(headerImages[0].props.style).toEqual(headerImages[1].props.style);
    // expect(JSON.stringify(headerImages[0].props.style)).toEqual(
    //   JSON.stringify(headerImages[1].props.style)
    // );
  });
  it('Header images have proper resizeMode in style', () => {
    expect(headerImages[0].props.style.resizeMode).toEqual('contain');
    expect(headerImages[1].props.style.resizeMode).toEqual('contain');
  });
  it('Header images have the right height and width', () => {
    headerImages.forEach((image) => {
      expect(image.props.style.height).toBeCloseTo({ value: height * 0.1 });
      expect(image.props.style.width).toBeCloseTo({ value: width * 0.1 });
    });
  });
});
