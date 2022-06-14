import {transform} from '@babel/core';
import plugin from './react-native-gesture-handler-plugin';

const render = code => {
  const result = transform(code, {
    plugins: ['@babel/plugin-syntax-jsx', plugin],
    configFile: false,
  });

  return result?.code;
};

describe('plugin', () => {
  it('should inject `shouldActiveOnStart` to <RectButton>', () => {
    expect(render('<View />')).toMatchInlineSnapshot(`"<View />;"`);
    expect(
      render('<RectButton shouldActivateOnStart={true}/>'),
    ).toMatchInlineSnapshot(`"<RectButton shouldActivateOnStart={true} />;"`);
    expect(render('<RectButton />')).toMatchInlineSnapshot(
      `"<RectButton shouldActivateOnStart={true} />;"`,
    );
  });
});
