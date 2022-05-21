$.ajaxPrefilter((option) => {
    option.url = `http://www.liulongbin.top:3007` + option.url;
    //在请求之前给有权限的接口注入 token
    if (option.url.includes("/my/")) {
        option.headers = {
            Authorization: localStorage.getItem('token'),
        };
    }

    //无论成功还是失败 最终都会调用complete回调函数
    option.complete = (res) => {
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            console.log(res.data);
            //  强制清空 token
            localStorage.removeItem("token");
            // 强制跳转到登录页面
            location.href = "/login2.html"
        }
    };

})