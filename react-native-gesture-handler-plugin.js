const injectShouldActivateOnStartProp = t => path => {
  // https://docs.swmansion.com/react-native-gesture-handler/docs/next/api/gestures/native-gesture#shouldactivateonstartvalue-boolean-android-only
  const newProp = t.jSXAttribute(
    t.jSXIdentifier('shouldActivateOnStart'),
    t.jsxExpressionContainer(t.booleanLiteral(true)),
  );

  path.node.attributes.push(newProp);
};

/**
 * @type {import('@babel/core').ConfigFunction}
 */
module.exports = function (api) {
  /**
   * @type {import('@babel/types')}
   */
  const t = api.types;
  return {
    visitor: {
      JSXOpeningElement(path) {
        if (!path.get('name').isJSXIdentifier({name: 'RectButton'})) {
          return;
        }

        if (
          path.node.attributes.some(attr =>
            t.isJSXIdentifier(attr.name, {name: 'shouldActivateOnStart'}),
          )
        ) {
          return;
        }

        injectShouldActivateOnStartProp(t)(path);
      },
    },
  };
};
