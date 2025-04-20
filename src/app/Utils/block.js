import { redirect } from "next/navigation"


export const blockNulluser = (user) => {
    if (!user) {
        redirect('/Home')
    }
}

export const checkUserAuth = (user) => {

    if (user) {
        redirect('/Home')
    }
}