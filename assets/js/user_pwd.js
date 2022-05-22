const layer = layui.layer;
const form = layui.form;

//密码校验
form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位,且不能出现空格"],
    samePwd: (val) => {
        if (val === $("[name=oldPwd]").val()) return "新旧密码不能相同！";
    },
    rePwd: (val) => {
        if (val !== $("[name=newPwd]").val()) return "两次密码不一致！";
    },
})



$('.layui-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/my/updatepwd',
        data: $(this).serialize(),
        success: (res) => {
            if (res.status !== 0) return layer.msg('修改密码失败');
            layer.msg('修改密码成功');
            window.parent.location.href = '/login2.html';

            $("#btnAddCate").click(() => {
                layer.open({
                    type: 1,
                    area: ["500px", "250px"],
                    title: "添加文章分类",
                    content: "ABC",
                });
            });
        }
    })
    //重置密码
    $('.layui-form')[0].reset();
})