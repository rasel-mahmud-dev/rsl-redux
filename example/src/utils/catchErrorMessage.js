function catchErrorMessage(ex, defaultMessage, errMap) {
    let msg = ex?.response?.data?.message
    if (msg && typeof msg === "string") {

        if (errMap && Object.keys(errMap).length) {
            for (let errMapKey in errMap) {
                if (msg.includes(errMapKey)) {
                    msg = errMap[errMapKey]
                    break;
                }
            }
        } else if (msg.includes("violates unique constraint")) {
            msg = "Already done"

        }
    } else if (ex?.message && typeof ex.message === "string") {
        msg = ex.message
    } else {
        msg = defaultMessage ?? "Operator fail"
    }
    return msg
}

export default catchErrorMessage


//
// // uses
// createAccount()
// function createAccount(){
//     try{
//         // create account with database proceedure...
//     } catch (ex: any) {
//         throw Error(catchErrorMessage(ex, "", {
//             unique_email: "This employee already exists"
//         }))
//     }
// }