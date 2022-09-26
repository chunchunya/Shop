const dynamicUser = [
    {
        name: "管理员",
        avatar: "https://sf3-ttcdn-tos.pstatp.com/img/user-avatar/ccb565eca95535ab2caac9f6129b8b7a~300x300.image",
        desc: "管理员（多权限）",
        username: "102",
        password: "1234",
        token: "rtVrM4PhiFK8PNopqWuSjsc1n02oKc3f",
        routes: [
            { id: 1, name: "/", path: "/", component: "Layout", redirect: "/index", hidden: false, children: [
                { name: "index", path: "/index", meta: { title: "商品信息" }, component: "index/index" },
            ]},
            { id: 6, name: "/admin", path: "/admin", component: "Layout", redirect: "/admin/index", hidden: false, children: [
                { name: "/admin/index", path: "/admin/index", meta: { title: "商品管理" }, component: "admin/index" }
            ] },
        ]
    },
    {
        name: "普通用户",
        avatar: "https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/6364348965908f03e6a2dd188816e927~300x300.image",
        desc: "购买者",
        username: "1",
        password: "123",
        token: "4es8eyDwznXrCX3b3439EmTFnIkrBYWh",
        routes: [
            { id: 1, name: "/", path: "/", component: "Layout", redirect: "/index", hidden: false, children: [
                { name: "index", path: "/index", meta: { title: "商品信息" }, component: "index/index" },
            ]},
            { id: 2, name: "/form", path: "/form", component: "Layout", redirect: "/form/index", hidden: false, children: [
                { name: "/form/index", path: "/form/index", meta: { title: "订单详情" }, component: "form/index" }
            ]},
           
        ]
    }
]

export default dynamicUser