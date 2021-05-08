import { useCallback, useEffect, useState } from "react";
import { Alert, Button, Col, Form, Modal } from "react-bootstrap";
import useQueryParams from "../../services/hooks/useQueryParams";
import { rest } from '../../services/rest';
import history from '../../navigation/browserHistory';
import qs from 'query-string';
import CartModal from "./components/CartModal";
import { addToCart } from "./services/cart-services";
import debounce from 'lodash.debounce';

function ProductList({
    data,
    addProduct,
    page, setPage,
    lastPage
}) {
    function goToProduct(id) {
        history.push(`/product/${id}`)
    }
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th width="200">Name</th>
                        <th width="100">Price</th>
                        <th width="100"></th>
                    </tr>
                </thead>
                <tbody style={{ height: 500, overflowY: 'scroll', display: 'block' }}>
                    {
                        data.map((value, index) => {
                            return (
                                <tr key={value._id}>
                                    <td width="200" onClick={() => {
                                        goToProduct(value._id)
                                    }}>
                                        {value.product_name}
                                    </td>
                                    <td width="100">{value.product_price}</td>
                                    <td width="100">
                                        <Button variant="primary" type="submit" onClick={() => { addProduct(value) }}>
                                            Add
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Button variant={lastPage <= page ? "secondary" : "primary"} type="submit" disabled={lastPage <= page} onClick={() => { setPage(prevState => prevState + 1) }}>
                Get More
            </Button>
        </div>
    )
}
function SearchComponent({
    onSubmit,
    search,
    setSearch,
    openCart
}) {
    // const [search, setSearch] = useState('');
    // const queryParams = useQueryParams();
    // function pushQuery(query) {

    //     history.push({
    //         pathname: history?.location?.pathname,
    //         search: `?` + qs.stringify(query),
    //     })
    // }
    // function onSubmit(e) {
    //     // e.preventDefault();
    //     let query = {}
    //     if (search !== '') {
    //         query.search = search;
    //     }
    //     pushQuery(query)
    // }
    return (
        <div className="flex flex-row">
            <div className="flex flex-row">
                <Form.Group controlId="formBasicSearch">
                    <Form.Control type="text" placeholder="Search products" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                </Form.Group>
                <div style={{ width: 10 }}></div>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </div>
            <div style={{ width: 150 }}></div>
            <Button variant="primary" type="submit" onClick={() => { openCart() }}>
                Cart
            </Button>
        </div>
        // <Form onSubmit={onSubmit}>
        //     <div className="flex flex-row">
        //         <Form.Group controlId="formBasicSearch">
        //             <Form.Control type="text" placeholder="Search products" value={search} onChange={(e) => { setSearch(e.target.value) }} />
        //         </Form.Group>
        //         <Button variant="primary" type="submit">
        //             Submit
        //         </Button>
        //     </div>
        // </Form>
    )
}
export default function ProductsPage() {
    // const { search } = useQueryParams();
    const limit = 10
    const [search, setSearch] = useState();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    async function getProducts(search, page) {
        let url = '';
        if (!search) url = `https://dummyproducts-api.herokuapp.com/api/v1/products?apikey=5oIDTjlULgO8&limit=${limit}&page=${page}`;
        if (search) url = `https://dummyproducts-api.herokuapp.com/api/v1/products/search?term=${search}&apikey=5oIDTjlULgO8&limit=${limit}&page=${page}`;
        const response = await rest.get(url);
        console.log(response);
        if (response?.data?.success) {
            setData(prevState => {
                if (page === 1) return [...response?.data?.data];
                if (page > 1) return [...prevState, ...response?.data?.data]
                return []
            })
            setLastPage(response.data.lastPage)
        };
    }
    function onSubmit(e) {
        e.preventDefault();
        setSearch(search)
    }

    useEffect(() => {
        getProducts(search, 1)
    }, [search])

    useEffect(() => {
        getProducts(search, page)
    }, [page])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [productSelected, setProductSelected] = useState({});

    function addProduct(product) {
        setProductSelected(prevState => {
            return { ...product }
        })
        if (addToCart(product)) {
            setAlert({
                variant: 'success',
                text: `${productSelected?._id && productSelected?.product_name} successfully added`
            })
            return;
        }
        setAlert({
            variant: 'danger',
            text: `Something went wrong`
        })
        return;
    }
    const [alert, setAlert] = useState({})
    useEffect(() => {
        if (!alert.variant) return;
        handleShow()
    }, [alert])



    const debouncedSave = useCallback(
		debounce(() => handleClose(), 1000),
		[], // will be created only once initially
	);

    // const [alertTimeout, setAlertTimeout] = useState();
    useEffect(() => {
        if (!show) return;
        debouncedSave();
    }, [show])

    const [showCart, setShowCart] = useState(false);
    function closeCart() { setShowCart(false) }
    function openCart() { setShowCart(true) }

    return (
        <div>
            <SearchComponent search={search} setSearch={setSearch} onSubmit={onSubmit} openCart={openCart} />
            <Alert show={show} variant="success" style={{
                width: 300,
                margin: 10,
            }}>
                {productSelected?._id && productSelected?.product_name} successfully added
            </Alert>
            <ProductList data={data} lastPage={lastPage} addProduct={addProduct} page={page} setPage={setPage} />


            <CartModal
                show={showCart}
                handleClose={closeCart}
            />
        </div>
    )
}