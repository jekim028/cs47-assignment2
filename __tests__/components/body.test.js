import React from 'react';
import { Dimensions, PixelRatio } from 'react-native';
import { create, act } from 'react-test-renderer';
import { findAllByType, toBeCloseTo, toBeOf } from './utils';
import { Profiles, Themes } from '../../assets/Themes';

import { Body } from '../../app/components';

const { height, width } = Dimensions.get('window');

jest.useFakeTimers();

expect.extend({
  toBeCloseTo,
  toBeOf,
});

describe('Header', () => {
  let tree;
  act(() => {
    tree = create(<Body />);
  });
  const bodyTexts = findAllByType(tree.toJSON(), 'Text');
  const bodyBackgroundImage = tree.toJSON().children.map((child) =>
    child.children.find(
      // hacky fix to fetch imageBackground -> view + image
      (childOfChild) => childOfChild.props.accessibilityIgnoresInvertColors === true
    )
  )[0];
  // ^^ only fetches the view part of the imageBackground
  const imageBackgronudStyleObj = { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 };
  const bodyImages = findAllByType(tree.toJSON(), 'Image').filter(
    (image) => JSON.stringify(image.props.style[0]) !== JSON.stringify(imageBackgronudStyleObj)
  );
  // ^^ fetch the images - the image part of imageBackground

  const audioMessageText = 'My hottest take';
  const captions = Object.entries(Profiles).map(([_, value]) => value.caption);
  const titles = Object.entries(Profiles).map(([_, value]) => value.name);

  it('Body has the right width', () => {
    expect(tree.toJSON().props.style.width).toBeCloseTo({ value: width, percentage: 100 });
  });

  it('Body has the right number of children', () => {
    expect(tree.toJSON().children.length).toBe(2);
  });

  it('Body utilizes ImageBackground component', () => {
    expect(bodyBackgroundImage).not.toBe(undefined);
  });

  it('ImageBackground has the right dimensions', () => {
   try {
    expect(bodyBackgroundImage.props.style.width).toBeCloseTo({
      value: width * 0.65,
    });
    expect(bodyBackgroundImage.props.style.height).toBeCloseTo({
      value: (width * 0.65) *  1.1,
    });
   }  catch (e) {
    expect(bodyBackgroundImage.props.style.width).toBeGreaterThanOrEqual(width * 0.55);
    expect(bodyBackgroundImage.props.style.height).toBeGreaterThanOrEqual((width * 0.55) *  1.1);
   }
  });

  it('ImageBackground has rounded corners', () => {
    expect(bodyBackgroundImage.props.style.borderRadius).toBeGreaterThanOrEqual(10);
  });

  it('ImageBackground has shadows', () => {
    expect(bodyBackgroundImage.props.style.shadowColor).toBeOf([
      Themes.light.shadows.shadowColor,
      Themes.dark.shadows.shadowColor,
    ]);
    expect(bodyBackgroundImage.props.style.shadowOpacity).toBeOf([
      Themes.light.shadows.shadowOpacity,
      Themes.dark.shadows.shadowOpacity,
    ]);
    expect(bodyBackgroundImage.props.style.shadowRadius).toBeOf([
      Themes.light.shadows.shadowRadius,
      Themes.dark.shadows.shadowRadius,
    ]);
    // shadow offset is an obj of width, height
    expect(bodyBackgroundImage.props.style.shadowOffset).toBeOf([
      Themes.light.shadows.shadowOffset,
      Themes.dark.shadows.shadowOffset,
    ]);
  });

  it('Body text children have the right font', () => {
    bodyTexts.forEach((text) => {
      expect(text.children[0]).toBeOf([audioMessageText, ...captions, ...titles]);
      expect(text.props.style.fontFamily).toBe('Sydney');
    });
  });

  it('Profile title has the right size', () => {
    expect(
      bodyTexts.find((text) => titles.includes(text.children[0])).props.style.fontSize
    ).toBeCloseTo({ value: PixelRatio.getFontScale() * height * 0.045, percentage: 10 });
  });

  it('Profile caption has the right size', () => {
    expect(
      bodyTexts.find((text) => captions.includes(text.children[0])).props.style.fontSize
    ).toBeCloseTo({ value: PixelRatio.getFontScale() * height * 0.025, percentage: 10 });
  });

  it('Audio message text has the right size', () => {
    expect(
      bodyTexts.find((text) => text.children[0] === audioMessageText).props.style.fontSize
    ).toBeCloseTo({ value: PixelRatio.getFontScale() * height * 0.035, percentage: 10 });
  });

  it('Body images have proper mode', () => {
    bodyImages.forEach((image) => {
      expect(image.props.style.resizeMode).toBe('contain');
    });
  });
});
