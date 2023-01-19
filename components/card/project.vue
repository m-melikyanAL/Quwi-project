<template>
  <div class="card-wrapper" @click="$emit('openEditModal', project)">
    <div class="logo">
      <img :src="project.logo_url" alt="Logo" />
    </div>
    <div class="card-name">
      {{ project.name }}
    </div>
    <div class="card-activity">
      {{ !project.is_active ? 'Active' : 'Passive' }}
    </div>
    <div class="card-estimation">
      <span>Time this week</span>
      <span>This month</span>
      <span>Total</span>
    </div>
    <div class="card-estimation__value">
      <span>00:00:00</span>
      <span>00:00:00</span>
      <span>{{
        new Date(project.spent_sec_all_time).toLocaleTimeString('it-IT')
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: ['project'],
  emits: ['openEditModal'],
}
</script>

<style lang="scss">
.card-wrapper {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 6px;
}

.logo {
  flex-grow: 1;
  width: 150px;
  height: 150px;
  object-fit: cover;
}

.card-name {
  flex-grow: 1;
  margin-left: 10px;
}

.card-activity {
  flex-grow: 5;
  text-align: center;
  font-weight: 500;
  color: green;
}
.card-estimation {
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

.card-estimation__value {
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}
</style>
