import React, { useState, useEffect } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { useCategories } from '../../hooks/useCategories';
import { getTodayString } from '../../utils/dateUtils';

export const ExpenseForm = ({ initialData, onSubmit, onCancel, loading }) => {
  const { categories } = useCategories(true); // Fetch active categories only per FR-18
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
      <Input
        label="Expense Title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. Grocery Shopping"
        required
      />
      <Input
        label="Amount (₹)"
        name="amount"
        type="number"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="0.00"
        required
      />
      
      <div style={styles.group}>
        <label style={styles.label}>
          Category <span style={styles.req}>*</span>
        </label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          style={styles.select}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="Expense Date"
        name="expenseDate"
        type="date"
        value={expenseDate}
        max={getTodayString()}
        onChange={(e) => setExpenseDate(e.target.value)}
        required
      />

      <Input
        label="Description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Optional notes"
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
        <Button variant="secondary" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={loading || !categoryId}>
          {loading ? 'Saving...' : initialData ? 'Update Expense' : 'Create Expense'}
        </Button>
      </div>
    </form>
  );
};

const styles = {
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginBottom: '16px',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: 'var(--color-text-muted)',
  },
  req: {
    color: 'var(--color-danger)',
  },
  select: {
    padding: '10px 14px',
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text-main)',
    border: '1px solid var(--color-card-border)',
    borderRadius: 'var(--border-radius-sm)',
    fontSize: '0.95rem',
    outline: 'none',
  },
};
