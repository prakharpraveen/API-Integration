export default function (state = { users: [], usersBackUp: [], userToken: '', isFetchingUser: true, logInUserName: '' }, action) {
    switch (action.type) {
        case "LOGIN_USER":
            return { ...state, userToken: action.payload, logInUserName: action.logInUserName };

        case "USER_IS_FETCHING":
            return { ...state, isFetchingUser: action.payload }

        case "USERS":
            return { ...state, users: action.payload, usersBackUp: action.payload, isFetchingUser: false }

        case "DELETE_USER":
            return {
                ...state,
                users: {
                    ...state.users, data: state.users.data.filter(user => user.id !== action.payload),
                    total: state.users.total - 1
                }
            }
        case "ADD_USER":
            return {
                ...state,
                users: { ...state.users, data: [...state.users.data, action.payload],
                    total: state.users.total + 1
                 }
            }
        case "UPDATE_USER":
            return {
                ...state, users: {
                    ...state.users, data: state.users.data.map(user => user.id === action.payload.id ? action.payload : user),

                }
            }
        case "SEARCH_KEY":
            return {
                ...state, users: {
                    ...state.usersBackUp, data: state.usersBackUp.data.filter(user => {
                        let str = user.first_name + " " + user.last_name;
                        return str.toLowerCase().search(action.payload.toLowerCase()) === -1 ? false : true;
                    })
                }
            }
        default:
            return state;
    }
}