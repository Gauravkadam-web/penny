import React, { useState, useEffect } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { getTodayString } from '../../utils/dateUtils';

export const ExpenseForm = ({ initialData, onSubmit, onCancel, loading }) => {
  const { categories } = useCategories(true); // Dynamic category list via API per FR-18
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [expenseDate, setExpenseDate] = useState(getTodayString());
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setAmount(initialData.amount || '');
      setCategoryId(initialData.categoryId || '');
      setExpenseDate(initialData.expenseDate || getTodayString());
      setDescription(initialData.description || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      amount: parseFloat(amount),
      categoryId: parseInt(categoryId, 10),
      expenseDate,
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Expense Title *</label>
        <input
          type="text"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Grocery Shopping"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Amount (₹) *</label>
        <input
          type="number"
          step="0.01"
          className="input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Category *</label>
        <select
          className="select"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Select Dynamic Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Expense Date *</label>
        <input
          type="date"
          className="input"
          value={expenseDate}
          max={getTodayString()}
          onChange={(e) => setExpenseDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <input
          type="text"
          className="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional transaction notes"
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
        <button type="button" className="btn btn--secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn--primary" disabled={loading || !categoryId}>
          {loading ? 'Saving...' : initialData ? 'Update Expense' : 'Create Expense'}
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
