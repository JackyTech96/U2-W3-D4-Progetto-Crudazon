const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDQ2MDBkOGEyMDAwMThhNDhhNTkiLCJpYXQiOjE3MDE5NTg3NTIsImV4cCI6MTcwMzE2ODM1Mn0.jh21shnf-TIu6TRVrMA7xydBBPrShHcjVm214-Pc8jg";

const fetchData = () => {
  fetch(endpoint, {
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
    .then((products) => {
      const list = document.getElementById("list");

      products.forEach((product) => {
        const col = document.createElement("div");
        col.classList.add("col");
        col.classList.add("mb-3");
        col.innerHTML = `
             <div class="card h-100">
               <img src="${product.imageUrl}" class="img-fluid my-3" alt="${product.name}" style="height: 100px; object-fit:contain">
               <div class="card-body text-center">
                 <h5 class="card-title">${product.name}</h5>
                 <p class="card-text">Prezzo: ${product.price}€</p>
                 <div class="d-flex">
                   <button class="btn btn-sm btn-info text-white me-2" onclick="window.location.href='./details.html?resourceId=${product._id}'">Dettagli</button>
                   <button class="btn btn-sm btn-warning text-white" onclick="window.location.href='./backoffice.html?resourceId=${product._id}'">Modifica</button>
                 </div>
               </div>
             </div>
           `;

        list.appendChild(col);
      });
    })
    .catch((error) => {
      console.error("Errore con l'operazione Fetch:", error);
    });
};

window.addEventListener("DOMContentLoaded", fetchData);
