$(document).ready(init);

let itemList = [];
function init() {
  getList();
  $(.'js-btn-add').on('click', addItem)
}

function addItem() {
  const newItem = {
    item: $(".js-new-item").val(),
    complete: false,
  };
  saveItem(newItem);
  $(".js-new-item").val("");
}

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

function render() {
  $(".js-container").empty();
  for (let item of itemList) {
    $(".js-container").append(`
    <tr>
    <td>${item.item}</td>
    <td><button class ="js-btn-complete">Complete</button></td>
    </tr>`);
  }
}
