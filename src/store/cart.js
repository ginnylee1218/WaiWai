import axios from 'axios';

export default ({
  namespaced: true,
  state: {
    carts: {},
    cartsLen: 0,
  },
  mutations: {
    CART(state, payload) {
        state.carts = payload;
    },
    CART_LEN(state, payload) {
        state.cartsLen = payload;
    },
  },
  actions: {
    getCart(context) {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        axios.get(api).then((response) => {
            //console.log("CART.js - getCart - Start",response.data)
            context.commit('CART', response.data.data);
            context.commit('CART_LEN', response.data.data.carts.length);
        })
    },

    delCarts(context, id) {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
        context.commit('LOADING', true, { root: true });
        axios.delete(api).then((response) => {
            context.commit('LOADING', false, { root: true });
            if (response.data.success) {
                context.dispatch('getCart');
                context.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'warning' }, { root: true });
            } else {
                context.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'danger' }, { root: true });
            }
        })
    },

    addToCart(context, { id, qty, size }) {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
        const cart = {
            "product_id": id,
            "qty": qty,
            "size": size,
        };
        context.commit('LOADING', true, { root: true });
        axios.post(api, { data: cart }).then((response) => {
            context.dispatch('getCart');
            if (response.data.success) {
                context.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'success' }, { root: true });
            } else {
                context.dispatch('alertMessageModules/updateMessage', { message: response.data.message, status: 'danger' }, { root: true });
            }
            context.commit('LOADING', false, { root: true });
        })
        
    },
  },
  getters: {
      carts: state => state.carts,
      cartsLen: state => state.cartsLen,
  },
})
