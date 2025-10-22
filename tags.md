# 🗺️ TAG MAPPING - Chi tiết Tags cho từng Test

## 📊 Tổng quan Tags

| Category | Tags | Total Tests |
|----------|------|-------------|
| **Feature** | @login, @products, @cart, @checkout, @e2e | 36 |
| **Type** | @smoke, @critical, @regression, @negative, @validation | 30+ |
| **Component** | @sorting, @navigation, @ui, @logout | 14 |

---

## 🔐 LOGIN TESTS (login.spec.ts)

**Describe Tag**: `@login`

| Test ID | Test Name | Tags |
|---------|-----------|------|
| TC001 | Login successfully with valid standard user | `@login`, `@smoke`, `@critical` |
| TC002 | Login failed with locked out user | `@login`, `@negative` |
| TC003 | Login failed with invalid username | `@login`, `@negative` |
| TC004 | Login failed with invalid password | `@login`, `@negative` |
| TC005 | Login failed with empty username | `@login`, `@negative`, `@validation` |
| TC006 | Login failed with empty password | `@login`, `@negative`, `@validation` |
| TC007 | Login failed with empty credentials | `@login`, `@negative`, `@validation` |

**Command Examples:**
```bash
# Tất cả login tests
npm run test:login

# Chỉ smoke login tests
npx playwright test --grep "(?=.*@login)(?=.*@smoke)"

# Login negative tests
npx playwright test --grep "(?=.*@login)(?=.*@negative)"

# Login validation tests
npx playwright test --grep "(?=.*@login)(?=.*@validation)"
```

---

## 🛍️ PRODUCTS TESTS (products.spec.ts)

**Describe Tag**: `@products`

| Test ID | Test Name | Tags |
|---------|-----------|------|
| TC101 | Verify products page loads correctly | `@products`, `@smoke` |
| TC102 | Add single product to cart | `@products`, `@smoke`, `@cart` |
| TC103 | Add multiple products to cart | `@products`, `@cart` |
| TC104 | Sort products by name A to Z | `@products`, `@sorting`, `@ui` |
| TC105 | Sort products by name Z to A | `@products`, `@sorting`, `@ui` |
| TC106 | Sort products by price low to high | `@products`, `@sorting`, `@ui` |
| TC107 | Sort products by price high to low | `@products`, `@sorting`, `@ui` |
| TC108 | Navigate to shopping cart | `@products`, `@navigation` |
| TC109 | Logout from products page | `@products`, `@logout` |

**Command Examples:**
```bash
# Tất cả products tests
npm run test:products

# Products smoke tests
npx playwright test --grep "(?=.*@products)(?=.*@smoke)"

# Sorting tests
npm run test:sorting

# Products + cart tests
npx playwright test --grep "(?=.*@products)(?=.*@cart)"
```

---

## 🛒 CART TESTS (cart.spec.ts)

**Describe Tag**: `@cart`

| Test ID | Test Name | Tags |
|---------|-----------|------|
| TC201 | View empty cart | `@cart`, `@smoke` |
| TC202 | View cart with items | `@cart`, `@smoke` |
| TC203 | Remove item from cart | `@cart`, `@regression` |
| TC204 | Remove all items from cart | `@cart`, `@regression` |
| TC205 | Continue shopping from cart | `@cart`, `@navigation` |
| TC206 | Proceed to checkout from cart | `@cart`, `@smoke`, `@checkout` |

**Command Examples:**
```bash
# Tất cả cart tests
npm run test:cart

# Cart smoke tests
npx playwright test --grep "(?=.*@cart)(?=.*@smoke)"

# Cart regression tests
npx playwright test --grep "(?=.*@cart)(?=.*@regression)"
```

---

## 💳 CHECKOUT TESTS (checkout.spec.ts)

**Describe Tag**: `@checkout`

| Test ID | Test Name | Tags |
|---------|-----------|------|
| TC301 | Complete checkout with valid information | `@checkout`, `@smoke`, `@critical`, `@e2e` |
| TC302 | Checkout fails with empty first name | `@checkout`, `@negative`, `@validation` |
| TC303 | Checkout fails with empty last name | `@checkout`, `@negative`, `@validation` |
| TC304 | Checkout fails with empty postal code | `@checkout`, `@negative`, `@validation` |
| TC305 | Checkout fails with all empty fields | `@checkout`, `@negative`, `@validation` |
| TC306 | Cancel checkout from information page | `@checkout`, `@navigation` |
| TC307 | Verify total price in checkout overview | `@checkout`, `@regression` |
| TC308 | Navigate back to home after successful order | `@checkout`, `@navigation` |

**Command Examples:**
```bash
# Tất cả checkout tests
npm run test:checkout

# Checkout smoke tests
npx playwright test --grep "(?=.*@checkout)(?=.*@smoke)"

# Checkout validation tests
npx playwright test --grep "(?=.*@checkout)(?=.*@validation)"

# Critical checkout tests
npx playwright test --grep "(?=.*@checkout)(?=.*@critical)"
```

---

## 🔄 END-TO-END TESTS (e2e.spec.ts)

**Describe Tag**: `@e2e`

| Test ID | Test Name | Tags |
|---------|-----------|------|
| E2E001 | Complete shopping journey from login to order completion | `@e2e`, `@smoke`, `@critical`, `@full-flow` |
| E2E002 | Add products, sort, and complete purchase | `@e2e`, `@regression`, `@sorting` |
| E2E003 | Multiple users login and purchase | `@e2e`, `@regression`, `@multi-user` |

