import router from '@/router';
import pinia from '@/store';
import useUserStore from '@/store/moudules/user';
// @ts-ignore
import nprogress from "nprogress";
import "nprogress/nprogress.css";
nprogress.configure({ showSpinner: false });

const userStore = useUserStore(pinia)

router.beforeEach(async(to) => {
    nprogress.start();
    const token = userStore.token;
    if(token) {
        if(to.path === '/login') {
            return '/home';
        } else {
            if(!userStore.username) {
                try {
                    await userStore.userInfo();
                    return ;
                }catch(error) {
                    userStore.logout();
                    return {
                        path: '/login',
                        query: { redirect: to.fullPath }
                    };
                }
            } else {
                return ;
            }
        }
    } else {
        if(to.path === '/login') {
            return ;
        } else {
            return {
                path: '/login',
                query: { redirect: to.fullPath }
            };
        }
    }
});

router.afterEach((to) => {
    let title = to.meta.title || undefined;
    document.title = 'project' + (title ? ` - ${title}` : '');
    nprogress.done();
});
