const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Budget Schema & Model
const budgetSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  spend: { type: Number, default: 0 }
}, { timestamps: true });

const Budget = mongoose.models.Budget || mongoose.model('Budget', budgetSchema);

// 1. Create New Budget (POST /api/budget/add)
router.post('/add', async (req, res) => {
  try {
    const { userId, name, amount } = req.body;
    if (!userId || !name || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBudget = new Budget({ userId, name, amount, spend: 0 });
    await newBudget.save();

    res.status(201).json({ message: "Budget created successfully", budget: newBudget });
  } catch (error) {
    console.error("Budget Save Error:", error);
    res.status(500).json({ message: "Server error while saving budget" });
  }
});

// 2. Fetch User Budgets (GET /api/budget/user/:userId)
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const budgets = await Budget.find({ userId }).sort({ createdAt: -1 });
    res.json(budgets);
  } catch (error) {
    console.error("Budget Fetch Error:", error);
    res.status(500).json({ message: "Server error while fetching budgets" });
  }
});

// 3. Delete Budget (DELETE /api/budget/:id)
router.delete('/:id', async (req, res) => {
  try {
    await Budget.findByIdAndDelete(req.params.id);
    res.json({ message: "Budget deleted successfully" });
  } catch (error) {
    console.error("Budget Delete Error:", error);
    res.status(500).json({ message: "Server error while deleting budget" });
  }
});

module.exports = router;