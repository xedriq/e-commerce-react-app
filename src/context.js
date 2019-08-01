import React, { Component, createContext } from 'react'
import { storeProducts, detailProduct } from './data'

const ProductContext = createContext();
//Provide
//Consumer

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        isModalOpen: false,
        modalProduct: detailProduct,
        cartSubtotal: 0,
        cartTax: 0,
        cartTotal: 0
    }

    componentDidMount() {
        this.setProducts();
    }

    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = { ...item };
            tempProducts = [...tempProducts, singleItem]
        })
        this.setState(() => {
            return { products: tempProducts }
        })
    }

    getItem = (id) => {
        const product = this.state.products.find((item) => item.id === id);
        return product
    }

    handleDetail = (id) => {
        const product = this.getItem(id)
        this.setState(() => {
            return { detailProduct: product }
        })
    }

    addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price

        this.setState(() => {
            return {
                products: tempProducts,
                cart: [...this.state.cart, product]
            }
        }, () => {
            this.addTotals()
        })
    }

    openModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return {
                modalProduct: product,
                isModalOpen: true
            }
        })
    }

    closeModal = () => {
        this.setState(() => {
            return {
                isModalOpen: false
            }
        })
    }

    increment = id => {
        let tempCart = [...this.state.cart]
        const selectedItem = tempCart.find(item => item.id === id)
        const index = tempCart.indexOf(selectedItem);
        const product = tempCart[index]
        product.count = product.count + 1
        product.total = product.price * product.count

        this.setState({
            cart: [...tempCart],

        }, () => this.addTotals())
    }

    decrement = id => {
        let tempCart = [...this.state.cart]
        const selectedItem = tempCart.find(item => item.id === id)
        const index = tempCart.indexOf(selectedItem);
        const product = tempCart[index]
        product.count > 1 && (product.count = product.count - 1)
        product.total = product.price * product.count

        this.setState({
            cart: [...tempCart],

        }, () => this.addTotals())
    }

    removeItem = id => {
        let tempProducts = [...this.state.products];

        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);
        const index = tempProducts.indexOf(this.getItem(id));
        let removeProduct = tempProducts[index];
        removeProduct.inCart = false;
        removeProduct.count = 0;
        removeProduct.total = 0;

        this.setState({
            cart: [...tempCart],
            products: [...tempProducts],
        }, () => this.addTotals())
    }

    clearCart = () => {
        this.setState({
            ...this.state,
            cart: []
        }, () => {
            this.setProducts();
            this.addTotals()
        })
    }

    addTotals = () => {
        let subTotal = 0
        this.state.cart.map(item => subTotal += item.total)
        const tempTax = subTotal * 0.12
        const tax = parseFloat(tempTax.toFixed(2))
        const total = subTotal + tax
        this.setState({
            cartSubtotal: subTotal,
            cartTax: tax,
            cartTotal: parseFloat(total.toFixed(2))
        })
    }

    render() {

        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart
            }}
            >
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer }
