$(document).ready(init);

let itemList = [];
function init() {
  getList();
  $(".js-btn-add").on("click", clickAdd);
  $(".js-container").on("click", ".js-btn-delete", clickDelete);
  $(".js-container").on("click", ".js-btn-complete", clickComplete);
}

//
// EVENT HANDLERS
//-----------------

function clickAdd() {
  const newItem = {
    item: $(".js-new-item").val(),
    complete: "N",
  };
  saveItem(newItem);
  $(".js-new-item").val("");
}

function clickDelete(event) {
  console.log(this);
  const itemId = event.target.dataset.id;
  deleteItem(itemId);
}

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

function render() {
  $(".js-container").empty();
  for (let item of itemList) {
    $(".js-container").append(`
    <tr>
    <td class ="js-item">${item.item}</td>
    <td><button class ="js-btn-complete" data-id="${item.id}">Complete</button></td>
    <td><button class ="js-btn-delete" data-id="${item.id}">Delete</button></td>
    </tr>`);
  }
}
