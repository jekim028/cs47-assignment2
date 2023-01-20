import React from 'react';
import { Dimensions, PixelRatio } from 'react-native';
import { create, act } from 'react-test-renderer';
import { findAllByType, toBeCloseTo, toBeOf } from './utils';

import { Footer } from '../../app/components';
import { Themes } from '../../assets/Themes';

const isArr = Array.isArray;

const { height, width } = Dimensions.get('window');

jest.useFakeTimers();

expect.extend({
  toBeCloseTo,
  toBeOf,
});

describe('Footer', () => {
  let tree;
  act(() => {
    tree = create(<Footer />);
  });
  const headerTexts = findAllByType(tree.toJSON(), 'Text');
  const headerImages = findAllByType(tree.toJSON(), 'Image');

  it('Footer width is set properly', () => {
    try {
      expect(tree.toJSON().props.style.width).toBeCloseTo({ value: width * 1.1, percentage: 80 });
    } catch (e) {
      expect(tree.toJSON().props.style.width).toBeCloseTo({ value: width, percentage: 75 });
    }
  });
  it('Footer backgroundColor is set properly', () => {
    expect(tree.toJSON().props.style.backgroundColor).toBeOf([
      Themes.light.navigation,
      Themes.dark.navigation,
    ]);
  });
  it('Footer children are aligned properly', () => {
    expect(tree.toJSON().props.style).toEqual(
      expect.objectContaining({
        flexDirection: 'row',
      })
    );
  });
  it('Footer text children have the right font', () => {
    headerTexts.forEach((text) => {
      expect(text.children[0]).toBeOf(['Discover', 'Matches', 'DMs']);
      expect(text.props.style.fontFamily).toBe('Sydney');
    });
  });
  it('Footer text children have the right font color', () => {
    headerTexts.forEach((text) => {
      // TO DO - check if fontColor yields the same color
      expect(text.props.style.color).toBeOf([
        Themes.light.textSecondary,
        Themes.dark.textSecondary,
      ]);
    });
  });
  it('Footer text children have the right font size', () => {
    headerTexts.forEach((text) => {
      expect(text.props.style.fontSize).toBeCloseTo({
        value: PixelRatio.getFontScale() * height * 0.02,
        percentage: 5,
      });
    });
  });
  it('Footer icons have the same style', () => {
    expect(headerImages[0].props.style).toEqual(headerImages[1].props.style);
    expect(headerImages[0].props.style).toEqual(headerImages[2].props.style);
    expect(headerImages[1].props.style).toEqual(headerImages[2].props.style);
  });
  it('Footer icons have the right height, width and resizeMode', () => {
    headerImages.forEach((image) => {
      const style = image.props.style;
      if (isArr(style)) {
        expect(style).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              height: height * 0.05,
            }),
            expect.objectContaining({
              width: width * 0.1,
            }),
            expect.objectContaining({
              resizeMode: 'contain',
            }),
          ])
        );
      } else {
        expect(style).toEqual(
          expect.objectContaining({
            height: height * 0.05,
            width: width * 0.1,
            resizeMode: 'contain',
          })
        );
      }
    });
  });
});
