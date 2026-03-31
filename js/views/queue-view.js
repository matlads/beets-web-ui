import BaseView from './base-view.js';
import { template } from 'underscore';

const QueueView = BaseView.extend({
  template: template(`
    <div class="p-3">
      <h5>Playback Queue</h5>
      <% if (queue.length === 0) { %>
        <p class="text-muted">Queue is empty. Play a song to add it here.</p>
      <% } else { %>
        <ul class="list-unstyled">
          <% queue.forEach(function(item) { %>
            <li class="mb-2">
              <strong><%= item.get('title') %></strong><br>
              <small class="text-muted">
                <%= item.get('artist') %> • <%= item.get('album') %>
              </small>
            </li>
          <% }); %>
        </ul>
      <% } %>
    </div>
  `),
  className: 'border',

  initialize() {
    BaseView.prototype.initialize.apply(this, arguments);
    this.queue = [];
  },

  beetsEvents: {
    'item:play': 'addToQueue',
  },

  addToQueue(model) {
    this.queue.unshift(model);
    if (this.queue.length > 5) {
      this.queue = this.queue.slice(0, 5);
    }
    this.render();
  },

  templateContext() {
    return {
      queue: this.queue,
    };
  },
});

export default QueueView;
