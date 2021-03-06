<template>
  <div class="ly_top">
    <div class="center_container">
      <div class="right_title">
        <router-link
          to="/home"
          class="title"
          :style="data.style"
          tag="span">
          {{ $t(`bar.title`) }}
        </router-link>
      </div>
      <div class="menu-title">
        <div>
          <router-link
            to="/"
            class="text"
            :style="data.style">
            <i class="el-icon-s-home" />{{ $t('bar.homepage') }}
          </router-link>
        </div>
        <div>
          <router-link
            to="/categories"
            class="text"
            :style="data.style">
            <i class="el-icon-menu" />{{ $t('bar.categories') }}
          </router-link>
        </div>
        <div>
          <router-link
            to="/tags"
            class="text"
            :style="data.style">
            <i class="el-icon-s-management" />{{ $t('bar.tags') }}
          </router-link>
        </div>
        <div>
          <router-link
            to="/links"
            class="text"
            :style="data.style">
            <i class="el-icon-connection" />{{ $t('bar.links') }}
          </router-link>
        </div>
        <div>
          <router-link
            to="/about"
            class="text"
            :style="data.style">
            <i class="el-icon-s-promotion" />{{ $t('bar.about') }}
          </router-link>
        </div>
        <div>
          <router-link
            to="/login"
            class="text"
            v-if="online()"
            :style="data.style">
            <i class="el-icon-user-solid" />{{ $t('bar.login') }}
          </router-link>
          <el-dropdown
            v-else
            class="drop_down"
            style="margin-left: 15px"
            @command="handleCommand">
            <el-avatar icon="el-icon-user-solid" size="small" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="changePwd">{{ $t('bar.change_password') }}</el-dropdown-item>
                <el-dropdown-item command="pCenter">{{ $t('bar.personal_center') }}</el-dropdown-item>
                <el-dropdown-item command="signOut">{{ $t('bar.sign_out') }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div>
          <language
            class="change_text"
            style="text-shadow: rgba(0, 0, 0, 0.3) 0.05rem 0.05rem 0.1rem;"
            :style="data.style" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { logout } from '@/api/sys';
import { ElMessage } from 'element-plus';

export default defineComponent({
  name: 'TopBar',
  components: {},
  setup() {
    const { t } = useI18n();
    const store = useStore();
    const router = useRouter();
    const data = reactive({
      style: {},
      opacity: 0,
      iconColor: 'rgba(255, 255, 255,0.9)',
    });
    const handleWindowScroll = function () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      data.opacity = Math.abs(Math.round(scrollTop)) / 250;
      if (data.opacity > 0.85) {
        data.opacity = 0.85;
      }
      if (data.opacity === 0) {
        data.opacity = 0.9;
        data.style = { color: `rgba(255, 255, 255,${data.opacity})` };
        data.iconColor = `rgba(255, 255, 255,${data.opacity})`;
        return;
      }
      data.iconColor = `rgba(50, 50, 50,${data.opacity})`;
      data.style = { color: `rgba(50, 50, 50,${data.opacity})` };
    };
    window.addEventListener('scroll', handleWindowScroll);
    const online = function() {
      const username = store.getters.getUsername;
      return (username === '' || username === null);
    };
    const handleCommand = function(command: string) {
      switch (command) {
        case 'changePwd':
          console.log(command);
          break;
        case 'pCenter':
          router.push('/userInfo');
          break;
        case 'signOut':
          logout().then(() => {
            store.commit('clearUser');
            ElMessage.success({
              message: t('message.sign_out_success'),
              type: 'success',
              duration: 2 * 1000,
            });
          }).catch(() => {
            store.commit('clearUser');
          });
          router.push('/login');
          break;
      }
    };
    return {
      handleWindowScroll,
      handleCommand,
      data,
      online,
    };
  }
});
</script>

<style lang="scss" scoped>
.ly_top{
  .center_container{
    width: 100%;
    height: 30px;
    margin: auto;
    text-align: center;
    .menu-title{
      height: 22px;
      display: flex;
      align-items: center;
      float: right;
      margin-right: 30px;
      text-align: center;
      .icon_h:hover{
        color: #49b1f5;
      }
    }
    .text{
      text-shadow: 0.05rem 0.05rem 0.1rem rgba(0, 0, 0, 0.3);
      color: rgba(255,255,255,0.9);
      margin-top: 7px;
      margin-left: 20px;
      text-decoration: none;
    }
    .title{
      text-shadow: 0.05rem 0.05rem 0.1rem rgba(0, 0, 0, 0.3);
      color: rgba(255,255,255,0.9);
      margin-top: 7px;
      margin-left: 20px;
      text-decoration: none;
    }
    .router-link-active{
      text-decoration: none;
    }
    .text:hover{
      color: #49b1f5 !important;
    }
    .router-link-active {
      text-decoration: none;
    }
    .right_title{
      float: left;
      font-size: 18px;
      font-weight: bold;
    }
    .change_text{
      margin-left: 20px;
      color: rgba(255,255,255,0.9);
      text-shadow: 0.05rem 0.05rem 0.1rem rgba(0, 0, 0, 0.3) !important;
    }
    .drop_down{
      margin-left: 15px !important;
    }
  }
}
</style>
