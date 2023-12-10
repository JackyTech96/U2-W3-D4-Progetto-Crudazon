const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDQ2MDBkOGEyMDAwMThhNDhhNTkiLCJpYXQiOjE3MDE5NTg3NTIsImV4cCI6MTcwMzE2ODM1Mn0.jh21shnf-TIu6TRVrMA7xydBBPrShHcjVm214-Pc8jg";
const params = new URLSearchParams(window.location.search);
const id = params.get("resourceId");

window.onload = () => {
  fetch(endpoint + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore risposta network");
      }
    })
    .then((productObj) => {
      //   console.log(productObj);
      const list = document.getElementById("list");

      const col = document.createElement("div");
      col.className = "col d-flex justify-content-center";

      const card = document.createElement("div");
      card.className = "card text-center shadow";
      card.style.width = "250px";

      const img = document.createElement("img");
      img.src = productObj.imageUrl;
      img.className = "img-fluid my-3";
      img.alt = productObj.name;
      img.style.height = "200px";
      img.style.objectFit = "contain";

      const hr = document.createElement("hr");
      hr.classList.add("m-0");

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const title = document.createElement("h5");
      title.className = "card-title";
      title.innerText = productObj.name;

      const price = document.createElement("p");
      price.className = "card-text";
      price.innerText = `Prezzo: ${productObj.price}€`;

      const description = document.createElement("p");
      description.className = "card-text";
      description.innerText = productObj.description;

      cardBody.appendChild(title);
      cardBody.appendChild(price);
      cardBody.appendChild(description);

      card.appendChild(img);
      card.appendChild(hr);
      card.appendChild(cardBody);
      col.appendChild(card);
      list.appendChild(col);
    })
    .catch((error) => {
      console.error("Errore con l'operazione Fetch:", error);
    });
};
