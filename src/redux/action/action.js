export const showPopup = (props) => {
    return {
        type: "SHOW_POPUP",
        payload: props
    };
};
export const hidePopup = () => {
    return {
        type: "HIDE_POPUP",
    };
};
export const onLogin = (user) => ({
    type: 'ON_LOGIN',
    payload: user,
});

export const onLogout = () => ({
    type: 'ON_LOGOUT',
});

export const addToCart = (product) => ({
    type: 'ADD_TO_CART',
    payload: product,
});

export const removeFromCart = (productId) => ({
    type: 'REMOVE_FROM_CART',
    payload: productId,
});

export const updateQuantity = (product) => ({
    type: 'UPDATE_QUANTITY',
    payload: product,
});


export const updateCart = (cartList) => {
    return {
        type: 'UPDATE_CART',
        payload: cartList
    }
};

export const resetCart = (cartList) => {
    return {
        type: 'RESET_CART',
        payload: cartList
    }
};