# Saucedemo Automation Framework

Automation testing framework cho trang web [Saucedemo](https://www.saucedemo.com/) sử dụng Playwright và TypeScript.

## Cấu trúc project

```
saucedemo-automation/
├── src/
│   ├── pages/              # Page Object Models
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   ├── ProductsPage.ts
│   │   ├── CartPage.ts
│   │   └── CheckoutPage.ts
│   ├── fixtures/           # Custom fixtures
│   │   └── customFixtures.ts
│   ├── tests/              # Test suites
│   │   ├── login.spec.ts
│   │   ├── products.spec.ts
│   │   ├── cart.spec.ts
│   │   ├── checkout.spec.ts
│   │   └── e2e.spec.ts
│   └── utils/              # Utilities và helpers
│       ├── helpers.ts
│       ├── testData.ts
│       └── constants.ts
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies

```

## Cài đặt

### Prerequisites
- Node.js (v16 trở lên)
- npm hoặc yarn

### Installation Steps

1. Clone hoặc tải project về:
```bash
cd saucedemo-automation
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Cài đặt Playwright browsers:
```bash
npx playwright install
```

## Chạy tests

### Chạy tất cả tests
```bash
npm test
```

### Chạy tests với UI mode
```bash
npm run test:ui
```

### Chạy tests với headed mode (nhìn thấy browser)
```bash
npm run test:headed
```

### Chạy tests trên Chrome only
```bash
npm run test:chrome
```

### Debug tests
```bash
npm run test:debug
```

### Xem test report
```bash
npm run report
```

### Chạy tests cụ thể
```bash
# Chạy login tests
npx playwright test login.spec.ts

# Chạy một test case cụ thể
npx playwright test -g "TC001"

# Chạy tests trong một folder
npx playwright test src/tests/
```

## Test Coverage

### Login Tests (login.spec.ts)
- TC001: Login thành công với standard user
- TC002: Login thất bại với locked user
- TC003: Login thất bại với invalid username
- TC004: Login thất bại với invalid password
- TC005: Login thất bại với empty username
- TC006: Login thất bại với empty password
- TC007: Login thất bại với empty credentials

### Products Tests (products.spec.ts)
- TC101: Verify products page load
- TC102: Add single product to cart
- TC103: Add multiple products to cart
- TC104: Sort products A-Z
- TC105: Sort products Z-A
- TC106: Sort products by price low to high
- TC107: Sort products by price high to low
- TC108: Navigate to shopping cart
- TC109: Logout functionality

### Cart Tests (cart.spec.ts)
- TC201: View empty cart
- TC202: View cart with items
- TC203: Remove item from cart
- TC204: Remove all items from cart
- TC205: Continue shopping from cart
- TC206: Proceed to checkout

### Checkout Tests (checkout.spec.ts)
- TC301: Complete checkout with valid info
- TC302-305: Checkout validation tests
- TC306: Cancel checkout
- TC307: Verify total price
- TC308: Navigate back to home

### End-to-End Tests (e2e.spec.ts)
- E2E001: Complete shopping journey
- E2E002: Sort and purchase
- E2E003: Multiple users workflow

## Test Data

Framework sử dụng test data được define trong `src/utils/testData.ts`:

### Valid Users
- `standard_user` - User bình thường
- `problem_user` - User có issues
- `performance_glitch_user` - User có performance issues
- `visual_user` - User cho visual testing

### Test Products
- Sauce Labs Backpack
- Sauce Labs Bike Light
- Sauce Labs Bolt T-Shirt
- Sauce Labs Fleece Jacket
- Sauce Labs Onesie
- Test.allTheThings() T-Shirt (Red)

## Page Object Model

Framework sử dụng Page Object Model pattern để organize code:

- **BasePage**: Base class chứa common methods
- **LoginPage**: Login page interactions
- **ProductsPage**: Products listing và cart management
- **CartPage**: Shopping cart operations
- **CheckoutPage**: Checkout process

## Utilities

### Helpers (src/utils/helpers.ts)
- `takeScreenshot()` - Chụp screenshot
- `waitForNetworkIdle()` - Wait network idle
- `generateRandomString()` - Random string generator
- `isSortedAscending()` - Check array sorted
- `isSortedDescending()` - Check array sorted

### Constants (src/utils/constants.ts)
- URLs
- Timeouts
- Sort options
- Page titles
- Success messages

## Configuration

### Playwright Config
- **Base URL**: https://www.saucedemo.com
- **Browsers**: Chromium, Firefox, WebKit
- **Parallel execution**: Enabled
- **Screenshots**: On failure
- **Video**: On failure
- **Trace**: On retry

### Reporters
- HTML Report (default)
- JSON Report
- List Reporter (console)

## Best Practices

1. **Page Objects**: Tất cả page interactions qua Page Object Models
2. **Fixtures**: Sử dụng custom fixtures để reuse code
3. **Test Data**: Centralized test data trong testData.ts
4. **Waits**: Sử dụng Playwright auto-waiting, tránh hard waits
5. **Assertions**: Descriptive assertions với expect
6. **Independence**: Mỗi test case độc lập, không depend lẫn nhau

## Troubleshooting

### Tests fail với timeout
- Tăng timeout trong playwright.config.ts
- Check network connection
- Verify test data còn valid

### Browser không launch
```bash
# Reinstall browsers
npx playwright install --force
```

### Clear test results
```bash
npm run clean
```

## CI/CD Integration

Framework sẵn sàng cho CI/CD với:
- Retry mechanism (2 retries in CI)
- Parallel execution control
- Multiple report formats
- Screenshot và video on failure

### Example GitHub Actions
```yaml
- name: Run Playwright tests
  run: npm test
  
- name: Upload test report
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

## Author & License

- **Author**: Your Name
- **Framework**: Playwright + TypeScript
- **Target Site**: https://www.saucedemo.com/
- **License**: ISC