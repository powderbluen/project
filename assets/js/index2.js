$(function () {
    //调用getUserInfo函数获取用户基本信息
    getUserInfo();

    const layer = layui.layer;
    $('#btnLogout').on('click', () => {
        layer.confirm('确定退出吗？', { icon: 3, title: '' }, function () {
            //清空本地存储里面的登录唯一标识符token
            localStorage.removeItem('token');
            //重新跳转到登录页面
            location.href = '/login2.html';
        })
    })

})

const layer = layui.layer;
//获取用户基本信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token'),
        },
        success: (res) => {
            if (res.status !== 0) return layer.msg('数据请求失败');
            layer.msg('获取用户信息成功');
            console.log(res);
            //调用renderAvatar函数渲染用户头像
            renderAvatar(res.data);
        },
    })
}

//渲染用户头像
const renderAvatar = (user) => {
    //获取用户名
    let name = user.nickname || user.username;
    //设置欢迎文本
    $('#welcome').html(`欢迎 ${name}`);
    //按需渲染用户头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide();
        let firstName = name[0].toUpperCase();
        $('.text-avatar').html(firstName);
    }
}

function change() {
    $('#art_list').addClass('layui-this').next().removeClass('layui-this');
}