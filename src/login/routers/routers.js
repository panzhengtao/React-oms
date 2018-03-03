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

const Asyncexceptionorderlist = (props) => (
    <Bundle load={() => import('../../exceptionorderlist')}>
        {(Asyncexceptionorderlist) => <Asyncexceptionorderlist {...props} />}
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
        path: '*',
        component: AsyncNoFound
    }

]