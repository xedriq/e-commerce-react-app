import React, { Component } from 'react'
import ProductItem from './ProductItem'
import Title from './Title'
import { ProductConsumer } from '../context'

class ProductList extends Component {
    render() {
        return (
            <>
                <div className="py-5">
                    <div className="container">
                        <Title name="Our" title="Products" />
                        <div className="row">
                            <ProductConsumer>
                                {value => {
                                    return value.products.map(product => {
                                        return <ProductItem key={product.id} product={product} />
                                    })
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default ProductList
