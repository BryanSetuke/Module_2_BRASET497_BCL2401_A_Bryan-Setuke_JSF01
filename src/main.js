import "./style.css";
import Alpine from "alpinejs";

window.Alpine = Alpine;

document.addEventListener("alpine:init", () => {
    Alpine.data("productList", () => ({
        products: [],
        search: "",
        sortOrder: "default",
        category: "all",
        isModalOpen: false,
        modalProduct: {},
        async loadProducts() {
            const response = await fetch("https://fakestoreapi.com/products");
            this.products = await response.json();
        },
        get filteredProducts() {
            let filtered = this.products.filter(
                (product) =>
                    product.title
                        .toLowerCase()
                        .includes(this.search.toLowerCase()) &&
                    (this.category === "all" ||
                        product.category === this.category)
            );

            if (this.sortOrder === "asc") {
                filtered = filtered.sort((a, b) => a.price - b.price);
            } else if (this.sortOrder === "desc") {
                filtered = filtered.sort((a, b) => b.price - a.price);
            }

            return filtered;
        },
        filterCategory(category) {
            this.category = category;
        },
        sortProducts() {
            // Sorting logic is already handled in the filteredProducts getter
        },
        showModal(product) {
            this.modalProduct = product;
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
            // this.modalProduct = {};
        },

        async init(){
            await this.loadProducts()
        }
    }));
});

Alpine.start();
