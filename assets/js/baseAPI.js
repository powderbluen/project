$.ajaxPrefilter((options) => {
    options.url = `http://www.liulongbin.top:3007` + options.url;
    // alert(options.url)
})