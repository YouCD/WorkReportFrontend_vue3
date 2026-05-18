<template>
  <div class="outer-wrap">
    <div class="loginBox">
      <div class="login-panel">
        <a-form
          :model="data.loginFrom"
          name="basic"
          layout="horizontal"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          autocomplete="off"
          @finish="onFinish"
          @finish-failed="onFinishFailed"
        >
          <a-form-item
            label="账户"
            name="username"
            :rules="[{ required: true, message: '请输入账户' }]"
          >
            <a-input v-model:value="data.loginFrom.username">
              <template #prefix>
                <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
            label="密码"
            name="password"
            :rules="[{ required: true, message: '请输入密码!' }]"
          >
            <a-input-password v-model:value="data.loginFrom.password">
              <template #prefix>
                <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item :wrapper-col="submitBtnWrapperCol">
            <a-button
              class="login-form-button"
              type="primary"
              html-type="submit"
            >
              登入
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { LoginHandler, LoginRequestData } from '@/types/login'
import { useRouter } from 'vue-router'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'

// 移动端检测
const windowWidth = ref(window.innerWidth)
const isMobile = computed(() => windowWidth.value < 768)

window.addEventListener('resize', () => {
  windowWidth.value = window.innerWidth
})

const labelCol = computed(() => (isMobile.value ? { span: 5 } : { span: 8 }))
const wrapperCol = computed(() =>
  isMobile.value ? { span: 19 } : { span: 16 },
)
const submitBtnWrapperCol = computed(() =>
  isMobile.value ? { span: 24, offset: 0 } : { offset: 8, span: 16 },
)

let data = reactive({
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
  loginFrom: {
    username: '',
    password: '',
  } as LoginRequestData,
})

const router = useRouter()

const onFinish = async () => {
  const result = await LoginHandler(data.loginFrom)
  if (result.flag) {
    localStorage.setItem('jwt', result.data.token)
    await router.push('/')
  }
}
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>

<style scoped>
.outer-wrap {
  height: 100vh;
  background-image: url('/src/assets/bg.png');
  background-size: cover;
  background-position: center center;
}

.loginBox {
  width: 500px;
  height: 300px;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  border-radius: 10px;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.9);
}

.login-panel {
  width: 400px;
  height: 200px;
  top: 25%;
  position: absolute;
}

.login-form-button {
  width: 100%;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .loginBox {
    position: absolute;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    transform: translate(-50%, -50%);
    margin: 0;
    width: 90%;
    max-width: 400px;
    height: auto;
    min-height: 260px;
    border-radius: 8px;
  }

  .login-panel {
    width: 90%;
    height: auto;
    top: auto;
    left: auto;
    position: relative;
    margin: 0 auto;
  }

  .login-form-button {
    width: 100%;
  }

  .login-panel :deep(.ant-form-item) {
    flex-direction: row !important;
  }
  .login-panel :deep(.ant-form-item-label) {
    text-align: left !important;
    padding-right: 4px;
  }
}
</style>
