import { UserModel } from "../models/user.model"

export class UserService {
    public static USERS_KEY = 'pki_users'
    public static ACTIVE_KEY = 'pki_active'

    static getUsers(): UserModel[] {
        if (!localStorage.getItem(UserService.USERS_KEY))
            localStorage.setItem(UserService.USERS_KEY, JSON.stringify([
                {
                    firstName: 'User',  
                    lastName: 'Example',
                    email: 'user@example.com',
                    phone: '+38163123123',
                    password: 'user123',
                }
            ]))
        return JSON.parse(localStorage.getItem(UserService.USERS_KEY)!)
    }

    static findUserByEmail(email: string) {
        const users: UserModel[] = this.getUsers()
        const exactUser = users.find(u => u.email === email)

        if (!exactUser)
            throw new Error('USER_NOT_FOUND')

        return exactUser
    }

    static login(email: string, password: string) {
        const user = this.findUserByEmail(email)
        if (user.password !== password) {
            throw new Error('BAD_CREDENTIALS')
        }

        localStorage.setItem(UserService.ACTIVE_KEY, user.email)
    }

    static signup(payload: UserModel) {
        const users: UserModel[] = this.getUsers()
        users.push(payload)
        localStorage.setItem(UserService.USERS_KEY, JSON.stringify(users))
    }

    static getActiveUser() {
        const active = localStorage.getItem(UserService.ACTIVE_KEY)
        if (!active)
            throw new Error('NO_ACTIVE_USER')

        return this.findUserByEmail(active)
    }

    static createReservation(id: number, airline: string, suite: string) {
        const active = this.getActiveUser()
        const users = this.getUsers()
        users.forEach(u => {
            if (u.email == active.email) {
                /*u.data.push({
                    flightId: id,
                    airline,
                    suite,
                    status: 'waiting',
                    createdAt: new Date().toISOString(),
                    updatedAt: null
                })*/
            }
        })
        localStorage.setItem(UserService.USERS_KEY, JSON.stringify(users))
    }

    static updateReservationStatus(createdAt: string, newStatus: 'paid' | 'waiting' | 'canceled' | 'liked' | 'disliked') {
        const active = this.getActiveUser()
        const users = this.getUsers()
        users.forEach(u => {
            if (u.email == active.email) {
                /*u.data.forEach(r => {
                    if (r.createdAt == createdAt) {
                        r.updatedAt = new Date().toISOString()
                        r.status = newStatus
                    }
                })*/
            }
        })
        localStorage.setItem(UserService.USERS_KEY, JSON.stringify(users))
    }

    static updateUser(newUser: UserModel) {
        const active = this.getActiveUser()
        const users = this.getUsers()
        users.forEach(u => {
            /*if (u.email == active.email) {
                u.firstName = newUser.firstName
                u.lastName = newUser.lastName
                u.phone = newUser.phone
                u.destination = newUser.destination
            }*/
        })
        localStorage.setItem(UserService.USERS_KEY, JSON.stringify(users))
    }

    static updateUserPassword(newPassword: string) {
        const active = this.getActiveUser()
        const users = this.getUsers()
        users.forEach(u => {
            if (u.email == active.email) {
                u.password = newPassword
            }
        })
        localStorage.setItem(UserService.USERS_KEY, JSON.stringify(users))
    }
    static logout() {
        localStorage.removeItem(UserService.ACTIVE_KEY)
    }
}