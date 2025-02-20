export interface UserRegister {
    img: FileList | string
    name: string
    lastname: string
    email: string
    password: string
    confirmPassword: string
    birth_date: string
}

export interface UserLogin {
    email: string
    password: string
}
