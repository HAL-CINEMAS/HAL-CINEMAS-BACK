import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === 'admin') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: 'ホーム',
              icon: 's-home',
              url: 'my-home.vue'
            },
            {
              path: '/mall',
              name: 'mall',
              label: '映画管理',
              icon: 'box',
              url: 'my-mall.vue'
            },
            // {
            //   path: '/user',
            //   name: 'user',
            //   label: '会員管理',
            //   icon: 'user',
            //   url: 'my-user.vue'
            // },
            // {
            //   label: 'その他',
            //   icon: 'location',
            //   children: [
            //     {
            //       path: '/page1',
            //       name: 'page1',
            //       label: 'マイページ',
            //       icon: 'setting',
            //       url: 'my-pageone.vue'
            //     },
            //     {
            //       path: '/page2',
            //       name: 'page2',
            //       label: '開発中',
            //       icon: 'setting',
            //       url: 'my-pagetwo.vue'
            //     }
            //   ]
            // }
          ],
          token: 'admin',
          message: '获取成功'
        }
      }
    } else if (username === 'admin1' && password === 'admin1') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'my-home.vue'
            },
            {
              label: 'その他',
              icon: 'location',
              children: [
                {
                  path: '/page1',
                  name: 'page1',
                  label: 'マイページ',
                  icon: 'setting',
                  url: 'my-pageone.vue'
                },
                {
                  path: '/page2',
                  name: 'page2',
                  label: '開発中',
                  icon: 'setting',
                  url: 'my-pagetwo.vue'
                }
              ]
            }

          ],
          token: 'xiaoxiao',
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: 'ユーザー名またはパスワードを間違えました'
        }
      }
    }

  }
}