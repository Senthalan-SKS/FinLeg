-- ============================================================
-- FinLeg Seed Data
-- Run: psql -U postgres -d finled -f backend/seed.sql
-- Demo credentials: admin@finleg.com / password
-- ============================================================

-- Clean existing data (order matters due to FK constraints)
DELETE FROM journal_lines;
DELETE FROM journal_entries;
DELETE FROM accounts;
DELETE FROM users;
DELETE FROM tenants;

-- ===================== TENANT =====================
INSERT INTO tenants (id, company_name, slug, email, active, created_at)
VALUES ('a1000000-0000-0000-0000-000000000001', 'FinLeg Demo Corp', 'finleg-demo', 'demo@finleg.com', true, NOW());

-- ===================== USER =====================
-- Password: password (BCrypt hash)
INSERT INTO users (id, full_name, email, password, role, tenant_id, created_at)
VALUES (
  'a1000000-0000-0000-0000-000000000002',
  'Demo Admin',
  'admin@finleg.com',
  '$2b$10$xMj6RtWkR8B47SrU0ZuuX.82aNJHa9oWRYKWMISS.XL3Rgb330yHe',
  'ADMIN',
  'a1000000-0000-0000-0000-000000000001',
  NOW()
);

-- ===================== ACCOUNTS =====================
-- ASSETS
INSERT INTO accounts (id, tenant_id, code, name, type, postable, active, created_at)
VALUES
  ('a1000000-0000-0000-0000-000000000100', 'a1000000-0000-0000-0000-000000000001', '1000', 'Cash',                         'ASSET',    true, true, NOW()),
  ('a1000000-0000-0000-0000-000000000101', 'a1000000-0000-0000-0000-000000000001', '1100', 'Accounts Receivable',         'ASSET',    true, true, NOW()),
  ('a1000000-0000-0000-0000-000000000102', 'a1000000-0000-0000-0000-000000000001', '1200', 'Inventory',                   'ASSET',    true, true, NOW()),
  ('a1000000-0000-0000-0000-000000000103', 'a1000000-0000-0000-0000-000000000001', '1300', 'Fixed Assets',                'ASSET',    true, true, NOW());

-- LIABILITIES
INSERT INTO accounts (id, tenant_id, code, name, type, postable, active, created_at)
VALUES
  ('a1000000-0000-0000-0000-000000000200', 'a1000000-0000-0000-0000-000000000001', '2000', 'Accounts Payable',            'LIABILITY', true, true, NOW()),
  ('a1000000-0000-0000-0000-000000000201', 'a1000000-0000-0000-0000-000000000001', '2100', 'Accrued Expenses',            'LIABILITY', true, true, NOW()),
  ('a1000000-0000-0000-0000-000000000202', 'a1000000-0000-0000-0000-000000000001', '2200', 'Short-term Debt',             'LIABILITY', true, true, NOW());

-- EQUITY
INSERT INTO accounts (id, tenant_id, code, name, type, postable, active, created_at)
VALUES
  ('a1000000-0000-0000-0000-000000000300', 'a1000000-0000-0000-0000-000000000001', '3000', 'Common Stock',                'EQUITY',    true, true, NOW()),
  ('a1000000-0000-0000-0000-000000000301', 'a1000000-0000-0000-0000-000000000001', '3100', 'Retained Earnings',           'EQUITY',    true, true, NOW());

-- REVENUE
INSERT INTO accounts (id, tenant_id, code, name, type, postable, active, created_at)
VALUES
  ('a1000000-0000-0000-0000-000000000400', 'a1000000-0000-0000-0000-000000000001', '4000', 'Service Revenue',             'REVENUE',   true, true, NOW()),
  ('a1000000-0000-0000-0000-000000000401', 'a1000000-0000-0000-0000-000000000001', '4100', 'Product Sales',               'REVENUE',   true, true, NOW()),
  ('a1000000-0000-0000-0000-000000000402', 'a1000000-0000-0000-0000-000000000001', '4200', 'Interest Income',             'REVENUE',   true, true, NOW());

