export const validateProduct = (req, res, next) => {
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

export const validateProductUpdate = (req, res, next) => {
    try {
        const { name, price, stock, category, sku, size } = req.body;

        if (name !== undefined && (!name || typeof name !== 'string')) {
            return res.status(400).json({ error: 'Name must be a string' });
        }
        if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
            return res.status(400).json({ error: 'Price must be a positive number' });
        }
        if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
            return res.status(400).json({ error: 'Stock must be a non-negative number' });
        }
        if (category !== undefined && (!category || typeof category !== 'string')) {
            return res.status(400).json({ error: 'Category must be a string' });
        }
        if (sku !== undefined && (!sku || typeof sku !== 'string')) {
            return res.status(400).json({ error: 'SKU must be a string' });
        }
        if (size !== undefined && (!size || typeof size !== 'string')) {
            return res.status(400).json({ error: 'Size must be a string' });
        }
        next();
    } catch (error) {
        next(error);
    }
};
