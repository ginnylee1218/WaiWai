export default({
    namespaced: true,
    state: {
        messages: [],
    }, // states

    actions: {
        updateMessage(context, {messages, status} ) {
            const timestamp = Math.floor(new Date() / 1000);
            context.commit('PUSH_MESSAGES', {
                messages,
                status,
                timestamp,
            });
            context.dispatch('removeMessageWithTiming', timestamp);
        },

        removeMessage(context, num) {
            context.commit('REMOVE_MESSAGES', num);
        },

        removeMessageWithTiming(context, timestamp) {
            const msg = [...context.state.messages];
            setTimeout(() => {
                msg.forEach((item, i) => {
                    if (item.timestamp === timestamp) {
                        context.commit('REMOVE_MESSAGES', i);
                    }
                });
            }, 3000);
        },

    }, // actions

    mutations: {
        PUSH_MESSAGES(state, msg) {
            state.messages.push(msg);
        },
        REMOVE_MESSAGES(state, num) {
            state.messages.splice(num, 1);
        },
    }, // mutations

    getters: {
        getMessages: state => state.messages,
    }, // getters

});