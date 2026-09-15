const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);

    if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return res.status(400).json({ error: 'SKU must be unique' });
    }

    return res.status(500).json({ 
        error: err.message || 'Internal Server Error' 
    });
};

export default errorMiddleware;