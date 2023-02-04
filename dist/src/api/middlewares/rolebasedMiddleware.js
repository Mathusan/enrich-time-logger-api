"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsInRole = void 0;
const checkIsInRole = (...roles) => (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    const hasRole = roles.find((role) => req.user.role === role);
    if (!hasRole) {
        return res.redirect('/login');
    }
    return next();
};
exports.checkIsInRole = checkIsInRole;
