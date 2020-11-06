ClassicEditor
.create(document.querySelector('#content'), {
    language:"zh-cn",
    ckfinder: {
        uploadUrl: '/articles/uploadImage',
    },
})
.catch(error => {
    console.log(error);
});