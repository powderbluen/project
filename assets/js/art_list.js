$(function () {
    const layer = layui.layer;
    const form = layui.form;
    const laypage = layui.laypage;
    // 定义一个查询的参数对象，将来请求数据的时候，
    // 需要将请求参数对象提交到服务器
    const q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 3, // 每页显示几条数据，默认每页显示2条
        cate_id: "", // 文章分类的 Id
        state: "", // 文章的发布状态
    };

    const inittable = () => {
        $.ajax({
            type: 'GET',
            url: "/my/article/list",
            data: q,
            success: (res) => {
                console.log(res);
                if (res.status !== 0) return layer.msg('获取列表失败');
                //使用模板引擎渲染页面的数据
                const htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr)
                renderPage(res.total);
            }
        })
    }
    inittable();


    const initCate = () => {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: (res) => {
                console.log(res);
                if (res.status !== 0) return layer.msg('获取失败');
                const htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr);
                form.render();
            }
        })
    }

    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        // 获取表单中选中项的值
        let cate_id = $('[name=cate_id]').val();
        let state = $('[name=state]').val();
        // 为查询参数对象 q 中对应的属性赋值
        q.cate_id = cate_id;
        q.state = state;
        // 根据最新的筛选条件，重新渲染表格的数据
        inittable();
    })

    // 定义渲染分页方法
    function renderPage(total) {
        console.log(total);
        // 调用 laypage.render() 方法来渲染分页的结构
        laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 分页发生切换的时候，触发 jump 回调
            jump: function (obj, first) {
                console.log(obj.curr);
                // 把最新的页码值，赋值到 q 这个查询参数对象中
                q.pagenum = obj.curr;
                // 把最新的条目数，赋值到 q 这个查询参数对象的 pagesize 属性中
                q.pagesize = obj.limit;
                // 根据最新的 q 获取对应的数据列表，并渲染表格
                if (!first) {
                    inittable();
                }
            }
        })
    }

    //删除
    $('tbody').on('click', '.btn-delete', function () {
        //获取到文章id
        const id = $(this).attr('data-id');

        const len = $('.btn-delete').length;
        //询问用户是否要删除数据
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: 'GET',
                url: '/my/article/delete/' + id,
                success: (res) => {
                    if (res.status !== 0) return layer.msg('删除失败');
                    layer.msg('删除成功');
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? q.pagenum : q.pagenum - 1;
                    }
                    inittable();
                }
            });
            layer.close(index);
        })
    })




    initCate();


})