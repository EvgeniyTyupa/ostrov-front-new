import { discountParser } from '../Utils/discountParser'

export const useCheckActionConditions = (items, totalSum, totalCount) => {
    let actions = []

    items.forEach(el => {
        if(el.item.action){
            let isExist = false
            actions.forEach(action => {
                if(action._id === el.item.action._id) {
                    isExist = true
                }
            })
            if(!isExist){
                actions.push(el.item.action)
            }
        }
    })

    let actionDiscount = 0
    let gift = []

    actions.forEach(el => {
        if(el.kind_of_action === 'all') {
            if(el.from_sum_in_bill) {
                if(el.from_sum_in_bill <= totalSum) {
                    actionDiscount = el.discount
                    gift = el.gift
                }
            }
            if(el.from_items_count) {
                if(el.from_items_count <= totalCount){
                    actionDiscount = el.discount
                    gift = el.gift
                }
            }
        }
        else {
            let count = 0
            let sum = 0
            if(el.from_sum_in_bill) {
                items.forEach(item => {
                    if(item.item.action){
                        if(item.item.action._id === el._id) {
                            if(item.item.action && item.item.action.from_sum_in_bill === 0 && !item.item.action.from_items_count) {
                                sum += Number(discountParser(item.item.price, item.item.action.discount).replace(/ /g,'')) * item.count
                            }else {
                                sum += item.item.price * item.count
                            }
                        }
                    }
                })
                if(el.from_sum_in_bill <= sum) {
                    actionDiscount = el.discount
                    gift = el.gift
                }
            }
            if(el.from_items_count) {
                items.forEach(item => {
                    if(item.item.action._id === el._id) {
                        count += item.count
                    }
                })
                if(el.from_items_count <= count) {
                    actionDiscount = el.discount
                    gift = el.gift
                }
            }

        }
    })

    return { actions, actionDiscount, gift }
}