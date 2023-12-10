const params = new URLSearchParams(window.location.search);
const id = params.get("resourceId");
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDQ2MDBkOGEyMDAwMThhNDhhNTkiLCJpYXQiOjE3MDE5NTg3NTIsImV4cCI6MTcwMzE2ODM1Mn0.jh21shnf-TIu6TRVrMA7xydBBPrShHcjVm214-Pc8jg";

const endpoint = id
  ? "https://striveschool-api.herokuapp.com/api/product/" + id
  : "https://striveschool-api.herokuapp.com/api/product/";

const method = id ? "PUT" : "POST";

document.addEventListener("DOMContentLoaded", () => {
  const backofficeTitle = document.getElementById("backoffice-title");
  const submitBtn = document.getElementById("submit-btn");
  const deleteBtn = document.getElementById("delete-btn");

  if (id) {
    backofficeTitle.innerText = "Modifica un prodotto";
    submitBtn.classList.remove("btn-primary");
    submitBtn.className = "btn btn-success text-white";
    submitBtn.innerText = "Modifica prodotto";
    deleteBtn.classList.remove("d-none");
    fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((productObj) => {
        document.getElementById("name").value = productObj.name;
        document.getElementById("brand").value = productObj.brand;
        document.getElementById("basic-url").value = productObj.imageUrl;
        document.getElementById("description").value = productObj.description;
        document.getElementById("price").value = productObj.price;
      });
  } else {
    backofficeTitle.innerText = "Inserisci un nuovo prodotto";
  }
});

const handleSubmit = (event) => {
  event.preventDefault();

  const newProduct = {
    name: document.getElementById("name").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("basic-url").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
  };
  console.log(newProduct);

  fetch(endpoint, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
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
      if (id) {
        alert("Risorsa con id: " + createdObj._id + " modificata con successo!");
      } else {
        alert("Risorsa con id: " + createdObj._id + " creata con successo!");
      }
      if (!id) {
        form.reset();
      }
    })
    .catch((error) => {
      console.error("Si è verificato un errore:", error);
    });
};

const handleDelete = () => {
  const hasConfirmed = confirm("Sei sicuro di voler eliminare il prodotto?");
  if (hasConfirmed) {
    fetch(endpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }).then((response) => {
      if (response.ok) {
        window.location.assign("./index.html");
      }
    });
  }
};
