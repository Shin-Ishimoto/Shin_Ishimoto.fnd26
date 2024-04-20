"use strict";
// Please don't delete the 'use strict' line above

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const keyword = searchInput.value.trim();

  // リストをクリア
  searchResults.innerHTML = "";
    // 品番のバリデーションを追加
    if (keyword.length < 5 || /[^\x01-\x7E]/.test(keyword)) {
      const validationMessageRow = document.createElement("tr");
      const validationMessageCell = document.createElement("td");
      validationMessageCell.colSpan = 3;
      validationMessageCell.textContent = "品番は５桁以上もしくは半角にしてください。";
      validationMessageRow.appendChild(validationMessageCell);
      searchResults.appendChild(validationMessageRow);
      return; // 検索と表への表示をしないように
    }

  // 品番を検索
  const foundItems = keyword
    ? allItem.filter((item) => item.ItemNo.includes(keyword))
    : [];

  if (foundItems.length > 0) {
    // 検索結果がある場合
    foundItems.forEach(async (item) => {
      const row = document.createElement("tr");
      const itemNameCell = document.createElement("td");
      itemNameCell.textContent = item.Item;
      const modelNoCell = document.createElement("td");
      modelNoCell.textContent = item.ModelNo;
      const itemNoCell = document.createElement("td");

      // PDFリンクを作成
      const pdfLink = document.createElement("a");
      pdfLink.href = `../pdf/${item.ItemNo}.pdf`;
      pdfLink.textContent = item.ItemNo; 
      itemNoCell.appendChild(pdfLink);

      row.appendChild(itemNameCell);
      row.appendChild(modelNoCell);
      row.appendChild(itemNoCell);
      searchResults.appendChild(row);
    });
  } else {
    // 検索結果がない場合
    const noResultsRow = document.createElement("tr");
    const noResultsCell = document.createElement("td");
    noResultsCell.colSpan = 3;
    noResultsCell.textContent = "入力された品番は見つかりませんでした。";
    noResultsRow.appendChild(noResultsCell);
    searchResults.appendChild(noResultsRow);
  }
});