-- EXPENSE
INSERT INTO accounts (id, tenant_id, code, name, type, postable, active, created_at)
VALUES
  ('a1000000-0000-0000-0000-000000000500', 'a1000000-0000-0000-0000-000000000001', '5000', 'Salaries & Wages',            'EXPENSE',   true, true, NOW()),
  ('a1000000-0000-0000-0000-000000000501', 'a1000000-0000-0000-0000-000000000001', '5100', 'Rent & Utilities',            'EXPENSE',   true, true, NOW()),
  ('a1000000-0000-0000-0000-000000000502', 'a1000000-0000-0000-0000-000000000001', '5200', 'Marketing & Advertising',     'EXPENSE',   true, true, NOW()),
  ('a1000000-0000-0000-0000-000000000503', 'a1000000-0000-0000-0000-000000000001', '5300', 'Office Supplies',             'EXPENSE',   true, true, NOW());

-- ===================== JOURNAL ENTRIES =====================
-- Cash UUID shortcut: a1000000-0000-0000-0000-000000000100
-- Common Stock:        a1000000-0000-0000-0000-000000000300
-- Service Revenue:     a1000000-0000-0000-0000-000000000400
-- Product Sales:       a1000000-0000-0000-0000-000000000401
-- Interest Income:     a1000000-0000-0000-0000-000000000402
-- Salaries:            a1000000-0000-0000-0000-000000000500
-- Rent:                a1000000-0000-0000-0000-000000000501
-- Marketing:           a1000000-0000-0000-0000-000000000502
-- Office Supplies:     a1000000-0000-0000-0000-000000000503
-- User:                a1000000-0000-0000-0000-000000000002
-- Tenant:              a1000000-0000-0000-0000-000000000001

