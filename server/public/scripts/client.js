// after document is ready, init function will run
$(document).ready(init);
// set global variables
let itemList = [];
let completedItemId = 0;

function init() {
  // run getList function
  getList();
  // when Add Task button is clicked, run clickAdd
  $(".js-btn-add").on("click", clickAdd);
  // when delete button in js-container is clicked, run clickDelete
  $(".js-container").on("click", ".js-btn-delete", clickDelete);
  // when complete button in js-container is clicked, run clickComplete
  $(".js-container").on("click", ".js-btn-complete", clickComplete);
}

//
// EVENT HANDLERS
//-----------------

// get the value from input field and save it as item, and set complete value as 'N'.
// send that object to saveItem function then empty the input field
function clickAdd() {
  const newItem = {
    item: $(".js-new-item").val(),
    complete: "N",
  };
  saveItem(newItem);
  $(".js-new-item").val("");
}

// save the id of the item for the clicked delete button.
// send the item id to deleteItem function
function clickDelete(event) {
  console.log(this);
  const itemId = event.target.dataset.id;
  deleteItem(itemId);
}

// save the id of the item for the clicked complete button.
// target row of the clicked complete button by using .parent() and save the row as $itemRowElement
// get the item value from the row, and set status as 'Y'
// save the values as completedItem and then send id and completedItem to updateItem function
function clickComplete(event) {
  completedItemId = event.target.dataset.id;
  const $itemRowElement = $(this).parent().parent();
  const currentItem = $itemRowElement.children(".js-item").text().trim();
  const currentStatus = "Y";
  const completedItem = {
    item: currentItem,
    complete: currentStatus,
  };
  updateItem(completedItemId, completedItem);
}

//
// API INTERACTION
//-------------------

// using 'POST' method via '/list' route, send newItem data to server.
// once it's completed successfully, run getList function
// if there is an error, console.log the error and send the warning.
function saveItem(newItem) {
  $.ajax({
    method: "POST",
    url: "/list",
    data: newItem,
  })
    .then((response) => {
      getList();
    })
    .catch((err) => {
      console.log("Error:", err);
      console.warn("There was an error saving the new item");
    });
}

// get the data from server using 'GET' method using '/list' route.
// save the response as itemList then run render function with the itemList array.
// if there is an error, console.log the error and send the warning.
function getList() {
  $.ajax({
    method: "GET",
    url: "/list",
  })
    .then((response) => {
      itemList = response;
      render(itemList);
    })
    .catch((err) => {
      console.log("Error:", err);
      console.warn("There was an error getting the list");
    });
}

// delete the item with the id using 'DELETE' method using `/list/${id}`
// when the delete is successful, console.log the response then run getList function
// to get the updated list and render it to the DOM
// if there was an error, console.log the error.
function deleteItem(id) {
  $.ajax({
    method: "DELETE",
    url: `/list/${id}`,
  })
    .then((response) => {
      console.log("Delete", response);
      getList();
    })
    .catch((err) => {
      console.log("Error:", err);
      console.warn("There was an error deleting the item");
    });
}

// update item with the id using 'PUT' method and `/list/${id}` route
// then run getList function, if there is an error, console.log it
function updateItem(id, completedItem) {
  $.ajax({
    method: "PUT",
    url: `/list/${id}`,
    data: completedItem,
  })
    .then((response) => {
      getList();
    })
    .catch((err) => {
      console.log("Error:", err);
      console.warn("There was an error updating completed item");
    });
}

// empty the container, then run the for loop to go through every single index in the array.
// append the item name with complete and delete button next to it.
// if complete status is 'Y', add 'complete' class to the row
function render() {
  $(".js-container").empty();
  for (let i = 0; i < itemList.length; i++) {
    const item = itemList[i];
    $(".js-container").append(`
    <tr class="row">
      <td class ="js-item">${item.item}</td>
      <td><button class ="js-btn-complete" data-id="${item.id}" data-index="${i}">Complete</button></td>
      <td><button class ="js-btn-delete" data-id="${item.id}">Delete</button></td>
    </tr>`);
    if (item.complete === "Y") {
      const $el = $(".js-container").children().last();
      $el.addClass("complete");
    }
  }
}
