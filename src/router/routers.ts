export const routes = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',
    },
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'layout',
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                name: 'home',
                meta:{
                    title: '首页',
                    icon: 'HomeFilled'
                }
            },    
        ]
    },
    {
        path: '/screen',
        component: () => import('@/views/screen/index.vue'),
        name: 'screen',
        meta:{
            title: '数据大屏',
            icon: 'Monitor'
        }
    },
    {
        path: '/acl',
        component: () => import('@/layout/index.vue'),
        name: 'acl',
        meta:{
            title: '权限管理',
            icon: 'Lock'
        },
        children: [
            {
                path: '/acl/user',
                component: () => import('@/views/acl/user/index.vue'),
                name: 'user',
                meta:{
                    title: '用户管理',
                    icon: 'User'
                }
            },
            {
                path: '/acl/role',
                component: () => import('@/views/acl/role/index.vue'),
                name: 'role',
                meta:{
                    title: '角色管理',
                    icon: 'UserFilled'
                }
            },
            {
                path: '/acl/permission',
                component: () => import('@/views/acl/permission/index.vue'),
                name: 'permission',
                meta:{
                    title: '菜单管理',
                    icon: 'Menu'
                }
            }
        ]
    },
    {
        path: '/product',
        component: () => import('@/layout/index.vue'),
        name: 'product',
        meta:{
            title: '产品管理',
            icon: 'ShoppingCart'
        },
        children: [
            {
                path: '/product/trademark',
                component: () => import('@/views/product/trademark/index.vue'),
                name: 'trademark',
                meta:{
                    title: '品牌管理',
                    icon: 'Shop'
                }
            },
            {
                path: '/product/attr',
                component: () => import('@/views/product/attr/index.vue'),
                name: 'attr',
                meta:{
                    title: '属性管理',
                    icon: 'Setting'
                }
            },
            {
                path: '/product/spu',
                component: () => import('@/views/product/spu/index.vue'),
                name: 'spu',
                meta:{
                    title: 'SPU管理',
                    icon: 'Goods'
                }
            },
            {
                path: '/product/sku',
                component: () => import('@/views/product/sku/index.vue'),
                name: 'sku',
                meta:{
                    title: 'SKU管理',
                    icon: 'GoodsFilled'
                }
            }
        ]
    },
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404'
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'not-found'
    }
]