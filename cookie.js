function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
$(document).ready(function() {
    $('#add').click(function(){
        var name = $('#name').val();
        setCookie('username', name, 99);
        location.href='./items.html';
    });
});

$(function () {
    $('[data-toggle="popover"]').popover(); // 初始化 Popover
});
