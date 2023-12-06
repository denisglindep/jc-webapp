// create Pinia notifications store
import { defineStore } from 'pinia'

export default defineStore('notifications', {
  state: () => ({
    notifications: [],
  }),
  actions: {
    addNotification: function (notification) {
      this.notifications.push(notification)
    },
    removeNotification: function (index) {
      this.notifications.splice(index, 1)
    },
  },
})
