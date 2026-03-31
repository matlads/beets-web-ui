import Backbone from 'backbone';

export function stopHistory() {
  if (Backbone.history && Backbone.history.started) {
    Backbone.history.stop();
  }
}

export function resetHistory() {
  stopHistory();
  if (Backbone.history) {
    Backbone.history.handlers = [];
    Backbone.history._handlers = [];
  }
}
