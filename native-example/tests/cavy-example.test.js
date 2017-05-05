import expect from 'expect';

export default function(spec) {
  spec.describe('My feature', function() {
    spec.it('works', async function() {

      const text = await spec.findComponent('InteractionComponent.Text');

      text.props.onPress();
      
      expect(text.props.children[1]).toBe(1)

      text.props.onLongPress();

      expect(text.props.children[1]).toBe(11)

    });
  });
}