$(function () {
    const layer = layui.layer;
    const form = layui.form;
    const initAtrlaye = () => {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: (res) => {
                if (res.status !== 0) return layer.msg('获取文章分类失败');
                layer.msg('获取文章分类成功');
                const htmlStr = template("tpl-table", res);
                $('tbody').html(htmlStr);
            }
        })
    }

    //弹出添加窗口
    let indexAdd = null;
    $("#btnAddCate").click(() => {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    });
    //添加
    $('body').on('submit', '#form-add', (e) => {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $('#form-add').serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg('添加失败');
                initAtrlaye();
                layer.msg('添加成功');
                layer.close(indexAdd);
            }
        })
    })

    //弹出编辑窗口
    // 通过代理方式，为 btn-edit 按钮绑定点击事件
    let indexEdit = null;
    $("tbody").on("click", ".btn-edit", function () {
        // 弹出修改文章分类的弹窗
        indexEdit = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "修改文章分类",
            content: $("#dialog-edit").html(),
        });
        console.log($(this).attr('data-id'));

        // 发起请求获取对应分类的数据
        const id = $(this).attr("data-id");
        $.ajax({
            type: "GET",
            url: "/my/article/cates/" + id,
            success: (res) => {
                if (res.status !== 0) return layer.msg('获取分类失败');
                layer.msg('获取分类成功')
                form.val("form-edit", res.data);
                console.log(res);
                console.log(form.val('form-edit', res.data));
            },
        });
    });

    //更新文章分类
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg('更新分类失败');
                layer.msg('更新分类成功');
                layer.close(indexEdit);
                initAtrlaye();
            }
        })
    })

    //删除
    $('tbody').on('click', '.btn-delete', function () {
        const id = $(this).attr('data-id');
        layer.confirm("确定删除吗？", { icon: 3, title: "提示" }, function (index) {
            $.ajax({
                type: 'GET',
                url: '/my/article/deletecate/' + id,
                success: (res) => {
                    if (res.status !== 0) return layer.msg('删除分类失败');
                    layer.msg('删除分类成功');
                    initAtrlaye();
                }
            })
        })
    })



    initAtrlaye();
})