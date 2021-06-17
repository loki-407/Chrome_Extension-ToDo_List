
// create-todo <- create todo button on click open ".new-item"
// new-item <- if button pressed it save ans hide "new-item"

document.querySelector('.create-todo').addEventListener('click', function () {
    document.querySelector('.new-item').style.display = 'flex';

});

document.querySelector('.new-item button').addEventListener('click', function () {

    var itemName = document.querySelector('.new-item input').value;
    if (itemName != '') {
        var items = localStorage.getItem('todo-items');
        var itemArr = JSON.parse(items);

        itemArr.push({ "item": itemName, "status": 0 });
        //console.log(itemArr);
        saveItems(itemArr);
        fetchItems();
        document.querySelector('.new-item input').value='';
        document.querySelector('.new-item').style.display = 'none';
    }

});


// const items = [{ "item": "Record next video ", "status": 0 },
// { "item": "Record next next next video ", "status": 1}];

// const itemsStr = JSON.stringify(items);

// console.log(items);
// console.log(itemsStr);


function fetchItems() {

    const itemsList = document.querySelector('ul.todo-items');

    itemsList.innerHTML = '';
    var newItemHTML = '';

    try {
        var items = localStorage.getItem('todo-items');
        var itemArr = JSON.parse(items);

        for (var i = 0; i < itemArr.length; i++) {

            var status = '';
            if (itemArr[i].status == 1) {
                status = 'btn-success';
            }
            newItemHTML += `
            <li class="list-group-item" data-itemindex="${i}">"${itemArr[i].item}"
            <span class="check btn btn-primary ${status} itemComplete">done</span> 
            <span class="btn btn-danger itemDelete">delete</span> </li>`;
        }

        //console.log(newItemHTML);
        itemsList.innerHTML = newItemHTML;

        /* adding even listener _________________________________________________________________________________________*/

        var itemsListUL = document.querySelectorAll('ul li');
        //console.log(itemsListUL);
        for (var i = 0; i < itemsListUL.length; i++) {
            //console.log("pataa nhiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
            itemsListUL[i].querySelector('.itemComplete').addEventListener('click', function () {
                var ind = this.parentNode.dataset.itemindex;
                //console.log(ind);
                itemComplete(ind);
            });

            itemsListUL[i].querySelector('.itemDelete').addEventListener('click', function () {
                var ind = this.parentNode.dataset.itemindex;
                itemDelete(ind);
            });

        }

    } catch (e) {
        //.
        //create a deafult item list
    }
}

function itemComplete(ind) {
    //console.log('itemComplete');
    var items = localStorage.getItem('todo-items');
    var itemArr = JSON.parse(items);

    itemArr[ind].status = 1;
    saveItems(itemArr);

    document.querySelector('ul.todo-items li[data-itemindex="' + ind + '"] span.check').classList.add("btn-success");

}

function itemDelete(ind) {

    var items = localStorage.getItem('todo-items');
    var itemArr = JSON.parse(items);

    itemArr.splice(ind, 1);
    saveItems(itemArr);
    document.querySelector('ul.todo-items li[data-itemindex="' + ind + '"]').remove();

}

function saveItems(obj) {
    var string = JSON.stringify(obj);
    localStorage.setItem('todo-items', string);
}

fetchItems();