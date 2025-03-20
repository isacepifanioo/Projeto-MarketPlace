export interface User {
    id: string,
    img: string,
    name: string,
    lastname: string,
    birth_date: string,
    email: string,
    password: string,
    purchaseHistory?: Purchase[],
    CartItens?: MyCard[]
}

export interface IProducts {
    id: string,
    img: string[],
    name: string,
    price: string,
    description: string,
    userId: string,
    qtyPurchase: number,
    qtyStars?: number,
    reviews?: IPerfilWithReviews[]
}

export interface IAddress {
    userId: string,
    street: string, // rua
    number: string, // numero da casa
    complement: string, 
    neighborhood: string, // bairro
    city: string, // cidade
    portalCode: string // cep
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

export interface Purchase {
    productId: string,
    productName: string,
    quantity: number,
    price: number,
    date: string
}

export interface MyCard {
    img: string,
    productId: string,
    productName: string,
    quantity: number,
    price: number,
}
