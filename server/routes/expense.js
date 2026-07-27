const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// 1. ADD NEW EXPENSE
router.post('/add', async (req, res) => {
    try {
        const { userId, title, amount, category, date } = req.body;

        const newExpense = new Expense({
            user: userId,
            title,
            amount,
            category,
            date: date || Date.now()
        });

        const savedExpense = await newExpense.save();
        res.status(201).json({ message: 'Expense added successfully', expense: savedExpense });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// 2. GET ALL EXPENSES FOR A USER
router.get('/user/:userId', async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.params.userId }).sort({ date: -1 });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// 3. EDIT / UPDATE EXPENSE
router.put('/:id', async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;

        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            { title, amount, category, date },
            { new: true } // returns updated object
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.json({ message: 'Expense updated successfully', expense: updatedExpense });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// 4. DELETE EXPENSE
router.delete('/:id', async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;