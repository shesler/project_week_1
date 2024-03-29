let eventBus = new Vue()

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: false
        }
    },
    template: `
        <div>
                <ul>
                        <span class="tab" :class="{ activeTab: selectedTab === tab }" v-for="(tab, index) in tabs" @click="selectedTab = tab">{{ tab }}</span>
                </ul>
                <div v-show="selectedTab === 'Reviews'">
                        <p v-if="!reviews.length">Пока нет отзывов.</p>
                        <ul>
                                <li v-for="review in reviews">
                                        <p>{{ review.name }}</p>
                                        <p>Рейтинг: {{ review.rating }}</p>
                                        <p>{{ review.review }}</p>
                                </li>
                        </ul>
                </div>
                <div v-show="selectedTab === 'Make a Review'">
                        <product-review v-show="selectedTab !== 'Reviews'"></product-review>
                </div>
        </div>
`,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'  // устанавливается с помощью @click
        }
    }
})


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
                <div class="product-image">
                        <img :src="image" />
                </div>
                <div class="product-info">
                        <h1>{{ title }}</h1>
                        <p v-if="inStock > 5 ">В наличии</p>
                        <p v-else-if="inStock <= 5 && inStock > 0">Скоро закончатся</p>
                        <p v-else="inStoсk" :class="{ outStock: !inStock }">Нет в наличии</p>
                        <p>{{ sale }}</p>
                        <info-tabs :shipping="shipping" :details="details"></info-tabs>
                        <div class="color-box" v-for="(variant, index) in variants" :key="variant.variantId" :style="{ backgroundColor: variant.variantColor }" @mouseover="updateProduct(index)">
                        </div>
                        <a :href="link">Больше носочков тут: </a>
                        <br>
                        <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">В корзину</button>
                        <button @click="removeFromCart">Удалить</button>
                </div>
                <product-tabs :reviews="reviews"></product-tabs>
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
            reviews: []
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        removeFromCart: function() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
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
        mounted() {
            eventBus.$on('review-submitted', productReview => {
                this.reviews.push(productReview)
            })
        }
    }
})


Vue.component('product-review', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
                <p v-if="errors.length">
                        <b>Please correct the following error(s):</b>
                        <ul>
                                <li v-for="error in errors">{{ error }}</li>
                        </ul>
                </p>
                <p>
                        <label for="name">Имя:</label>
                        <input id="name" v-model="name" placeholder="Имя">
                </p>       
                <p>
                        <label for="review">Отзывы:</label>
                        <textarea id="review" v-model="review"></textarea>
                </p>
                <p>
                        <label for="rating">Рейтинг:</label>
                        <select id="rating" v-model.number="rating">
                                <option>5</option>
                                <option>4</option>
                                <option>3</option>
                                <option>2</option>
                                <option>1</option>
                        </select>
                </p>
                <label for="answer">Вы рекомендуете этот продукт?</label>
                <select id="answer" v-model="answer">
                        <option>Да</option>
                        <option>Нет</option>
                </select>
                <p>
                        <input type="submit" value="Отправить">
                </p>
        </form>
 `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            answer: null,
            errors: []
        }

    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating && this.answer) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    answer: this.answer
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.answer = null
            } else {
                if (!this.name) this.errors.push("Name required.")
                if (!this.review) this.errors.push("Review required.")
                if (!this.rating) this.errors.push("Rating required.")
                if (!this.answer) this.errors.push("Answer required.")
            }
        },
        addReview(productReview) {
            this.reviews.push(productReview)
        }
    }
})


Vue.component('info-tabs', {
    props: {
        shipping: {
            required: true
        },
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
                <ul>
                        <span class="tab" :class="{ activeTab: selectedTab === tab }" v-for="(tab, index) in tabs" @click="selectedTab = tab" :key="tab">{{ tab }}</span>
                </ul>
                <div v-show="selectedTab === 'Shipping'">
                        <p>{{ shipping }}</p>
                </div>
                <div v-show="selectedTab === 'Details'">
                        <ul>
                                <li v-for="detail in details">{{ detail }}</li>
                        </ul>
                </div>
        </div>
    `,
    data() {
        return {
            tabs: ['Shipping', 'Details'],
            selectedTab: 'Shipping'
        }
    }
})


let app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeCart(id){
            this.cart.pop(id)
        }
    }
})
















