Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
})

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: false
        },
    },

    template: `
   <div class="product">
            <div class="product">
        <div class="product-image">
            <img :src="image" :alt="altText"/>
        </div>

        <div class="product-info">
            <h1>{{ title + onSale }}</h1>
            <p v-if="inStock">В наличии</p>

            <p
                    v-else
                    class="outOfStock"
            >
                Нет в наличии
            </p>
            
            <p>Доставка: {{ shipping }}</p>
            
            <p>Компоненты:</p>
            
            <product-details :details="details"></product-details>
            
            <div
                    class="color-box"
                    v-for="(variant, index) in variants"
                    :key="variant.variantId"
                    :style="{ backgroundColor:variant.variantColor }"
                    @mouseover="updateProduct(index)"
            >
            </div>

            <div class="cart">
                <p>Корзина ({{ cart }})</p>
            </div>

            <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Добавить</button>
            <button v-on:click="removeCart" v-if="cart >= 1">Удалить</button>

        </div>

    </div>
   </div>
 `,
    data() {
        return {
            product: "носочки",
            brand: 'Тёплые',
            sale: '',
            details: ['80% хлопок', '20% полиэстер'],
            selectedVariant: 0,
            altText: "A pair of socks",
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
        },
        shipping() {
            if (this.premium) {
                return 'Бесплатно';
            } else {
                return '499.90 RUB';
            }
        },



    }
})






let app = new Vue({
    el: '#app',
    data: {
        premium: false
    }
})
















