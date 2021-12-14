export interface IAddress{
    street: string;
    suite: string;
    city: string;
    zipCode: string;
    geo: {
        lat: string;
        lng: string;
    }
}

export interface ICompany{
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface IUsers {
    id: number;
    name: string;
    username: string;
    email: string;
    address: IAddress;
    phone: string;
    website: string;
    company: ICompany;
}