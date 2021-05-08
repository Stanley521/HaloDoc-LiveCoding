import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Modal } from "react-bootstrap";


export default function CartModal({
    show,
    handleClose
}) {
    // localStorage.setItem('cart', JSON.stringify([]));
    useEffect(() => {
        const json = localStorage.getItem('cart') || JSON.stringify([]);
        let getComments = [];
        try {
            getComments = JSON.parse(json);
        } catch (error) {
            console.error('Something wrong when getting Cart')
        }
        setCart(getComments)
    }, [show])
    const [cart, setCart] = useState([]);
    function removeItem(item, index) {
        try {
            let c = [...cart];
            if (item.quantity <= 1) {
                c.splice(index, 1);
            }
            if (item.quantity > 1) {
                c[index].quantity = c[index].quantity - 1;
            }
            console.log(c)
            localStorage.setItem('cart', JSON.stringify(c));
            setCart(prevState => {
                return [...c]
            })
        } catch (error) {

        }
    }

    return <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <table>
                <tbody style={{ height: 500, overflowY: 'scroll', display: 'block' }}>
                    <tr>
                        <td width="200">Name</td>
                        <td width="150">Price</td>
                        <td width="100">Quantity</td>
                        <td width="100"></td>
                    </tr>
                    {
                        cart.map((value, index) => {
                            return (
                                <tr key={value._id}>
                                    <td>{value.product_name}</td>
                                    <td>{value.product_price}</td>
                                    <td>{value.quantity}</td>
                                    <td>
                                        <Button variant="danger" type="submit" onClick={() => { removeItem(value, index) }}>
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <table>
                <tbody>
                    <tr>
                        <td width={150}>Total Price</td>
                        <td width={30}>:</td>
                        <td>{
                            (() => {
                                let max = 0;
                                cart.forEach((value) => {
                                    console.log(value)
                                    max = max + (value.product_price * value.quantity)
                                })
                                return max;
                            })()
                        }</td>
                    </tr>
                </tbody>
            </table>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
                OK
            </Button>
        </Modal.Footer>
    </Modal>
}