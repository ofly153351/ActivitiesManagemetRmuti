import { redirect } from "next/navigation"


export const blockNulluser = (user) => {
    if (!user) {
        redirect('/Home')
    }
}

export const checkUserAuth = () => {
    const cookies = document.cookie;

    if (cookies) {
        redirect('/Home')
    }
}