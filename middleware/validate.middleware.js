const validateProduct = (req, res, next) => {
    try {
        const { name, price, stock, category, sku, size } = req.body;
        
        if (!name || price === undefined || stock === undefined || !category || !sku || !size) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        if (typeof name !== 'string' || typeof category !== 'string' || typeof sku !== 'string' || typeof size !== 'string') {
            return res.status(400).json({ error: 'Name, category, sku, and size must be strings' });
        }
        if (typeof price !== 'number' || typeof stock !== 'number') {
            return res.status(400).json({ error: 'Price and stock must be numbers' });
        }
        if (price <= 0 || stock < 0) {
            return res.status(400).json({ error: 'Price and stock must be non-negative' });
        }
        next();
    } catch (error) {
        next(error);
    }
};

export default validateProduct;