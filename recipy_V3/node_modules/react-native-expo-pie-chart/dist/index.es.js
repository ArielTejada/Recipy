import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

const defaultProps = {
  rotation: -90,
  length: 150,
  zeroTotalCircleColor: '#F1F6F9',
  containerProps: {},
  svgProps: {},
  gProps: {},
  circleProps: {}
};

const CircleWrapper = props => /*#__PURE__*/React.createElement(Circle, _extends({
  cx: "50%",
  cy: "50%",
  fill: "transparent" // eslint-disable-next-line react/jsx-props-no-spreading

}, props));

const PieChartComponent = ({
  data,
  length,
  rotation,
  zeroTotalCircleColor,
  containerProps,
  svgProps,
  gProps,
  circleProps
}) => {
  const {
    strokeWidth,
    radius,
    circleCircumference
  } = useMemo(() => {
    const newStrokeWidth = length * 0.25;
    const newRadius = length / 2 - newStrokeWidth / 2;
    return {
      strokeWidth: newStrokeWidth,
      radius: newRadius,
      circleCircumference: 2 * Math.PI * newRadius
    };
  }, [length]);
  const {
    total,
    filledData
  } = useMemo(() => {
    const newTotal = data.reduce((prev, current) => prev + current.count, 0);
    const newFilledData = data.reduce((prev, current, i) => {
      const percentage = current.count / newTotal * 100;
      prev.push({ ...current,
        percentage,
        strokeDashoffset: circleCircumference - circleCircumference * percentage / 100,
        angle: (i === 0 ? 0 : prev[i - 1].angle) + current.count / newTotal * 360
      });
      return prev;
    }, []);
    return {
      total: newTotal,
      filledData: newFilledData
    };
  }, [circleCircumference, data]);
  return /*#__PURE__*/React.createElement(View, _extends({
    style: styles.container // eslint-disable-next-line react/jsx-props-no-spreading

  }, containerProps), /*#__PURE__*/React.createElement(Svg, _extends({
    height: length.toString(),
    width: length.toString(),
    viewBox: `0 0 ${length} ${length}` // eslint-disable-next-line react/jsx-props-no-spreading

  }, svgProps), /*#__PURE__*/React.createElement(G, _extends({
    rotation: rotation,
    originX: length / 2,
    originY: length / 2 // eslint-disable-next-line react/jsx-props-no-spreading

  }, gProps), total === 0 ? /*#__PURE__*/React.createElement(CircleWrapper, _extends({
    r: radius,
    stroke: zeroTotalCircleColor,
    strokeWidth: strokeWidth // eslint-disable-next-line react/jsx-props-no-spreading

  }, circleProps)) : filledData.map((item, i, arr) => /*#__PURE__*/React.createElement(CircleWrapper, _extends({
    key: item.key,
    r: radius,
    stroke: item.color,
    strokeWidth: strokeWidth,
    strokeDasharray: circleCircumference,
    strokeDashoffset: item.strokeDashoffset,
    rotation: i === 0 ? 0 : arr[i - 1].angle,
    originX: length / 2,
    originY: length / 2,
    strokeLinecap: "round" // eslint-disable-next-line react/jsx-props-no-spreading

  }, circleProps))))));
};

PieChartComponent.defaultProps = defaultProps;
const PieChart = /*#__PURE__*/React.memo(PieChartComponent);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export { PieChart as default };
//# sourceMappingURL=index.es.js.map
