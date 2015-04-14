var User = require('../models/user');

exports.index = function(req, res) {
    res.send('respond with a resource');
};

exports.signup = function(req, res) {
    // req.param('user')
    // req.params.user -> req.body.user -> req.query.user
    var _user = req.body.user;
    User.findOne({
        name: _user.name
    }, function(err, user) {
        if (err) {
            console.log(err);
        }
        if (user) {
            res.redirect('/user/signin');
        } else {
            user = new User(_user);
            user.save(function(err, user) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/');
            });
        }
    });
};

exports.showSignup = function (req, res) {
    res.render('signup', {
        title: '用户注册'
    });
};

exports.showSignin = function (req, res) {
    var _user = req.body.user;
    res.render('signin', {
        title: '用户登录'
    });
};

exports.signin = function(req, res) {
    var _user = req.body.user,
        name = _user.name,
        password = _user.password;
    User.findOne({
        name: name
    }, function(err, user) {
        if (err) {
            console.log(err);
        }
        if (!user) {
            res.redirect('/user/signin');
        }
        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                console.log(err);
            }

            if (isMatch) {
                req.session.user = user;
                res.redirect('/');
            } else {
                res.redirect('/user/signin');
            }
        });
    });
};

exports.list = function(req, res) {
    User.fetch(function(err, users) {
        res.render('userlist', {
            title: '用户列表页',
            users: users
        });
    });
};

exports.logout = function(req, res) {
    delete req.session.user;
    res.redirect('/');
};

exports.signinRequired = function(req, res, next) {
    var user = req.session.user;
    if (!user) {
        return res.redirect('/user/signin');
    }
    next();
}

exports.adminRequired = function(req, res, next) {
    var user = req.session.user;
    if ((!user.role) || (user.role <= 10)) {
        return res.redirect('/user/signin');
    }
    next();
}
