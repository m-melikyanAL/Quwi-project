<template>
  <div class="login__container">
    <form @submit.prevent="login" class="login__box">
      <div class="login__box--logo">
        <img
          width="100%"
          height="100%"
          src="../../assets/images/quwi-logo.svg"
          alt="quwi-logo"
        />
      </div>
      <div class="login__box--body">
        <div>
          <input
            @input="(event) => validate(event.target.value, 'email')"
            @focus="focusInput('email')"
            @blur="blureInput('email')"
            v-model="email"
            type="text"
          />
          <p :style="{ opacity: errors.email.show ? '1' : '0' }">
            {{ errors.email.text }}
          </p>
        </div>
        <div>
          <input
            @input="(event) => validate(event.target.value, 'password')"
            @focus="focusInput('password')"
            @blur="blureInput('password')"
            v-model="password"
            type="password"
          />
          <p :style="{ opacity: errors.password.show ? '1' : '0' }">
            {{ errors.password.text }}
          </p>
        </div>
        <div class="login__box--body__actions">
          <button
            :disabled="errors.email.text !== '' || errors.password.text !== ''"
            @click.prevent="login"
          >
            <!-- <img width="30px" height="30px" v-if="!loginLoading" src="../../assets/images/loader.gif" alt="loading"> -->
            <span>Login</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'login-page',
  layout: 'auth',
  data() {
    return {
      email: '',
      password: '',
      errors: {
        email: { show: false, text: 'Required.' },
        password: { show: false, text: 'Required.' },
      },
    }
  },
  head() {
    return {
      title: 'Quwi - Login',
    }
  },
  computed: {
    ...mapGetters('auth', [
      'loginSuccessData',
      'loginErrorData',
      'loginLoading',
    ]),
  },
  methods: {
    ...mapActions('auth', ['loginUser']),
    login() {
      const payload = {
        email: this.email,
        password: this.password,
      }
      this.loginUser(payload)
    },
    validate(event, type) {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (event === '') {
        this.errors[type].text = 'Required.'
      } else if (type === 'email') {
        if (!pattern.test(event)) {
          this.errors[type].text = 'Invalid email.'
        } else {
          this.errors[type].text = ''
        }
      } else {
        this.errors[type].text = ''
      }
    },
    focusInput(v) {
      this.errors[v].show = false
    },
    blureInput(v) {
      this.errors[v].show = true
    },
  },
  watch: {
    loginSuccessData(v) {
      if (v) {
        this.$cookies.set('token', v.token, {
          options: {
            expires: 9999,
          },
        })
        this.$router.push('/home')
        // window.location('/home')
      }
    },
    loginErrorData(v) {
      this.errors.email.text = v.first_errors.email
      this.errors.password.text = v.first_errors.email
    },
  },
}
</script>

<style scoped lang="scss">
.login {
  &__container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__box {
    padding: 25px 35px;
    width: 370px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    &--logo {
      width: 72px;
      height: 37px;
      user-select: none;
      pointer-events: none;
      margin: 0 auto;
    }
    &--body {
      margin: 0 auto;
      padding-top: 38px;
      input {
        width: calc(100% - 40px);
        height: 50px;
        border: 1px solid #dadada;
        padding: 0 20px;
        border-radius: 5px;
        font-size: inherit;
      }
      input[type='password'] {
        margin-top: 13px;
      }
      p {
        color: #ff5252;
        font-size: 12px;
        padding-top: 5px;
        height: 15px;
        width: 100%;
        margin: 0;
        transition: all 0.2s;
      }
      &__actions {
        margin-top: 30px;
        margin-bottom: 20px;
        button {
          width: 100%;
          height: 48px;
          font-size: 18px;
          border-radius: 9px;
          border: none;
          color: white;
          background: #2668c1;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            filter: invert(100%) sepia(6%) saturate(23%) hue-rotate(188deg)
              brightness(106%) contrast(106%);
          }
        }
        button:hover {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
