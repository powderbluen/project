$(function () {
    //切换登录和注册
    $('#link_login').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_reg').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    //注册功能
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        if ($('.confirm').val() !== $('.pwd').val()) return alert('密码不一致');
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            success: (res) => {
                if (res.status !== 0) return alert(res.message);
                alert('注册成功');
                $('#form_reg [name=username]').val('');
                $('#form_reg [name=password]').val('');
                $('#form_reg [name=repwd]').val('');
                //注册成功调转到登录界面
                $('#link_reg').click();
            }
        })
    })

    //登录功能
    $('#form_login').on('submit', (e) => {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $('#form_login').serialize(),
            success: (res) => {
                if (res.status !== 0) return alert(res.message);
                alert('登录成功');
                console.log(res);
                $('#form_login [name=password]').val('');
                localStorage.setItem('token', res.token);
                location.href = '/index2.html';
            }
        })
    })



})