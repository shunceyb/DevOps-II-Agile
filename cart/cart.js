document.addEventListener("DOMContentLoaded", function () {
    updateOrderSummary();

    document.querySelectorAll('.cart-table input[type="number"]').forEach(input => {
        input.addEventListener('input', function () {
            if (this.value < 1) this.value = 1;
            updateOrderSummary();
        });
    });

    document.querySelectorAll(".qty-btn").forEach(button => {
        button.addEventListener("click", function () {
            let input = this.parentElement.querySelector("input[type='number']");
            let currentValue = parseInt(input.value);

            if (this.textContent === "−" && currentValue > 1) {
                input.value = currentValue - 1;
            } else if (this.textContent === "+" && currentValue < 99) {
                input.value = currentValue + 1;
            }

            updateOrderSummary();
        });
    });

    document.querySelectorAll("input[name='shipping-method']").forEach(radio => {
        radio.addEventListener("change", function () {
            updateOrderSummary();
        });
    });

    // ฟังก์ชันลบสินค้าออกจากตะกร้า
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", function () {
            let row = this.closest("tr"); // หาแถวของสินค้านั้น
            row.remove(); // ลบแถวนั้นออกจาก DOM
            updateOrderSummary(); // อัปเดต Order Summary
        });
    });
});

// ฟังก์ชันอัปเดต Order Summary
function updateOrderSummary() {
    let subTotal = 0;
    let taxRate = 0.16;
    let totalItems = 0;
    let discount = 0.00;
    let shippingCost = 0.00;

    document.querySelectorAll('.cart-table tbody tr').forEach(row => {
        let quantity = parseInt(row.querySelector('input[type="number"]').value);
        let price = parseFloat(row.children[2].innerText.replace('$', ''));
        let subTotalForItem = quantity * price;
        row.querySelector('.subtotal').innerText = `$${subTotalForItem.toFixed(2)}`;
        subTotal += subTotalForItem;
        totalItems += quantity;
    });

    // ตรวจสอบค่าขนส่ง
    let selectedShipping = document.querySelector('input[name="shipping-method"]:checked');
    if (selectedShipping) {
        if (selectedShipping.value === "flash") {
            shippingCost = 0.00;
        } else if (selectedShipping.value === "shopee") {
            shippingCost = 15.00;
        }
    }

    let taxes = subTotal * taxRate;
    let total = subTotal + taxes + shippingCost - discount;

    document.getElementById('total-items').innerText = totalItems;
    document.getElementById('sub-total').innerText = `$${subTotal.toFixed(2)}`;
    document.getElementById('shipping-cost').innerText = `$${shippingCost.toFixed(2)}`;
    document.getElementById('taxes').innerText = `$${taxes.toFixed(2)}`;
    document.getElementById('discount').innerText = `$${discount.toFixed(2)}`;
    document.getElementById('total-price').innerText = `$${total.toFixed(2)}`;
}

// เมื่อกด "Place Order" แสดงแจ้งเตือน
document.querySelector('.place-order-btn').addEventListener('click', function () {
    alert('Your order has been placed successfully!');
});
