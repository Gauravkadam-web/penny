-- Seed 10 Realistic Categories
INSERT INTO category (name, description, is_active, is_system_default, created_at, updated_at)
VALUES 
    ('Food & Dining', 'Groceries, restaurants, cafes, snacks, and delivery', true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Transportation', 'Fuel, cab rides, metro, train tickets, and parking', true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Shopping & Retail', 'Clothing, footwear, electronics, gadgets, and home goods', true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Bills & Utilities', 'Electricity, water, WiFi internet, gas cylinder, and mobile recharge', true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Health & Fitness', 'Doctor visits, medicines, gym membership, lab tests, and supplements', true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Entertainment', 'Movies, Netflix/Spotify subscriptions, concerts, and gaming', true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Housing & Rent', 'Monthly apartment rent, society maintenance, and home repairs', true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Education & Books', 'Online courses, books, certification fees, and tutorials', true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Travel & Vacation', 'Flight bookings, hotel stays, vacation tours, and sightseeing', true, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('General / Other', 'Miscellaneous daily expenses, emergency spend, and fallback', true, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (name) DO NOTHING;

-- Seed 28 Realistic Transactions mapped to the categories above
INSERT INTO expense (title, amount, category_id, expense_date, description, created_at, updated_at)
VALUES
    -- Food & Dining
    ('Weekly Grocery at DMart', 3450.00, (SELECT id FROM category WHERE name = 'Food & Dining' LIMIT 1), '2026-08-24', 'Vegetables, dairy, cooking oil, spices', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Dinner with Friends at Olive Bistro', 1850.00, (SELECT id FROM category WHERE name = 'Food & Dining' LIMIT 1), '2026-08-23', 'Weekend dinner and mocktails', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Swiggy Lunch Order', 320.00, (SELECT id FROM category WHERE name = 'Food & Dining' LIMIT 1), '2026-08-22', 'Paneer butter masala thali', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Starbucks Coffee & Bagel', 480.00, (SELECT id FROM category WHERE name = 'Food & Dining' LIMIT 1), '2026-08-20', 'Work meeting coffee', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Fresh Fruit Market', 450.00, (SELECT id FROM category WHERE name = 'Food & Dining' LIMIT 1), '2026-08-18', 'Apples, bananas, and dry fruits', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

    -- Transportation
    ('Petrol Fill-up (Full Tank)', 2200.00, (SELECT id FROM category WHERE name = 'Transportation' LIMIT 1), '2026-08-24', 'Indian Oil fuel pump', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Uber Ride to Airport', 680.00, (SELECT id FROM category WHERE name = 'Transportation' LIMIT 1), '2026-08-21', 'Early morning cab ride', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Metro Smart Card Recharge', 500.00, (SELECT id FROM category WHERE name = 'Transportation' LIMIT 1), '2026-08-15', 'Monthly metro card reload', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Car Wash & Interior Detailing', 750.00, (SELECT id FROM category WHERE name = 'Transportation' LIMIT 1), '2026-08-10', 'Monthly vehicle cleaning', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

    -- Shopping & Retail
    ('Zara Casual Shirt & Trousers', 3890.00, (SELECT id FROM category WHERE name = 'Shopping & Retail' LIMIT 1), '2026-08-22', 'Monsoon collection apparel', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Boat Bluetooth Earbuds', 1499.00, (SELECT id FROM category WHERE name = 'Shopping & Retail' LIMIT 1), '2026-08-19', 'Amazon purchase for daily workout', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Running Shoes (Nike Revolution)', 4299.00, (SELECT id FROM category WHERE name = 'Shopping & Retail' LIMIT 1), '2026-08-12', 'Jogging sneakers replacement', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

    -- Bills & Utilities
    ('Airtel Fiber Broadband Bill', 1179.00, (SELECT id FROM category WHERE name = 'Bills & Utilities' LIMIT 1), '2026-08-24', '300 Mbps unlimited plan', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Electricity Bill (Adani Power)', 2840.00, (SELECT id FROM category WHERE name = 'Bills & Utilities' LIMIT 1), '2026-08-16', 'Monthly residential power usage', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Jio Mobile Postpaid Family Plan', 999.00, (SELECT id FROM category WHERE name = 'Bills & Utilities' LIMIT 1), '2026-08-14', 'Monthly mobile bill', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('LPG Gas Cylinder Refill', 880.00, (SELECT id FROM category WHERE name = 'Bills & Utilities' LIMIT 1), '2026-08-08', 'Indane gas delivery', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

    -- Health & Fitness
    ('Gold Gym Monthly Subscription', 2500.00, (SELECT id FROM category WHERE name = 'Health & Fitness' LIMIT 1), '2026-08-20', 'Fitness center membership renewal', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Pharmacy - Apollo Medicines & Vitamins', 740.00, (SELECT id FROM category WHERE name = 'Health & Fitness' LIMIT 1), '2026-08-17', 'Multivitamins and cold medication', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Dental Cleaning & Checkup', 1200.00, (SELECT id FROM category WHERE name = 'Health & Fitness' LIMIT 1), '2026-08-09', 'Routine 6-month dental checkup', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

    -- Entertainment
    ('PVR Inox Movie Tickets (IMAX)', 920.00, (SELECT id FROM category WHERE name = 'Entertainment' LIMIT 1), '2026-08-23', '2 tickets + popcorn combo', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Netflix Premium 4K Plan', 649.00, (SELECT id FROM category WHERE name = 'Entertainment' LIMIT 1), '2026-08-15', 'Monthly streaming service auto-debit', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Spotify Duo Subscription', 149.00, (SELECT id FROM category WHERE name = 'Entertainment' LIMIT 1), '2026-08-11', 'Music streaming plan', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

    -- Housing & Rent
    ('Apartment Rent for August', 18500.00, (SELECT id FROM category WHERE name = 'Housing & Rent' LIMIT 1), '2026-08-05', '2BHK flat monthly rental via NEFT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Society Maintenance Charges', 2200.00, (SELECT id FROM category WHERE name = 'Housing & Rent' LIMIT 1), '2026-08-07', 'Quarterly building upkeep fee', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

    -- Education & Books
    ('Udemy React & Spring Boot Course', 499.00, (SELECT id FROM category WHERE name = 'Education & Books' LIMIT 1), '2026-08-13', 'Fullstack masterclass tutorial', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Technical Books from Crossword', 850.00, (SELECT id FROM category WHERE name = 'Education & Books' LIMIT 1), '2026-08-06', 'System Design and Clean Code books', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

    -- Travel & Vacation
    ('Goa Weekend Hotel Booking (Agoda)', 6800.00, (SELECT id FROM category WHERE name = 'Travel & Vacation' LIMIT 1), '2026-08-02', '2 nights resort reservation in North Goa', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

    -- General / Other
    ('Home Repair Plumbing Service', 650.00, (SELECT id FROM category WHERE name = 'General / Other' LIMIT 1), '2026-08-04', 'Kitchen sink tap replacement labor', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
