import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import HomeView from '../views/HomeView.vue'
import HomeViewBG from '../views/HomeViewBG.vue'
import HomeViewIndex from '../views/HomeViewIndex.vue'
import HomeViewRhizome from '../views/HomeViewRhizome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      redirect: '/home/index',
      component: HomeView,
      children: [
        {
          path: '/home/index',
          name: 'HomeIndex',
          component: HomeViewIndex
        },
        {
          path: '/home/bg',
          name: 'HomeBG',
          component: HomeViewBG
        },
        {
          path: '/home/rhizome',
          name: 'HomeViewRhizome',
          component: HomeViewRhizome
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    }
  ]
})

router.beforeEach((to, from) => {
  let token = sessionStorage.getItem('token')
  if (
    // 检查用户是否已登录
    !token &&
    // ❗️ 避免无限重定向
    to.name !== 'Login'
  ) {
    // 将用户重定向到登录页面
    return { name: 'Login' }
  }
})

export default router
