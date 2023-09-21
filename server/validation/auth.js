import Error from "../helper/error.js"

export const learnerRegisterValidate = data => {
    const error = new Error()

    error.isRequired(data.username, "username")
    .isRequired(data.password, "password")
    .isOnlyRequiredOneOf([{field:data.email, name:'email'},{field:data.phone, name:'phone'}])

    return error.get()
}

export const userLoginValidate = data => {
    const error = new Error()

    error.isRequired(data.username, "username")
    .isRequired(data.password, "password")
    return error.get()
}

export const userForgotPw = data => {
    const error = new Error()

    error.isRequired(data.phone, "phone")

    return error.get()
}