Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    }, 
    template: `
    <div class="product">
        <div class="product-image">
           <img :src="image" :alt="altText" />
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
           <p>{{ sale }}</p>
            <a :href="link">More products like this</a>
            <p v-if="inStock">In Stock</p>
            <p v-if="!inStock" :class="{ 'out-of-stock': !inStock }">Out of Stock</p>
            <span v-if="onSale">On Sale</span>

            <product-details :details="details"></product-details>

            <p>User is premium: {{ premium }}</p>
            <p>Shipping: {{ shipping }}</p>
            <div
                class="color-box"
                v-for="(variant, index) in variants"
                :key="variant.variantId"
                :style="{ backgroundColor:variant.variantColor }"
                @mouseover="updateProduct(index)"
            ></div>
             

            <ul>
                <li v-for="size in sizes" :key="size">{{ size }}</li>
            </ul>

            <div class="cart">
                <p>Cart({{ cart }})</p>
            </div>
            <button
                v-on:click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }"
            >
                Add to cart
            </button>
            <button v-on:click="removeFromCart">Remove from cart</button>
        
        </div>
    </div>
  `,
    data() {
        return { 
        product: "Socks",
        brand: 'Vue Mastery',
        selectedVariant: 0,
        altText: "A pair of socks",
        link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
        onSale: true,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: "./assets/vmSocks-green-onWhite.jpg",
                variantQuantity: 10
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                variantQuantity: 0
            }
        ],
                
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        cart: 0,
        
    }},
    methods: {
        addToCart() {
            this.cart += 1
        },
        removeFromCart() {
            if (this.cart > 0) {
                this.cart -= 1
            }
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        }, 
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.onSale) {
                return `${this.brand} ${this.product} are on sale!`;
            } else {
                return `${this.brand} ${this.product} are not on sale.`;
            }
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        }
 
    },
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
    });

let app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
 })
 