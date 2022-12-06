export type PostType = {
    id: string,
    createdAt: string,
    content: string,
    image?: string,
    user: UserType,
}

export type UserType = {
    id: string,
    name: string,
    username: string,
    image?: string,
}