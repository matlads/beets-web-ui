import { Radio } from 'backbone';
import 'backbone.radio';

export function resetRadioChannels() {
  const beetsChannel = Radio.channel('beets');
  beetsChannel.stopListening();
  beetsChannel.off();
}

export function getBeetsChannel() {
  return Radio.channel('beets');
}
