const initialState = {
    product: {},
    isShowPopup: false,
    currentUser: {
        email: '',
        password: '',
    },
    listCart: []
}


// REDUCER
export const popupReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_POPUP":
            return ({
                ...state,
                isShowPopup: true,
                product: action.payload
            });
        case "HIDE_POPUP":
            return ({
                ...state,
                isShowPopup: false,
                product: {}
            });
        default: return state;
    }
}


// REDUCER
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ON_LOGIN':
            return {
                ...state,
                currentUser: action.payload,
            };
        case 'ON_LOGOUT':
            return {
                ...state,
                currentUser: {
                    email: '',
                    password: '',
                },
            };
        default: return state;
    }
}

// CART
export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const { payload } = action;
            const productExists = state.listCart.some(item => item._id.$oid === payload._id.$oid);
            if (productExists) {
                // If the product already exists, update its quantity
                const cartList = state.listCart.map(item => {
                    if (item._id.$oid === payload._id.$oid) {
                        return { ...item, quantity: item.quantity + payload.quantity };
                    }
                    return item;
                });
                return { ...state, listCart: cartList };
            } else {
                // If the product doesn't exist, add it to the cart list
                const cartList = [...state.listCart, payload];
                return { ...state, listCart: cartList };
            }
        }
        case 'REMOVE_FROM_CART': {
            //Create a copy of the cart list
            const cartList = state.listCart.slice();
            //Find the index of the item to be removed
            const index = cartList.findIndex(item => item.id === action.payload);
            //Remove the item from the cart list
            cartList.splice(index, 1);
            //Return the updated state
            return { ...state, listCart: cartList };
        }
        case 'UPDATE_QUANTITY': {
            console.log(action.payload);
            //Create a copy of the cart list
            const cartList = state.listCart.slice();
            //Find the index of the item to be updated
            const index = cartList.findIndex(item => item._id.$oid === action.payload.id);
            //Update the quantity of the item in the cart list
            cartList[index].quantity = action.payload.quantity;
            //Return the updated state
            return { ...state, listCart: cartList };
        }
        case 'UPDATE_CART': {
            // Return the updated state
            return { ...state, listCart: action.payload };
        }
        case 'RESET_CART': {
            // Return the updated state
            return { ...state, listCart: [] };
        }

        default: return state;
    }
}