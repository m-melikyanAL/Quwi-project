<template>
  <div class="popup-wrapper">
    <div class="popup-container">
      <div class="popup-header">Edit project</div>
      <form @submit.prevent="submit" class="popup-form" method="post">
        <div class="popup-form__content">
          <img
            :src="editingProject.logo_url"
            alt="Logo"
            class="popup-form__content_img"
          />
          <input
            v-model="formData.payload.name"
            type="text"
            name="prName"
            id="prName"
            placeholder="Project name"
            class="popup-form__content_input"
            :class="errorMessage ? 'error' : ''"
          />
        </div>
        <span v-if="errorMessage" class="errorMess">{{ errorMessage }}</span>
        <div class="popup-form__buttons">
          <button
            type="reset"
            class="popup-form__buttons_cancel"
            @click.prevent="$emit('cancelEditing')"
          >
            Cancel
          </button>
          <button
            type="submit"
            @click.prevent="submit"
            class="popup-form__buttons_save"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
const vm = this
export default {
  name: 'EditProject',
  props: ['editingProject'],
  emits: ['editProject', 'cancelEditing'],
  data() {
    return {
      formData: {
        id: this.$props.editingProject.id,
        payload: {
          name: this.$props.editingProject.name,
        },
      },
      errorMessage: '',
    }
  },
  methods: {
    submit() {
      if (this.formData.payload.name) {
        this.$emit('editProject', this.formData)
      } else {
        this.errorMessage = 'Project name is not valid!'
      }
    },
  },
}
</script>

<style lang="scss">
.popup-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($color: #000000, $alpha: 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-container {
  width: 40%;
  background-color: #fff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}

.popup-header {
  font-size: 24px;
  font-weight: 500;
  text-transform: uppercase;
}

.popup-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;

  &__content {
    width: 100%;
    display: flex;
    align-items: center;
    column-gap: 12px;
    margin-top: 20px;

    &_img {
      width: 60px;
      height: 60px;
    }

    &_input {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid #f2f2f2;
      border-radius: 6px;
      font-size: 16px;

      &.error {
        border-color: red;
      }
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    column-gap: 16px;
    &_save,
    &_cancel {
      padding: 8px 20px;
      font-size: 18px;
      font-weight: 500;
      outline: none;
      border: none;
      border-radius: 6px;
      margin-top: 40px;
    }
    &_save {
      background-color: #2194f3;
      color: #fff;
    }

    &_cancel {
      border: 1px solid #bebaba;
      background-color: #fff;
      color: #bebaba;
    }
  }
}

.errorMess {
  color: red;
  font-size: 12px;
}
</style>
