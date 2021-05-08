import { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import useQueryParams from "../../services/hooks/useQueryParams";
import { rest } from '../../services/rest';
import history from '../../navigation/browserHistory';
import qs from 'query-string';
import { useParams } from "react-router";

export default function ProductPage() {

    const { productId } = useParams();
    const [data, setData] = useState({})
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);


    useEffect(() => {
        const json = localStorage.getItem(productId) || JSON.stringify([]);
        let getComments = [];
        try {
            getComments = JSON.parse(json);
        } catch (error) {
            console.error('Something wrong when parsing Comments')
        }
        setComments(getComments)
    }, [])
    const [comments, setComments] = useState([])

    async function onSubmit(e) {
        // const json = localStorage.getItem(productId) || JSON.stringify([]);
        // try {
        //     c = JSON.parse(json);
        // } catch (error) {
        //     console.error('Something wrong when parsing Comments')
        // }
        
        let c = [...comments];
        c.push({
            comment: comment,
            rating: rating
        });
        console.log(c)
        localStorage.setItem(productId, JSON.stringify(c));
        setComment('');
        setRating(0)
        setComments(prevState => {
            return [...c]
        })
    }
    async function getProduct(productId) {
        let url = '';
        if (productId) url = `https://dummyproducts-api.herokuapp.com/api/v1/products/${productId}?apikey=5oIDTjlULgO8`;
        const response = await rest.get(url);
        console.log(response);
        if (response?.data?.success) setData(prevState => {
            return { ...response?.data?.data }
        });
    }
    useEffect(() => {
        getProduct(productId)
    }, [productId])
    return (
        <div>
            <Button variant="secondary" type="submit" onClick={() => { history.back() }}>
                back
            </Button>

            <table>
                <tbody>
                    <tr>
                        <td width="200">Name</td>
                        <td width="20">:</td>
                        <td>{data.product_name}</td>
                    </tr>
                    <tr>
                        <td>Price</td>
                        <td>:</td>
                        <td>{data.product_price}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>:</td>
                        <td>{data.product_description}</td>
                    </tr>
                </tbody>
            </table>

            <div style={{ height: 50 }}></div>
            <table className="table table-border">

                <tbody>
                    <tr>
                        <th>Comments</th>
                        <th>Rating</th>
                    </tr>
                    {
                        comments.map((value, index) => {
                            return (
                                <tr key={Math.random() * 12198723912}>
                                    <th>{value.comment}</th>
                                    <th>{value.rating}</th>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div style={{ height: 50 }}></div>


            <table>
                <tbody>
                    <tr>
                        <td width="200">Comments</td>
                        <td width="20">:</td>
                        <td>
                            <Form.Group controlId="formBasicComment">
                                <Form.Control type="text" placeholder="Type here . . ." value={comment} onChange={(e) => { setComment(e.target.value) }} />
                            </Form.Group>
                        </td>
                    </tr>
                </tbody>
            </table>

            <table>
                <tbody>
                    <tr>
                        <td width="200">Rating</td>
                        <td width="20">:</td>
                        <td>
                            <Form.Group controlId="formBasicSearch">
                                <Form.Control type="number" max="5" min="0" placeholder="Rating" value={rating} onChange={(e) => {
                                    setRating(() => {
                                        let value = e.target.value;
                                        if (value > 5) return 5
                                        if (value < 0) return 0
                                        return e.target.value;
                                    })
                                }} />
                            </Form.Group>
                        </td>
                    </tr>
                </tbody>
            </table>

            <Button variant="primary" type="submit" onClick={onSubmit}>
                Submit
            </Button>
        </div>
    )
}