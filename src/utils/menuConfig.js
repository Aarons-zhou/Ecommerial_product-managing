import {
    HomeOutlined,
    BarsOutlined,
    ApartmentOutlined,
    UsergroupAddOutlined,
    UserOutlined,
    SlidersOutlined,
    BarChartOutlined,
    LineChartOutlined,
    PieChartOutlined
} from '@ant-design/icons'

const menuConfig = [
    {
        key: '/home',
        title: '首页',
        icon: <HomeOutlined />,
    },
    {
        key: '/products',
        title: '商品总览',
        icon: <BarsOutlined />,
        children: [
            {
                key: '/category',
                title: '品类管理',
                icon: <ApartmentOutlined />
            },
            {
                key: '/product',
                title: '商品管理',
                icon: <BarsOutlined />
            }
        ]
    },
    {
        key: '/role',
        title: '角色管理',
        icon: <UsergroupAddOutlined />
    },
    {
        key: '/user',
        title: '用户管理',
        icon: <UserOutlined />
    },
    {
        key: '/chart',
        title: '图形图标',
        icon: <SlidersOutlined />,
        children: [
            {
                key: '/chart/bar',
                title: '柱状图',
                icon: <BarChartOutlined />
            },
            {
                key: '/chart/line',
                title: '线形图',
                icon: <LineChartOutlined />
            },
            {
                key: '/chart/pie',
                title: '饼状图',
                icon: <PieChartOutlined />
            }
        ]
    }
]

export default menuConfig