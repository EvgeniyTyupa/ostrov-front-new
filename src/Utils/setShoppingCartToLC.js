export const setShoppingCartToLC = (item, count) => {
    if(localStorage.shopping_cart) {

    }else {
        let cart = [{
            item: item._id,
            count: count
        }]

        localStorage.setItem('shopping_cart', JSON.stringify(cart))
    }
}