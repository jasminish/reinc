module.exports = {
    upload: function (req, res) {
        req.file('image').upload(function (err, files) {
            if (err)
            return res.serverError(err);

            return res.json({
                message: files.length + ' file(s) uploaded successfully!',
                files: files
            });
        });
    }
};
