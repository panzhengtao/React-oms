import React from 'react'
import Bundle from '../components/bundle/bundle'


const AsyncHome = (props) => (
    <Bundle load={() => import('../../home')}>
        {(AsyncHome) => <AsyncHome {...props} />}
    </Bundle>
)

const AsyncOrderlist = (props) => (
    <Bundle load={() => import('../../orderlist')}>
        {(AsyncOrderlist) => <AsyncOrderlist {...props} />}
    </Bundle>
)

const Asyncorderdetail = (props) => (
    <Bundle load={() => import('../../orderdetail')}>
        {(Asyncorderdetail) => <Asyncorderdetail {...props} />}
    </Bundle>
)

const Asyncsmtorderlist = (props) => (
    <Bundle load={() => import('../../smtorderlist')}>
        {(Asyncsmtorderlist) => <Asyncsmtorderlist {...props} />}
    </Bundle>
)

const Asyncsmtorderdetail = (props) => (
    <Bundle load={() => import('../../smtorderdetail')}>
        {(Asyncsmtorderdetail) => <Asyncsmtorderdetail {...props} />}
    </Bundle>
)

const Asyncexceptionorderlist = (props) => (
    <Bundle load={() => import('../../exceptionorderlist')}>
        {(Asyncexceptionorderlist) => <Asyncexceptionorderlist {...props} />}
    </Bundle>
)

const Asyncexceptionorderdetail = (props) => (
    <Bundle load={() => import('../../exceptionorderdetail')}>
        {(Asyncexceptionorderdetail) => <Asyncexceptionorderdetail {...props} />}
    </Bundle>
)



const Asyncsignlist = (props) => (
    <Bundle load={() => import('../../signlist')}>
        {(Asyncsignlist) => <Asyncsignlist {...props} />}
    </Bundle>
)

const Asyncwarehouselist = (props) => (
    <Bundle load={() => import('../../warehouselist')}>
        {(Asyncwarehouselist) => <Asyncwarehouselist {...props} />}
    </Bundle>
)

const Asyncchannellist = (props) => (
    <Bundle load={() => import('../../channellist')}>
        {(Asyncchannellist) => <Asyncchannellist {...props} />}
    </Bundle>
)

const Asyncconversion = (props) => (
    <Bundle load={() => import('../../conversion')}>
        {(Asyncconversion) => <Asyncconversion {...props} />}
    </Bundle>
)

const Asyncdeliveryparcellist = (props) => (
    <Bundle load={() => import('../../deliveryparcellist')}>
        {(Asyncdeliveryparcellist) => <Asyncdeliveryparcellist {...props} />}
    </Bundle>
)


const Asyncdeliveryparceldetail = (props) => (
    <Bundle load={() => import('../../deliveryparceldetail')}>
        {(Asyncdeliveryparceldetail) => <Asyncdeliveryparceldetail {...props} />}
    </Bundle>
)


const Asyncnegativeprofitauditdetail = (props) => (
    <Bundle load={() => import('../../negativeprofitauditdetail')}>
        {(Asyncnegativeprofitauditdetail) => <Asyncnegativeprofitauditdetail {...props} />}
    </Bundle>
)


const Asyncnegativeprofitauditlist = (props) => (
    <Bundle load={() => import('../../negativeprofitauditlist')}>
        {(Asyncnegativeprofitauditlist) => <Asyncnegativeprofitauditlist {...props} />}
    </Bundle>
)


const AsyncNoFound = (props) => (
    <Bundle load={() => import('../components/404/404')}>
        {(AsyncNoFound) => <AsyncNoFound {...props} />}
    </Bundle>
)


export const routes = [
    {
        path: '/',
        exact: true,
        component: AsyncHome
    },
    {
        path: '/orderlist/',
        component: AsyncOrderlist
    },
    {
        path: '/orderdetail/',
        component: Asyncorderdetail
    },
    {
        path: '/exceptionorderlist/',
        component: Asyncexceptionorderlist
    },
    {
        path: '/exceptionorderdetail/',
        component: Asyncexceptionorderdetail
    },
    {
        path: '/smtorderlist/',
        component: Asyncsmtorderlist
    },
    {
        path: '/smtorderdetail/',
        component: Asyncsmtorderdetail
    },
    {
        path: '/signlist/',
        component: Asyncsignlist
    },
    {
        path: '/warehouselist/',
        component: Asyncwarehouselist
    },
    {
        path: '/channellist/',
        component: Asyncchannellist
    },
    {
        path: '/conversion/',
        component: Asyncconversion
    },
    {
        path: '/deliveryparcellist/',
        component: Asyncdeliveryparcellist
    },
    {
        path: '/deliveryparceldetail/',
        component: Asyncdeliveryparceldetail
    },
    {
        path: '/negativeprofitauditdetail/',
        component: Asyncnegativeprofitauditdetail
    },
    {
        path: '/negativeprofitauditlist/',
        component: Asyncnegativeprofitauditlist
    },
    {
        path: '*',
        component: AsyncNoFound
    }

]