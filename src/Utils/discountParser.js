import { priceParser } from "./priceParser"

export const discountParser = (price, itemDiscount) => {
    const discountType = itemDiscount.toString().includes("%") ? "percent" : "fixed"

    let discount = Number(itemDiscount.toString().replace('%', ''))

    let discount_res = discountType === "percent" 
        ? priceParser(Math.ceil(price - (price / 100 * discount)))
        : priceParser(price - discount)

    return discount_res
} 