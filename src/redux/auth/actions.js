const authActions = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    // SET_USER:"SET_USER",
    
    login: (data) => {
        localStorage.setItem("isLogin", true);
        localStorage.setItem("accessToken", data.token);
        return {
            type: authActions.LOGIN,
            isLogin: true,
            accessToken: data.token,
            user_id:data.id,
            user: data

        };
    },
    logout: () => {
        localStorage.setItem("isLogin", false);
        localStorage.setItem("accessToken", null);
        localStorage.setItem("token", null);
        return {
            type: authActions.LOGOUT,
            isLogin: false,
            accessToken: null
        };
    },
    check: data => {
        localStorage.setItem("isLogin", true);
        // localStorage.setItem("accessToken", data.token);
        return {
          type: authActions.LOGIN,
          isLogin: true,
          accessToken: data.token,
        //   user: data
        };
      },
    //   setuser: data => {
    //     return {
    //       type: authActions.SET_USER,
    //       user: data
    //     };
    //   }
    
}

export default authActions