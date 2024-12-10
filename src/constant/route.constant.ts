export const ADMIN_ROUTE = {
    path: 'admin',
    get url() {
        return `/${this.path}`
    }
}


export const ADMIN_MEETING_ROUTE = {
    path: 'meeting',
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



