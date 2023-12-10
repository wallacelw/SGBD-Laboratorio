export async function isAuthorized(req, res, next) {
    if (!req.cookies) {
        next()
    }
    if (req.cookies.userSave) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.userSave,
                "abcdefghijklmnopqrstuvwxyz123456"
            )

            db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, results) => {
                console.log(results);
                if (!results) {
                    return next();
                }
                req.user = results[0];
                return next();
            })
        } catch (err) {
            console.log(err)
            return next()
        }
    } else {
        next();
    }
}