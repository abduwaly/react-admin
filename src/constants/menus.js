export const menus = [
    { key: '/app/dashboard/index', title: '首页', icon: 'home', },
    {
        key: '/app/manager', title: '用户管理', icon: 'user',
        sub: [
            { key: '/app/manager/add', title: '添加用户', icon: 'user-add', },
            { key: '/app/manager/list', title: '用户列表', icon: 'contacts', },
        ],
    },
    {
        key: '/app/product', title: '商品管理', icon: 'shop',
        sub: [
            { key: '/app/product/add', title: '添加商品', icon: 'file-add', },
            { key: '/app/product/list', title: '商品列表', icon: 'database', },
        ],
    },
    {
        key: '/app/order', title: '订单管理', icon: 'solution',
        sub: [
            { key: '/app/order/list', title: '订单列表', icon: 'file-text', },
        ],
    },
    {
        key: '/app/auth', title: '权限管理', icon: 'safety',
        sub: [
            { key: '/app/auth/basic', title: '基础演示', icon: '', },
            { key: '/app/auth/routerEnter', title: '路由拦截', icon: '', },
        ],
    }
];