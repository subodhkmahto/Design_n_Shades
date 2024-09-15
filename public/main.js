function deleteProduct(id) {
    const result = confirm('Are you sure you want to delete this product?');
    if (result) {
        fetch("/delete-product/" + id, {
            method: "POST",
        }).then((res) => {
            if (res.ok) {
                location.reload();
            } else {
                alert("Failed to delete the product.");
            }
        }).catch((error) => {
            console.error("Error:", error);
            alert("An error occurred while deleting the product.");
        });
    }
}
