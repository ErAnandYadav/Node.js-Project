const path = require('path');
const User = require('../../models/user');
const flash = require('express-flash');
const validAdmin = {
    username: 'admin',
    password: 'admin123'
};

exports.getDashboard = async (req, res) => {
    if (req.session.isAdminAuthenticated) {
        res.render('admin/index');
      } else {
        req.flash('error', 'You must be logged in as an admin to access the dashboard.');
        res.redirect('/admin/login'); // Redirect to the admin login page if not authenticated
      }
  };

exports.adminLogin = async(req, res) => {
    res.render('admin/login', {errorMsg: req.flash('error')})
}

exports.login = async(req, res) =>{
    const { username, password } = req.body;
    if (username === validAdmin.username && password === validAdmin.password) {
        req.session.isAdminAuthenticated = true;
        req.session.admin = validAdmin;
        req.flash('success', 'Login successful!');
        res.redirect('/admin');
      } else {
        req.flash('error', 'Invalid admin username or password');
        res.redirect('/admin/login');
    }
}

exports.transactionHistory = async(req, res) =>{
    res.render('admin/transaction')
}