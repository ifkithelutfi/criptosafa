// Fetch market data from CoinGecko API
async function fetchMarketData() {
    const url = "https://api.coingecko.com/api/v3/global";
    const response = await fetch(url);
    const data = await response.json();
  
    document.getElementById("market-cap").textContent = `$${(
      data.data.total_market_cap.usd / 1e9
    ).toFixed(2)}B`;
    document.getElementById("volume-24h").textContent = `$${(
      data.data.total_volume.usd / 1e9
    ).toFixed(2)}B`;
    document.getElementById("btc-dominance").textContent = `${data.data.market_cap_percentage.btc.toFixed(1)}%`;
  }
  
  // Fetch top crypto data
  async function fetchCryptoTable() {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
    const response = await fetch(url);
    const data = await response.json();
  
    const table = document.getElementById("crypto-table");
    table.innerHTML = ""; // Clear previous rows
  
    data.forEach((coin, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>
          <img src="${coin.image}" alt="${coin.name}" width="24" height="24" class="me-2">
          ${coin.name} (${coin.symbol.toUpperCase()})
        </td>
        <td>$${coin.current_price.toLocaleString()}</td>
        <td style="color: ${coin.price_change_percentage_24h > 0 ? "green" : "red"};">
          ${coin.price_change_percentage_24h.toFixed(2)}%
        </td>
        <td>$${(coin.market_cap / 1e9).toFixed(2)}B</td>
      `;
      table.appendChild(row);
    });
  }
  
  // Initial load
  fetchMarketData();
  fetchCryptoTable();
  