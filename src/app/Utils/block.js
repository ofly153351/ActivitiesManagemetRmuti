import { redirect } from "next/navigation"


export const blockNulluser = (user) => {
    if (!user) {
        redirect('/Home')
    }
}