document.getElementById("searchButton").addEventListener("click", async () => {
    const countryName = document.getElementById("countryInput").value.trim();
    const countryInfoDiv = document.getElementById("countryInfo");
    
    if (!countryName) {
      countryInfoDiv.innerHTML = `<div class="alert alert-warning">Please enter a country name.</div>`;
      return;
    }
  
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
      if (!response.ok) throw new Error("Country not found");
      
      const [country] = await response.json();
      const { flags, capital, currencies, maps, languages } = country;
  
      const currencyNames = Object.values(currencies || {}).map(c => c.name).join(", ");
      const languageNames = Object.values(languages || {}).join(", ");
  
      countryInfoDiv.innerHTML = `
        <div class="card">
          <img src="${flags.png}" class="card-img-top" alt="${countryName} flag">
          <div class="card-body">
            <h5 class="card-title">${countryName}</h5>
            <p><strong>Capital:</strong> ${capital ? capital[0] : "N/A"}</p>
            <p><strong>Currency:</strong> ${currencyNames || "N/A"}</p>
            <p><strong>Languages:</strong> ${languageNames || "N/A"}</p>
            <a href="${maps.googleMaps}" target="_blank" class="btn btn-secondary">View on Map</a>
          </div>
        </div>
      `;
    } catch (error) {
      countryInfoDiv.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
    }
  });
  