export default function loginReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: { username: action.payload },
                isAuthenticated: true,
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
}