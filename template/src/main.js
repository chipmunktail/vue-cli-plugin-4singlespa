import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
<% if (usesRouter) { %>import router from './router'; <% } %>
<% if (usesStore) { %>import store from './store'; <% } %>
<% if (usesElementUI) { %>import '@/plugins/element.js'; <% } %>
<% if (usesSingleSpa) { %>import singleSpaVue from 'single-spa-vue'; <% } %>
import utils from '@/utils';
Vue.prototype.$Utils = utils;
Vue.config.productionTip = false;
<% if (usesSingleSpa) { %>
let vueLifecycles
if (process.env.NODE_ENV === 'development') {
    // 开发环境直接渲染
    new Vue({
        <% if (usesRouter) { %> router, <% } %>
        <% if (usesStore) { %> store, <% } %>
        render: (h<% if(isTs) {%>: any<% } %>) => h(App),
    }).$mount('#app')
    vueLifecycles = singleSpaVue({
        Vue,appOptions: {}
    });
} else {
    <% if (usesSingleSpa) { %> require('./set-public-path') <% } %>
    /* eslint-disable no-console */
    vueLifecycles = singleSpaVue({
        Vue,
        appOptions: {
            el: "#{change_your_root}",
            render: (h<% if(isTs) {%>: any<% } %>) => h(App),
            <% if (usesRouter) { %> router, <% } %>
            <% if (usesStore) { %> store, <% } %>
        },
    });
}
export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
<% } %>
<% if (!usesSingleSpa) { %>
new Vue({
    <% if (usesRouter) { %> router, <% } %>
    <% if (usesStore) { %> store, <% } %>
    render: (h<% if(isTs) {%>: any<% } %>) => h(App),
}).$mount('#app')
<% } %>

