function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}


$(document).ready(function() {
    console.log(getCookie('username'));
    $('#title').text(getCookie('username') + '的待辦事項清單');

    // 讀取並顯示所有 localStorage 資料
    function loadItems() {
        var viewitems = $('#viewitems');
        viewitems.empty(); // 清空容器
        let key = 1;
        let localItem;

        // 讀取 localStorage 內的每筆資料
        while ((localItem = localStorage.getItem(key)) !== null) {
            const data = JSON.parse(localItem);
            var card = `
                <div class="carviewitems col-12 col-sm-4 mt-3">
                    <div class="card back3535" style="border:1px solid #ffc10773;">
                        <div class="card-body row">
                            <div class="col-10">
                                <span class="text-white" style="font-size: 15px;">${data.item}</span>
                                <p class="text-white">${data.datatime}</p>
                            </div>
                            <div class="col-2">
                                <button class="btn border-0 bi bi-trash-fill position-absolute top-50 end-0 translate-middle-y me-3" style="color:red;font-size:20px;" onclick="deleteItem(${key}, this)"></button>
                            </div>
                        </div>
                    </div>
                </div>
             `;
        
            viewitems.append(card);

            key++;
        }
    }

    // 一開始讀取所有待辦事項
    loadItems();

    // 新增項目
    $('#add').click(function() {
        var item = $('#item').val();
        var datatime = $('#datatime').val();

        // 驗證輸入不為空
        if (item && datatime) {
            var newItem = {'item': item, 'datatime': datatime};
            var key = localStorage.length + 1;
            localStorage.setItem(key, JSON.stringify(newItem));

            var newCard = `
                <div class="carviewitems col-12 col-sm-4 mt-3">
                    <div class="card back3535" style="border:1px solid #ffc10773;">
                        <div class="card-body row">
                            <div class="col-10">
                                <span class="text-white" style="font-size: 15px;">${newItem.item}</span>
                                <p class="text-white">${newItem.datatime}</p>
                            </div>
                            <div class="col-2">
                                <button class="btn border-0 bi bi-trash-fill position-absolute top-50 end-0 translate-middle-y me-3" style="color:red;font-size:20px;" onclick="deleteItem(${key}, this)"></button>
                            </div>
                        </div>
                    </div>
                </div>
             `;

            $('#viewitems').append(newCard);

            // 清空輸入欄
            $('#item').val('');
            $('#datatime').val('');
        } else {
            alert('請填寫完整的項目和時間！');
        }
    });

    // 刪除項目
    window.deleteItem = function(key, element) {
        localStorage.removeItem(key);
        $(element).closest('.carviewitems').remove();
    }

});

