export async function addToCart(obj) {
    try {
        const json = localStorage.getItem('cart') || JSON.stringify([]);
        let getCart = [];
        try {
            getCart = JSON.parse(json);
        } catch (error) {
            console.error('Something wrong when getting Cart')
        }
        let c = [...getCart];
        console.log(c)
        const index = c.findIndex((value) => value._id === obj._id);
        console.log(index)
        if (index !== -1) {
            c[index].quantity = c[index].quantity + 1
        }
        if (index === -1) {
            c.push({
                ...obj,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(c));
        return true
    } catch (error) {
        return false
    }
}