function calculate() {
  var table = document.getElementById("productTable");
  var rows = table.rows;

  var products = [];
  for (var i = 1; i < rows.length; i++) {
    var cells = rows[i].cells;
    var name = cells[0].textContent; // 商品名は直接テキストで取得
    var price = parseInt(cells[1].querySelector("input").value);
    var capacity = parseInt(cells[2].querySelector("input").value);

    if (!isNaN(price) && !isNaN(capacity)) {
      var unitPrice = price / capacity;
      products.push({
        name: name,
        capacity: capacity,
        price: price,
        unitPrice: unitPrice,
      });
    }
  }

  if (products.length > 0) {
    products.sort((a, b) => a.unitPrice - b.unitPrice);

    var maxCapacity = Math.max(...products.map((p) => p.capacity));

    for (var i = 0; i < products.length; i++) {
      var calculatedPrice = Math.round(products[i].unitPrice * maxCapacity);
      products[i].calculatedPrice = calculatedPrice;
    }

    var cheapest = products[0];
    var mostExpensive = products[products.length - 1];
    var savings = mostExpensive.calculatedPrice - cheapest.calculatedPrice;

    var resultText = cheapest.name + " が " + savings + " 円お得";
    document.getElementById("resultText").textContent = resultText;

    // 結果テーブルに結果を表示
    document.getElementById("resultTable").style.display = "table";
    for (var i = 0; i < products.length; i++) {
      var resultRow = document.getElementById("resultTable").rows[i + 1];
      resultRow.cells[0].textContent = i + 1;
      resultRow.cells[1].textContent = products[i].name;
      resultRow.cells[2].textContent = products[i].capacity;
      resultRow.cells[3].textContent = products[i].calculatedPrice;
      resultRow.cells[4].textContent = products[i].unitPrice.toFixed(4);
    }
  } else {
    document.getElementById("resultText").textContent = "";
    document.getElementById("resultTable").style.display = "none";
  }
}

function clearTable() {
  var table = document.getElementById("productTable");
  var rows = table.rows;

  for (var i = rows.length - 1; i > 0; i--) {
    table.deleteRow(i);
  }

  // 3セットの入力行を追加
  for (var i = 0; i < 3; i++) {
    addRow();
  }

  document.getElementById("resultText").textContent = "";
  document.getElementById("resultTable").style.display = "none";
}

function addRow() {
  var table = document.getElementById("productTable");
  var newRow = table.insertRow(-1);
  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);

  cell1.innerHTML = "商品" + String.fromCharCode(65 + table.rows.length - 3); // A, B, C, ...
  cell2.innerHTML = '<input type="number" placeholder="価格">';
  cell3.innerHTML = '<input type="number" placeholder="容量">';
}

// 最初の行を追加
for (var i = 0; i < 3; i++) {
  addRow();
}
