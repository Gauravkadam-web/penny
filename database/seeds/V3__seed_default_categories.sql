-- V3__seed_default_categories.sql
INSERT INTO category (name, description, is_active, is_system_default, created_at, updated_at)
VALUES 
    ('Food', 'Food, groceries, dining out, and beverages', true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Transport', 'Public transit, fuel, taxi, and vehicle maintenance', true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Shopping', 'Clothing, electronics, personal items, and household goods', true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Bills', 'Electricity, water, internet, subscriptions, and utility bills', true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Health', 'Medical expenses, pharmacy, doctor visits, and fitness', true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Entertainment', 'Movies, games, events, and leisure activities', true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Other', 'General uncategorized expenses and fallback category', true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (name) DO NOTHING;
