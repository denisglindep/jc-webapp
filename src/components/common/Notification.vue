<template>
  <div v-if="notifications.length" class="notification-container">
    <div v-for="(notification, index) in notifications" :key="index">
      <v-alert
        :type="notification.type"
        :value="true"
        closable
        :text="notification.message"
        class="ma-1 position-fixed notification"
        transition="scale-transition">
        <template v-slot:close>
            <v-icon icon="mdi-close" @click="removeNotification(index)" />
        </template>
      </v-alert>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useNotifications } from '@/stores';

const notificationStore = useNotifications();
const notifications = ref([]);

watchEffect(() => {
  notifications.value = notificationStore.notifications;

  // Automatically remove notifications after 3 seconds
  notifications.value.forEach((notification, index) => {
    if (!notification.isClosed) {
      setTimeout(() => {
        removeNotification(index);
      }, 6000);
    }
  });
});

const removeNotification = (index) => {
  notificationStore.removeNotification(index);
};
</script>
<style lang="scss" scoped>
.notification {
  top: 64;
  right: 0;
  min-width: 200px;
  max-width: 25%;
}
</style>