"use strict";
// Please don't delete the 'use strict' line above

const resultList = document.getElementById("result-list");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const keyword = searchInput.value.trim();

  // 品番を検索
  const foundItems = keyword ? allItem.filter((item) => item.ItemNo.includes(keyword)) : [];

  if (foundItems.length > 0) {
  // 検索結果がある場合
    resultList.innerHTML = ""; // リストをクリア
    foundItems.forEach((item) => {
      const row = document.createElement("tr");
      const itemNameCell = document.createElement("td");
      itemNameCell.textContent = item.Item;
      const modelNoCell = document.createElement("td");
      modelNoCell.textContent = item.ModelNo;
      const itemNoCell = document.createElement("td");
      const itemNoLink = document.createElement("a");
      itemNoLink.href = `../pdf/${item.ItemNo}.pdf`;; // 仮のリンク先
      itemNoLink.textContent = item.ItemNo;
      itemNoCell.appendChild(itemNoLink);

      row.appendChild(itemNameCell);
      row.appendChild(modelNoCell);
      row.appendChild(itemNoCell);
      resultList.appendChild(row);
    });
  } else {
    // 検索結果がない場合
    resultList.innerHTML = "入力された品番は見つかりませんでした。";
  }
});
