

export const HOME_ROUTE = {
    path: '/',
    get url() {
        return `/${this.path}`
    }
}

export const ADMIN_ROUTE = {
    path: 'admin',
    get url() {
        return `/${this.path}`
    }
}
export const LOGIN_ROUTE = {
    path: '/login',
    get url() {
        return `/${this.path}`
    }
}
export const SIGNUP_ROUTE = {
    path: '/signup',
    get url() {
        return `/${this.path}`
    }
}

export const ADMIN_MEETING_ROUTE = {
    path: 'meetings',
    get url() {
        return `${ADMIN_ROUTE.url}/${this.path}`
    }
}

export const ADMIN_USER_ROUTE = {
    path: 'users',
    get url() {
        return `${ADMIN_ROUTE.url}/${this.path}`
    }
}
export const ADD_USER_ROUTE = {
    path: 'add',
    get url() {
        return `${ADMIN_USER_ROUTE.url}/${this.path}`
    }
}

export const ADD_MEETING_ROUTE = {
    path: 'add',
    get url() {
        return `${ADMIN_MEETING_ROUTE.url}/${this.path}`
    }
}


