export const setViewedItemsToLC = (item) => {
    if(localStorage.viewed_items) {
        let viewed_items = localStorage.getItem('viewed_items');
        
        let parsed_items = JSON.parse(viewed_items)

        let isExist = false

        parsed_items.forEach(el => {
            if(el._id === item._id){
                isExist = true
            }
        })

        if(!isExist) {
            if(parsed_items.length === 15) {
                parsed_items.splice(0, 1)
            }
            parsed_items.push(item)
        }

        localStorage.setItem('viewed_items', JSON.stringify(parsed_items))
    }else {
        let viewed_items = [item]

        localStorage.setItem('viewed_items', JSON.stringify(viewed_items))
    }
}