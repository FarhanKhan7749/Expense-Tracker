import react, { useState } from "react";

const AuthContext = react.createContext({
    token: "",
    isLoggedin: false,
    login: (token) => { },
    logout: () => { }
});

export const AuthContextProvider = (props) => {
    const intialToken = localStorage.getItem('token');
    const intialEmail = localStorage.getItem('email')
    const [token, setToken] = useState(intialToken);
    const [userEmail, setUserEmail] = useState(intialEmail);

    const userIsLoggedIn = !!token;


    const loginHandler = (token, email) => {
        setToken(token);
        const newUserEmail = email.replace('@', '').replace('.', '');
        setUserEmail(newUserEmail);
        //console.log(token);
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
    };

    // const userIdentifierHandler = (email) => {
    //     const newUserEmail = email.replace('@', '').replace('.', '');
    //     setUserEmail(newUserEmail);
    // }
    const logouthandler = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    };

    const contextValue = {
        token: token,
        email: userEmail,
        isLoggedin: userIsLoggedIn,
        login: loginHandler,
        logout: logouthandler,
    };

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
};

export default AuthContext;