-- Opening equity: Cash $100,000 / Common Stock $100,000
INSERT INTO journal_entries (id, tenant_id, reference_number, transaction_date, description, total_debit, total_credit, status, created_by, created_at)
VALUES ('a2000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'JE-2026-001', '2026-01-01', 'Opening equity contribution', 100000, 100000, 'POSTED', 'a1000000-0000-0000-0000-000000000002', NOW());

INSERT INTO journal_lines (id, journal_entry_id, account_id, debit_amount, credit_amount, line_description)
VALUES
  ('a3000000-0000-0000-0000-000000000001', 'a2000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000100', 100000, 0,      'Initial cash investment'),
  ('a3000000-0000-0000-0000-000000000002', 'a2000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000300', 0,      100000, 'Common stock issued');

-- Jan 15: Service Revenue $45,000
INSERT INTO journal_entries (id, tenant_id, reference_number, transaction_date, description, total_debit, total_credit, status, created_by, created_at)
VALUES ('a2000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001', 'JE-2026-002', '2026-01-15', 'January service revenue', 45000, 45000, 'POSTED', 'a1000000-0000-0000-0000-000000000002', NOW());

INSERT INTO journal_lines (id, journal_entry_id, account_id, debit_amount, credit_amount, line_description)
VALUES
  ('a3000000-0000-0000-0000-000000000003', 'a2000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000100', 45000, 0,     'Cash collection'),
  ('a3000000-0000-0000-0000-000000000004', 'a2000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000400', 0,     45000, 'Consulting services');

-- Feb 15: Service Revenue $35,000 + Product Sales $17,000
INSERT INTO journal_entries (id, tenant_id, reference_number, transaction_date, description, total_debit, total_credit, status, created_by, created_at)
VALUES ('a2000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000001', 'JE-2026-003', '2026-02-15', 'February revenue', 52000, 52000, 'POSTED', 'a1000000-0000-0000-0000-000000000002', NOW());

INSERT INTO journal_lines (id, journal_entry_id, account_id, debit_amount, credit_amount, line_description)
VALUES
  ('a3000000-0000-0000-0000-000000000005', 'a2000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000100', 52000, 0,     'Cash collection'),
  ('a3000000-0000-0000-0000-000000000006', 'a2000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000400', 0,     35000, 'Consulting services'),
  ('a3000000-0000-0000-0000-000000000007', 'a2000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000401', 0,     17000, 'Software product sales');

-- Mar 15: Service Revenue $48,000
INSERT INTO journal_entries (id, tenant_id, reference_number, transaction_date, description, total_debit, total_credit, status, created_by, created_at)
VALUES ('a2000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000001', 'JE-2026-004', '2026-03-15', 'March service revenue', 48000, 48000, 'POSTED', 'a1000000-0000-0000-0000-000000000002', NOW());

INSERT INTO journal_lines (id, journal_entry_id, account_id, debit_amount, credit_amount, line_description)
VALUES
  ('a3000000-0000-0000-0000-000000000008', 'a2000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000100', 48000, 0,     'Cash collection'),
  ('a3000000-0000-0000-0000-000000000009', 'a2000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000400', 0,     48000, 'Consulting services');

-- Apr 15: Service Revenue $40,000 + Interest Income $21,000
INSERT INTO journal_entries (id, tenant_id, reference_number, transaction_date, description, total_debit, total_credit, status, created_by, created_at)
VALUES ('a2000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000001', 'JE-2026-005', '2026-04-15', 'April revenue', 61000, 61000, 'POSTED', 'a1000000-0000-0000-0000-000000000002', NOW());

INSERT INTO journal_lines (id, journal_entry_id, account_id, debit_amount, credit_amount, line_description)
VALUES
  ('a3000000-0000-0000-0000-000000000010', 'a2000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000100', 61000, 0,     'Cash collection'),
  ('a3000000-0000-0000-0000-000000000011', 'a2000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000400', 0,     40000, 'Consulting services'),
  ('a3000000-0000-0000-0000-000000000012', 'a2000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000402', 0,     21000, 'Interest income');

-- May 15: Service Revenue $55,000
INSERT INTO journal_entries (id, tenant_id, reference_number, transaction_date, description, total_debit, total_credit, status, created_by, created_at)
VALUES ('a2000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000001', 'JE-2026-006', '2026-05-15', 'May service revenue', 55000, 55000, 'POSTED', 'a1000000-0000-0000-0000-000000000002', NOW());

INSERT INTO journal_lines (id, journal_entry_id, account_id, debit_amount, credit_amount, line_description)
VALUES
  ('a3000000-0000-0000-0000-000000000013', 'a2000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000100', 55000, 0,     'Cash collection'),
  ('a3000000-0000-0000-0000-000000000014', 'a2000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000400', 0,     55000, 'Consulting services');

-- Jun 15: Service Revenue $45,000 + Product Sales $22,000
INSERT INTO journal_entries (id, tenant_id, reference_number, transaction_date, description, total_debit, total_credit, status, created_by, created_at)
VALUES ('a2000000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000001', 'JE-2026-007', '2026-06-15', 'June revenue', 67000, 67000, 'POSTED', 'a1000000-0000-0000-0000-000000000002', NOW());

INSERT INTO journal_lines (id, journal_entry_id, account_id, debit_amount, credit_amount, line_description)
VALUES
  ('a3000000-0000-0000-0000-000000000015', 'a2000000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000100', 67000, 0,     'Cash collection'),
  ('a3000000-0000-0000-0000-000000000016', 'a2000000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000400', 0,     45000, 'Consulting services'),
  ('a3000000-0000-0000-0000-000000000017', 'a2000000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000401', 0,     22000, 'Software product sales');

-- Jan 31: Monthly expenses $10,500
INSERT INTO journal_entries (id, tenant_id, reference_number, transaction_date, description, total_debit, total_credit, status, created_by, created_at)
VALUES ('a2000000-0000-0000-0000-000000000008', 'a1000000-0000-0000-0000-000000000001', 'JE-2026-008', '2026-01-31', 'January operating expenses', 10500, 10500, 'POSTED', 'a1000000-0000-0000-0000-000000000002', NOW());

INSERT INTO journal_lines (id, journal_entry_id, account_id, debit_amount, credit_amount, line_description)
VALUES
  ('a3000000-0000-0000-0000-000000000018', 'a2000000-0000-0000-0000-000000000008', 'a1000000-0000-0000-0000-000000000500', 6000,  0,     'January salaries'),
  ('a3000000-0000-0000-0000-000000000019', 'a2000000-0000-0000-0000-000000000008', 'a1000000-0000-0000-0000-000000000501', 2500,  0,     'January rent'),
  ('a3000000-0000-0000-0000-000000000020', 'a2000000-0000-0000-0000-000000000008', 'a1000000-0000-0000-0000-000000000502', 1500,  0,     'January marketing'),
  ('a3000000-0000-0000-0000-000000000021', 'a2000000-0000-0000-0000-000000000008', 'a1000000-0000-0000-0000-000000000503', 500,   0,     'January office supplies'),
  ('a3000000-0000-0000-0000-000000000022', 'a2000000-0000-0000-0000-000000000008', 'a1000000-0000-0000-0000-000000000100', 0,     10500, 'Cash payment');

-- Feb 28: Monthly expenses $10,500
INSERT INTO journal_entries (id, tenant_id, reference_number, transaction_date, description, total_debit, total_credit, status, created_by, created_at)
VALUES ('a2000000-0000-0000-0000-000000000009', 'a1000000-0000-0000-0000-000000000001', 'JE-2026-009', '2026-02-28', 'February operating expenses', 10500, 10500, 'POSTED', 'a1000000-0000-0000-0000-000000000002', NOW());

INSERT INTO journal_lines (id, journal_entry_id, account_id, debit_amount, credit_amount, line_description)
VALUES
  ('a3000000-0000-0000-0000-000000000023', 'a2000000-0000-0000-0000-000000000009', 'a1000000-0000-0000-0000-000000000500', 6000,  0,     'February salaries'),
  ('a3000000-0000-0000-0000-000000000024', 'a2000000-0000-0000-0000-000000000009', 'a1000000-0000-0000-0000-000000000501', 2500,  0,     'February rent'),
  ('a3000000-0000-0000-0000-000000000025', 'a2000000-0000-0000-0000-000000000009', 'a1000000-0000-0000-0000-000000000502', 1500,  0,     'February marketing'),
  ('a3000000-0000-0000-0000-000000000026', 'a2000000-0000-0000-0000-000000000009', 'a1000000-0000-0000-0000-000000000503', 500,   0,     'February office supplies'),
  ('a3000000-0000-0000-0000-000000000027', 'a2000000-0000-0000-0000-000000000009', 'a1000000-0000-0000-0000-000000000100', 0,     10500, 'Cash payment');

-- Mar 31: Monthly expenses $10,500
INSERT INTO journal_entries (id, tenant_id, reference_number, transaction_date, description, total_debit, total_credit, status, created_by, created_at)
VALUES ('a2000000-0000-0000-0000-000000000010', 'a1000000-0000-0000-0000-000000000001', 'JE-2026-010', '2026-03-31', 'March operating expenses', 10500, 10500, 'POSTED', 'a1000000-0000-0000-0000-000000000002', NOW());

INSERT INTO journal_lines (id, journal_entry_id, account_id, debit_amount, credit_amount, line_description)
VALUES
  ('a3000000-0000-0000-0000-000000000028', 'a2000000-0000-0000-0000-000000000010', 'a1000000-0000-0000-0000-000000000500', 6000,  0,     'March salaries'),
  ('a3000000-0000-0000-0000-000000000029', 'a2000000-0000-0000-0000-000000000010', 'a1000000-0000-0000-0000-000000000501', 2500,  0,     'March rent'),
  ('a3000000-0000-0000-0000-000000000030', 'a2000000-0000-0000-0000-000000000010', 'a1000000-0000-0000-0000-000000000502', 1500,  0,     'March marketing'),
  ('a3000000-0000-0000-0000-000000000031', 'a2000000-0000-0000-0000-000000000010', 'a1000000-0000-0000-0000-000000000503', 500,   0,     'March office supplies'),
  ('a3000000-0000-0000-0000-000000000032', 'a2000000-0000-0000-0000-000000000010', 'a1000000-0000-0000-0000-000000000100', 0,     10500, 'Cash payment');

-- Apr 30: Monthly expenses $10,500
INSERT INTO journal_entries (id, tenant_id, reference_number, transaction_date, description, total_debit, total_credit, status, created_by, created_at)
VALUES ('a2000000-0000-0000-0000-000000000011', 'a1000000-0000-0000-0000-000000000001', 'JE-2026-011', '2026-04-30', 'April operating expenses', 10500, 10500, 'POSTED', 'a1000000-0000-0000-0000-000000000002', NOW());

INSERT INTO journal_lines (id, journal_entry_id, account_id, debit_amount, credit_amount, line_description)
VALUES
  ('a3000000-0000-0000-0000-000000000033', 'a2000000-0000-0000-0000-000000000011', 'a1000000-0000-0000-0000-000000000500', 6000,  0,     'April salaries'),
  ('a3000000-0000-0000-0000-000000000034', 'a2000000-0000-0000-0000-000000000011', 'a1000000-0000-0000-0000-000000000501', 2500,  0,     'April rent'),
  ('a3000000-0000-0000-0000-000000000035', 'a2000000-0000-0000-0000-000000000011', 'a1000000-0000-0000-0000-000000000502', 1500,  0,     'April marketing'),
  ('a3000000-0000-0000-0000-000000000036', 'a2000000-0000-0000-0000-000000000011', 'a1000000-0000-0000-0000-000000000503', 500,   0,     'April office supplies'),
  ('a3000000-0000-0000-0000-000000000037', 'a2000000-0000-0000-0000-000000000011', 'a1000000-0000-0000-0000-000000000100', 0,     10500, 'Cash payment');

-- May 31: Monthly expenses $10,000
INSERT INTO journal_entries (id, tenant_id, reference_number, transaction_date, description, total_debit, total_credit, status, created_by, created_at)
VALUES ('a2000000-0000-0000-0000-000000000012', 'a1000000-0000-0000-0000-000000000001', 'JE-2026-012', '2026-05-31', 'May operating expenses', 10000, 10000, 'POSTED', 'a1000000-0000-0000-0000-000000000002', NOW());

INSERT INTO journal_lines (id, journal_entry_id, account_id, debit_amount, credit_amount, line_description)
VALUES
  ('a3000000-0000-0000-0000-000000000038', 'a2000000-0000-0000-0000-000000000012', 'a1000000-0000-0000-0000-000000000500', 6000,  0,     'May salaries'),
  ('a3000000-0000-0000-0000-000000000039', 'a2000000-0000-0000-0000-000000000012', 'a1000000-0000-0000-0000-000000000501', 2500,  0,     'May rent'),
  ('a3000000-0000-0000-0000-000000000040', 'a2000000-0000-0000-0000-000000000012', 'a1000000-0000-0000-0000-000000000502', 1000,  0,     'May marketing'),
  ('a3000000-0000-0000-0000-000000000041', 'a2000000-0000-0000-0000-000000000012', 'a1000000-0000-0000-0000-000000000503', 500,   0,     'May office supplies'),
  ('a3000000-0000-0000-0000-000000000042', 'a2000000-0000-0000-0000-000000000012', 'a1000000-0000-0000-0000-000000000100', 0,     10000, 'Cash payment');

-- Jun 30: Monthly expenses $10,000
INSERT INTO journal_entries (id, tenant_id, reference_number, transaction_date, description, total_debit, total_credit, status, created_by, created_at)
VALUES ('a2000000-0000-0000-0000-000000000013', 'a1000000-0000-0000-0000-000000000001', 'JE-2026-013', '2026-06-30', 'June operating expenses', 10000, 10000, 'POSTED', 'a1000000-0000-0000-0000-000000000002', NOW());

INSERT INTO journal_lines (id, journal_entry_id, account_id, debit_amount, credit_amount, line_description)
VALUES
  ('a3000000-0000-0000-0000-000000000043', 'a2000000-0000-0000-0000-000000000013', 'a1000000-0000-0000-0000-000000000500', 5000,  0,     'June salaries'),
  ('a3000000-0000-0000-0000-000000000044', 'a2000000-0000-0000-0000-000000000013', 'a1000000-0000-0000-0000-000000000501', 2500,  0,     'June rent'),
  ('a3000000-0000-0000-0000-000000000045', 'a2000000-0000-0000-0000-000000000013', 'a1000000-0000-0000-0000-000000000502', 1000,  0,     'June marketing'),
  ('a3000000-0000-0000-0000-000000000046', 'a2000000-0000-0000-0000-000000000013', 'a1000000-0000-0000-0000-000000000503', 1500,  0,     'June office supplies'),
  ('a3000000-0000-0000-0000-000000000047', 'a2000000-0000-0000-0000-000000000013', 'a1000000-0000-0000-0000-000000000100', 0,     10000, 'Cash payment');
