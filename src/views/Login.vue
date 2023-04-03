<template>
  <div class="outer-wrap">
    <div class="login-panel">
      <a-form
          class="login-form"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          :model="loginFrom"
          @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
              v-model:value="loginFrom.username"
              v-decorator="[
                'userName',
                { rules: [{ required: true, message: 'Please input your username!' }] },
              ]"
              placeholder="请输入账户"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
              v-model:value="loginFrom.password"
              v-decorator="[
                'password',
                { rules: [{ required: true, message: 'Please input your Password!' }] },
              ]"
              type="password"
              placeholder="请输入密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="login-form-button">
            登入
          </a-button>
        </a-form-item>
      </a-form>
    </div>

  </div>
</template>

<script setup  lang="ts">
import {reactive, ref,toRefs} from "vue";
import {LoginData} from "../types/login";
let data = reactive({
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
  loginFrom:new LoginData().loginFrom,
  partLoading: false,
});
const { labelCol,wrapperCol ,loginFrom} =toRefs(data)


function handleSubmit(e:any) {
  console.log(loginFrom.value)
}


//
// function passwordError() {
//   const { getFieldError, isFieldTouched } = this.form;
//   return isFieldTouched('password') && getFieldError('password');
// }
</script>

<style scoped>
.outer-wrap {
  /*只有同时为html和body设置height: 100%时，这里才生效，
    并且随浏览器窗口变化始终保持和浏览器视窗等高*/
  height: 100%;
}

.login-panel {
  width: 500px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

.login-form-button {
  width: 100%;
}
</style>