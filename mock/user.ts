function createUserList() {
    return [
        {
            userId: 1,
            avatar:
                'https://media.prts.wiki/thumb/2/2d/Avatar_special_20.png/120px-Avatar_special_20.png?v=o0m8l7bqf229a532mkyhlvwxgf1lizv',
            username: 'admin',
            password: '111111',
            desc: '平台管理员',
            roles: ['平台管理员'],
            buttons: ['cuser.detail'],
            routes: ['home'],
            token: 'Admin Token',
        },
        {
            userId: 2,
            avatar:
                'https://media.prts.wiki/thumb/c/c0/Avatar_special_56.png/120px-Avatar_special_56.png?v=8ifebju64rye7zd548n6ndvti4vpdwb',
            username: 'system',
            password: '111111',
            desc: '系统管理员',
            roles: ['系统管理员'],
            buttons: ['cuser.detail', 'cuser.user'],
            routes: ['home'],
            token: 'System Token',
        }
    ]
}

export default [
    {
        url: '/api/user/login',
        method: 'post',
        response: ({ body }: any) => {
            const { username, password } = body;

            const checkUser = createUserList().find(
                (item) => item.username === username && item.password === password
            )
            if(!checkUser){
                return { code: 201, data: { message: '账号或者密码错误' }}
            }
            const { token } = checkUser
            return { code: 200, data: { token } }
        },
    },
    {
        url: '/api/user/info',
        method: 'get',
        response: ({ headers }: any) => {
            const token = headers.token;
            const checkUser = createUserList().find(
                (item) => item.token === token
            )
            if(!checkUser){
                return { code: 201, data: { message: '获取用户信息失败' }}
            }
            return { code: 200, data: { checkUser } }
        },
    }
]