**Command Examples:**
```bash
# Tất cả e2e tests
npm run test:e2e

# E2E smoke tests
npx playwright test --grep "(?=.*@e2e)(?=.*@smoke)"

# E2E critical tests
npx playwright test --grep "(?=.*@e2e)(?=.*@critical)"
```

---

## 📈 Tag Statistics

### By Feature
```
@login     : 7 tests
@products  : 9 tests
@cart      : 6 tests (+ 3 from products)
@checkout  : 8 tests (+ 1 from cart)
@e2e       : 3 tests
```

### By Type
```
@smoke      : 7 tests (TC001, TC101, TC102, TC201, TC202, TC206, E2E001)
@critical   : 2 tests (TC001, TC301, E2E001)
@regression : 5 tests (TC203, TC204, TC307, E2E002, E2E003)
@negative   : 11 tests (TC002-TC007, TC302-TC305)
@validation : 7 tests (TC005-TC007, TC302-TC305)
```

### By Component
```
@sorting    : 5 tests (TC104-TC107, E2E002)
@navigation : 4 tests (TC108, TC205, TC306, TC308)
@ui         : 4 tests (TC104-TC107)
@logout     : 1 test (TC109)
```

---

## 🎯 Quick Reference - Tìm Tests theo Mục đích

### 1. Pre-Commit (Nhanh, < 2 phút)
```bash
npm run test:smoke
# Chạy: TC001, TC101, TC102, TC201, TC202, TC206, E2E001
```

### 2. Critical Path (Business Critical)
```bash
npm run test:critical
# Chạy: TC001, TC301, E2E001
```

### 3. Form Validation
```bash
npm run test:validation
# Chạy: TC005, TC006, TC007, TC302, TC303, TC304, TC305
```

### 4. Negative Scenarios
```bash
npm run test:negative
# Chạy: TC002-TC007, TC302-TC305
```

### 5. Full Regression (Weekly)
```bash
npm run test:regression
# Chạy: TC203, TC204, TC307, E2E002, E2E003
```

### 6. Sorting Features
```bash
npm run test:sorting
# Chạy: TC104, TC105, TC106, TC107, E2E002
```

### 7. Navigation Flows
```bash
npm run test:navigation
# Chạy: TC108, TC205, TC306, TC308
```

---

## 🔍 Advanced Queries

### Multiple Feature Combination
```bash
# Login + Checkout critical path
npx playwright test --grep "@login|@checkout" --grep "(?=.*@critical)"

# Products + Cart smoke tests
npx playwright test --grep "@products|@cart" --grep "(?=.*@smoke)"

# All features except E2E
npx playwright test --grep "@login|@products|@cart|@checkout" --grep-invert @e2e
```

### Type-Based Combinations
```bash
# Smoke + Critical (most important)
npx playwright test --grep "@smoke|@critical"

# All validation tests across features
npm run test:validation

# Negative tests in specific feature
npx playwright test --grep "(?=.*@checkout)(?=.*@negative)"
```

### Component Testing
```bash
# All UI interaction tests
npx playwright test --grep "@ui|@sorting|@navigation"

# Sorting + Navigation
npx playwright test --grep "@sorting|@navigation"
```

---

## 📝 Tag Naming Convention

**Format**: `@category-name`

**Categories:**
- **Feature**: `@login`, `@products`, `@cart`, `@checkout`, `@e2e`
- **Type**: `@smoke`, `@critical`, `@regression`, `@negative`, `@validation`
- **Component**: `@sorting`, `@navigation`, `@ui`, `@logout`
- **Special**: `@full-flow`, `@multi-user`

---

## 🎨 Visual Tag Distribution

```
SMOKE (7 tests):
├── TC001 (@login, @critical)
├── TC101 (@products)
├── TC102 (@products, @cart)
├── TC201 (@cart)
├── TC202 (@cart)
├── TC206 (@cart, @checkout)
└── E2E001 (@e2e, @critical, @full-flow)

CRITICAL (3 tests):
├── TC001 (@login, @smoke)
├── TC301 (@checkout, @smoke, @e2e)
└── E2E001 (@e2e, @smoke, @full-flow)

NEGATIVE (11 tests):
├── TC002-TC007 (@login, some @validation)
└── TC302-TC305 (@checkout, @validation)

REGRESSION (5 tests):
├── TC203, TC204 (@cart)
├── TC307 (@checkout)
└── E2E002, E2E003 (@e2e)
```

---

## 💡 Tips for Using Tags

1. **Start Small**: Begin with `@smoke` tests
2. **Feature Focus**: Use feature tags khi đang develop specific feature
3. **Type Focus**: Use type tags cho CI/CD pipelines
4. **Combine Wisely**: Combine tags để chạy exactly tests bạn cần
5. **Exclude Smart**: Dùng `--grep-invert` để skip unnecessary tests
6. **Document Changes**: Khi add tests mới, nhớ add appropriate tags

---

## 🚦 CI/CD Recommendations

### Pull Request Checks
```bash
npm run test:smoke
# Hoặc
npm run test:critical
```

### Nightly Builds
```bash
npm run test:regression
# Hoặc
npm test  # Run all tests
```

### Feature Branches
```bash
# Nếu working on login feature
npm run test:login

# Nếu working on checkout
npm run test:checkout
```

### Pre-Production Deploy
```bash
npx playwright test --grep "@smoke|@critical"
```

---

**Summary**: Có tổng cộng 33 test cases với 15+ tags khác nhau, cho phép flexible test execution theo nhu cầu! 🎯