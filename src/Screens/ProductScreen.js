import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '../component/Rating';
import { Link } from "react-router-dom"
import { productDetails } from '../actions/productAction';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function ProductScreen(props) {

    const { id } = useParams();
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const [Qty, setQty] = useState(1);

    const productDetail = useSelector(state => state.productDetails)

    const { loading, error, products } = productDetail

    useEffect(() => {
        dispatch(productDetails(id))
    }, [dispatch, id]);

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${Qty}`)
    }

    return (
        <div>
            {
                loading ? <LoadingBox /> :
                    error ? <MessageBox variant="danger" message={error} /> :
                        <div>
                            <Link to="/">Back to result</Link>
                            <div className="row top">
                                <div className="col-2">
                                    <img src={products.image} className="large" alt="" />
                                </div>
                                <div className="col-1">
                                    <ul>
                                        <li>{products.name}</li>
                                        <li>
                                            <Rating rating={products.rating} numReviews={products.numReviews} />
                                        </li>
                                        <li>
                                            Price: ${products.price}
                                        </li>
                                        <li>
                                            Description: {products.description}
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-1">
                                    <div className="card card-body">
                                        <ul>
                                            <li>
                                                <div className="row">
                                                    <div>Price</div>
                                                    <div className="price">${products.price}</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="row">
                                                    <div>Status</div>
                                                    <div>{products.countInStock > 0 ? <span className="success">In Stock</span> :
                                                        <span className="danger">Out of Stock</span>}</div>
                                                </div>
                                            </li>
                                            {
                                                products.countInStock > 0 && (
                                                    <>
                                                        <li>
                                                            <div className="row">
                                                                <div>Qty</div>
                                                                <div><select value={Qty} onChange={(e) => { setQty(e.target.value) }}>
                                                                    {[...Array(parseInt(products.countInStock)).keys()].map(
                                                                        (x) => (
                                                                            <option key={x + 1} value={x + 1}>
                                                                                {x + 1}
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </select></div>
                                                            </div>
                                                        </li>
                                                        <li> <button onClick={addToCartHandler} className=" primary block">Add to Cart</button></li>
                                                    </>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
            }
        </div>
    );
}