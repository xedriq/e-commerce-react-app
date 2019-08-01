import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ProductConsumer } from '../context';


class ProductItem extends Component {

    render() {
        const { title, img, price, inCart, id } = this.props.product
        return (
            <ProductItemWrapper className="col-9 mx-auto col-md-6 col-lg-3 my-3">
                <div className="card">
                    <ProductConsumer>
                        {(value => (
                            <div
                                onClick={() => {
                                    value.handleDetail(id);
                                }}
                                className="img-container p-5"

                            >
                                <Link to='/details'>
                                    <img src={img} alt={title} className="card-img-top" name={title} />
                                </Link>
                                <button
                                    className="cart-btn"
                                    disabled={inCart ? true : false}
                                    onClick={() => {
                                        value.addToCart(id)
                                        value.openModal(id);
                                    }}
                                >
                                    {inCart ? (<p className="text-capitalize mb-0" disabled>In Cart</p>)
                                        : (<i className="fas fa-cart-plus" />)}
                                </button>
                            </div>
                        ))}
                    </ProductConsumer>
                    <div className="card-footer d-flex justify-content-between">
                        <p className="align-serl-center mb-0">
                            {title}
                        </p>
                        <h5 className="text-blue font-italic mb-0">
                            <span className="mr-1">${price}</span>
                        </h5>
                    </div>
                </div>
            </ProductItemWrapper>
        )
    }
}

ProductItem.propTypes = {
    product: PropTypes.shape({
        title: PropTypes.string,
        img: PropTypes.string,
        price: PropTypes.number,
        inCart: PropTypes.bool
    }).isRequired
}

const ProductItemWrapper = styled.div`
.card {
    border-color:transparent;
    transition:all .2s linear;
    overflow:hidden;

}

.card-footer {
    background:transparent;
    border-top: transparent;
    transition:all .2s linear;
}

&:hover {
    .card{
        border:0.06rem solid rgba(0,0,0,0.2);
        box-shadow: 2px 2px 8px 0px rgba(0,0,0,0.05);
    }
    .card-footer{
        background:rgba(247,247,247);
    }
}

.img-container{
    position:relative;
    overflow:hidden;
}

.card-img-top {
    transition: all .3s ease-in-out;
}
.img-container:hover .card-img-top{
transform:scale(1.2);
}

.cart-btn{
    position:absolute;
    bottom:0;
    right:0;
    padding:0.2rem 0.4rem;
    background:var(--lightBlue);
    color:var(--mainWhite);
    border:none;
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%,100%);
    transition: all .3s ease-in-out;
}
.img-container:hover .cart-btn{
    transform:translate(0,0);
}
.cart-btn:hover{
    color:var(--mainBlue);
    cursor:pointer;
}
`
export default ProductItem
