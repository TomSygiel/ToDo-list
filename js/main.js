//Class used to define object data types
function TheList(listItem) {
    this.item = listItem;
    this.status = false;
}

var todo1 = new TheList("Feed the cat", false);
var todo2 = new TheList("Wash the dishes", false);
var todo3 = new TheList("Buy milk", false);

var myList = [todo1, todo2, todo3];

function printList() {

    localStorage.setItem("list", JSON.stringify(myList));

    myList = JSON.parse(localStorage.getItem("list"));

    var routineList = "";

    for (var i = 0; i < myList.length; i++) {
        if (myList[i].status === true) {
            routineList += "<li><input onclick='flip(" + i + ")' type='checkbox' class='checkbox' checked><label>" + myList[i].item + "</label><input type='image' src='images/146096-ffffff.png' class='remove' id='" + i +
                "'></input></i></li>";
        } else {
            routineList += "<li><input onclick='flip(" + i + ")' type='checkbox' class='checkbox'><label>" + myList[i].item + "</label><input type='image' src='images/146096-ffffff.png' class='remove' id='" + i +
                "'></input></i></li>";
        }
    }

    document.getElementById("resultList").innerHTML = routineList;

    var deleteFromList = document.getElementsByClassName('remove');
    for (var i = 0; i < deleteFromList.length; i++) {
        deleteFromList[i].addEventListener('click', remove);
    };
}

//Toggle between checked and unchecked items
function flip(toggleCheck) {
    myList[toggleCheck].status = !myList[toggleCheck].status;
    localStorage.setItem("list", JSON.stringify(myList));
    printList();
}

//Remove to-do item
function remove() {
    var id = this.getAttribute('id');
    myList.splice(id, 1);
    localStorage.setItem('list', JSON.stringify(myList));

    printList();

    return false;
}

//Sort done items to the bottom
function sortList() {
    myList.sort(function (a, b) {
        var notCompleted = a.status;
        var completed = b.status;
        if (completed === true) {
            return -1;
        }
        if (notCompleted === false) {
            return 1;
        }
        return 0;
    });
    localStorage.setItem("list", JSON.stringify(myList));
    printList();
}

//Add items to the list
function addToDo() {

    var item = document.getElementById("inputListItem").value;

    if (item === "") {
        alert("Please add a to-do item");
        document.getElementById("inputListItem").focus();
    } else {
        var object = new TheList(item);
        myList.push(object);
        localStorage.setItem("list", JSON.stringify(myList));
        printList();
    }

    document.getElementById("inputListItem").value = "";

}