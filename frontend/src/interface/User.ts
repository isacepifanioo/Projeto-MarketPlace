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


export interface IProducts {
    id: string,
    img: string[],
    name: string,
    price: number,
    description: string,
    userId: string,
    qtyPurchase: number,
    qtyStars?: number,
    reviews?: IPerfilWithReviews[]
}

export interface IPerfilWithReviews {
    userId: string,
    perfilImg: string,
    name: string, 
    lastname: string
    date: string,
    review: IReviews
}

export interface IReviews {  
    stars: number,
    comment?: string,
    reviewFile?: string[],
}