import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { userInfo } from "../utils";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";

export default function Dashboard() {
  const navigate = useNavigate();
  const [view, setView] = useState("users");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const usersTableRef = useRef(null);
  const productsTableRef = useRef(null);
  //   const token = userInfo.data.token;

  // Récupération des données
  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:5000/api/user", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((response) => {
  //         setUsers(response.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });

  //     axios
  //       .get("http://localhost:5000/api/product")
  //       .then((response) => {
  //         setProducts(response.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }, [token]);

  // Initialisation des tableaux avec DataTable
  //   useEffect(() => {
  //     const options = {
  //       language: {
  //         url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/fr-FR.json",
  //       },
  //       order: [[1, "asc"]],
  //       paging: true,
  //       pageLength: 20,
  //       lengthChange: false,
  //       dom: '<"top"lf>t<"bottom"ip>',
  //     };

  //     if (view === "users" && users.length > 0) {
  //       if ($.fn.dataTable.isDataTable(usersTableRef.current)) {
  //         $(usersTableRef.current).DataTable();
  //       } else {
  //         $(usersTableRef.current).DataTable({
  //           ...options,
  //           data: users,
  //           columns: [
  //             {
  //               title: '<input id="user-check-all" type="checkbox" />',
  //               data: null,
  //               orderable: false,
  //               render: (data) =>
  //                 `<input class="user-checkbox" value="${data._id}" type="checkbox" />`,
  //             },
  //             { title: "Mail", data: "mail" },
  //             { title: "Nom", data: "name" },
  //             { title: "Prénom", data: "firstname" },
  //             { title: "Rôle", data: "role" },
  //           ],
  //           createdRow: (row, data) => {
  //             $(row).on("click", (e) => {
  //               if ($(e.target).is("input[type=checkbox")) {
  //                 return;
  //               }
  //               let isChecked = $(`input[value=${data._id}]`).prop("checked");
  //               $(`input[value=${data._id}]`).prop("checked", !isChecked);
  //             });
  //           },
  //         });
  //       }
  //     } else if (view === "products" && products.length > 0) {
  //       if ($.fn.dataTable.isDataTable(productsTableRef.current)) {
  //         $(productsTableRef.current).DataTable();
  //       } else {
  //         $(productsTableRef.current).DataTable({
  //           ...options,
  //           data: products,
  //           columns: [
  //             {
  //               title: '<input id="product-check-all" type="checkbox" />',
  //               data: null,
  //               orderable: false,
  //               render: (data) =>
  //                 `<input class="product-checkbox" value="${data._id}" type="checkbox" />`,
  //             },
  //             { title: "Nom", data: "name" },
  //             { title: "Thème", data: "year" },
  //             { title: "Prix", data: "price" },
  //             { title: "Quantité", data: "quantity" },
  //           ],
  //           createdRow: (row, data) => {
  //             $(row).on("click", (e) => {
  //               if ($(e.target).is('input[type="checkbox"]')) {
  //                 return;
  //               } else {
  //                 navigate(`/editProduct/${data._id}`);
  //               }
  //             });
  //           },
  //         });
  //       }
  //     }
  //   }, [view, users, products, navigate]);

  // Gestion de la case à coché global au tableau
  useEffect(() => {
    $(usersTableRef.current).on("click", "#user-check-all", function () {
      const isChecked = $(this).prop("checked");
      $(usersTableRef.current)
        .find(".user-checkbox")
        .prop("checked", isChecked);
    });

    $(productsTableRef.current).on("click", "#product-check-all", function () {
      const isChecked = $(this).prop("checked");
      $(productsTableRef.current)
        .find(".product-checkbox")
        .prop("checked", isChecked);
    });
  }, [view, users, products]);

  /**
   * Fonction de suppression d'un ou plusieurs utilisateurs
   */
  const handleDeleteUsers = () => {
    const checkedUserCheckboxes = $(usersTableRef.current).find(
      ".user-checkbox:checked"
    );
    const selectedUserIds = [];

    checkedUserCheckboxes.each((index, checkbox) => {
      const userId = $(checkbox).val();
      selectedUserIds.push(userId);
    });

    selectedUserIds.forEach((userId) => {
      axios
        .delete(`http://localhost:5000/api/user/${userId}`, {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
        })
        .then((response) => {
          console.log(`Succes ${userId}:`, response);
        })
        .catch((error) => {
          console.error(`Error ${userId}:`, error);
        });
    });

    window.location.reload();
  };

  /**
   * Fonction de suppression d'un ou plusieurs produits
   */
  const handleDeleteProducts = () => {
    const checkedProductCheckboxes = $(productsTableRef.current).find(
      ".product-checkbox:checked"
    );
    const selectedProductIds = [];

    checkedProductCheckboxes.each((index, checkbox) => {
      const productId = $(checkbox).val();
      selectedProductIds.push(productId);
    });

    selectedProductIds.forEach((productId) => {
      axios
        .delete(`http://localhost:5000/api/product/${productId}`, {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
        })
        .then((response) => {
          console.log(`Succes ${productId}:`, response);
        })
        .catch((error) => {
          console.error(`Error ${productId}:`, error);
        });
    });

    window.location.reload();
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <div>
        <h2>Vues</h2>
        <button onClick={() => setView("users")}>Utilisateurs</button>
        <button onClick={() => setView("products")}>Produits</button>
      </div>

      {view === "users" && (
        <div>
          <button onClick={handleDeleteUsers}>Supprimer</button>
          <table ref={usersTableRef}></table>
        </div>
      )}

      {view === "products" && (
        <div>
          <button onClick={handleDeleteProducts}>Supprimer</button>
          <Link to="/newProduct">
            <button>Ajouter</button>
          </Link>
          <table ref={productsTableRef}></table>
        </div>
      )}
    </div>
  );
}
