
Vue.component('product', {
    template: `
   <div class="product">
            <div class="product">
        <div class="product-image">
            <img :src="image" :alt="altText"/>
        </div>

        <div class="product-info">
            <h1>{{ title + onSale }}</h1>
            <p v-if="inStock">In stock</p>

            <p
                    v-else
                    class="outOfStock"
            >
                Out of Stock
            </p>

            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>

            <div
                    class="color-box"
                    v-for="(variant, index) in variants"
                    :key="variant.variantId"
                    :style="{ backgroundColor:variant.variantColor }"
                    @mouseover="updateProduct(index)"
            >
            </div>

            <div class="cart">
                <p>Cart({{ cart }})</p>
            </div>

            <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Добавить</button>
            <button v-on:click="removeCart" v-if="cart >= 1">Удалить</button>

        </div>

    </div>
   </div>
 `,
    data() {
        return {
            product: "Socks",
            brand: 'Vue Mastery',
            sale: '',
            selectedVariant: 0,
            altText: "A pair of socks",
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10,
                    variantSale: '(SALE)'
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0,
                    variantSale: ''
                }
            ],
            cart: 0
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        removeCart() {
            this.cart -= 1
        },
        updateProduct(index) {
            this.selectedVariant = index;
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product + ' ' + this.sale;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity;
        },
        onSale(){
            return this.variants[this.selectedVariant].variantSale;
        }
    }
})

let app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
})
















