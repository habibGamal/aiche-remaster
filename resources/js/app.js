// require('./bootstrap');
import { InertiaApp } from '@inertiajs/inertia-react'
import React from 'react'
import { render } from 'react-dom'
import Layout from './Layout'
import 'antd/dist/antd.css';
const app = document.getElementById('app')
render(
    <InertiaApp
        initialPage={JSON.parse(app.dataset.page)}
        // resolveComponent={name => import(`./Pages/${name}`).then(module => module.default)}
        resolveComponent={
            name => {
                const page = require(`./Pages/${name}`).default
                page.layout = page => <Layout children={page} />
                return page
              }
        }
    />
    ,
    app
)
