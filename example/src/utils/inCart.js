
function inCart(carts, productId) {
    return carts?.find(el => el.productId === productId)
}
export default inCart