import React, { useEffect } from 'react';
import Product from '../component/Products';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { listProducts } from '../actions/productAction';
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);

    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <div>
            {
                loading ? <LoadingBox /> :
                    error ? <MessageBox variant="danger" message={error} /> :
                        <div className="row center">
                            {Array.isArray(products) && products.map((product) => (
                                <Product key={product._id} product={product}></Product>
                            ))}
                        </div>
            }
        </div>
    );
}
