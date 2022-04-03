export const priceParser = (price) => {
    let priceString = price.toString()
    if(priceString.length > 3) {
        priceString = priceString.substring(0, priceString.length - 3) + " " + priceString.substring(1, priceString.length);
    }
    return priceString
}