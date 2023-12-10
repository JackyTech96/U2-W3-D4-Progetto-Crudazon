const URL = "https://striveschool-api.herokuapp.com/api/product/";

// document.addEventListener("DOMContentLoaded", () => {
//   const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
//   if (selectedProduct) {
//     document.getElementById("name").value = selectedProduct.name;
//     document.getElementById("brand").value = selectedProduct.brand;
//     document.getElementById("basic-url").value = selectedProduct.imageUrl;
//     document.getElementById("description").value = selectedProduct.description;
//     document.getElementById("price").value = selectedProduct.price;
//   }

//   document.getElementById("insertButton").addEventListener("click", handleInsert);
//   document.getElementById("editButton").addEventListener("click", handleEdit);
// });

const handleSubmit = (event) => {
  event.preventDefault();

  const form = event.target;

  const newProduct = {
    name: document.getElementById("name").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("basic-url").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
  };
  console.log(newProduct);

  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDQ2MDBkOGEyMDAwMThhNDhhNTkiLCJpYXQiOjE3MDE5NTg3NTIsImV4cCI6MTcwMzE2ODM1Mn0.jh21shnf-TIu6TRVrMA7xydBBPrShHcjVm214-Pc8jg",
    },
    body: JSON.stringify(newProduct),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Errore nella richiesta: ${response.status}`);
      }
      return response.json();
    })
    .then((createdObj) => {
      alert("Risorsa con id: " + createdObj._id + " creata con successo!");
    })
    .catch((error) => {
      console.error("Si è verificato un errore:", error);
    });
};
