export const TestData = {
  validUsers: {
    standard: {
      username: 'standard_user',
      password: 'secret_sauce',
    },
    problem: {
      username: 'problem_user',
      password: 'secret_sauce',
    },
    performance: {
      username: 'performance_glitch_user',
      password: 'secret_sauce',
    },
    visual: {
      username: 'visual_user',
      password: 'secret_sauce',
    }
  },

  invalidUsers: {
    locked: {
      username: 'locked_out_user',
      password: 'secret_sauce',
    },
    invalidUsername: {
      username: 'invalid_user',
      password: 'secret_sauce',
    },
    invalidPassword: {
      username: 'standard_user',
      password: 'invalid_password',
    },
    empty: {
      username: '',
      password: '',
    }
  },

  products: {
    backpack: 'Sauce Labs Backpack',
    bikeLight: 'Sauce Labs Bike Light',
    boltTshirt: 'Sauce Labs Bolt T-Shirt',
    fleeceJacket: 'Sauce Labs Fleece Jacket',
    onesie: 'Sauce Labs Onesie',
    redTshirt: 'Test.allTheThings() T-Shirt (Red)',
  },

  checkoutInfo: {
    valid: {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345',
    },
    invalid: {
      firstName: '',
      lastName: '',
      postalCode: '',
    }
  },

  errorMessages: {
    lockedUser: 'Epic sadface: Sorry, this user has been locked out.',
    invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
    usernameRequired: 'Epic sadface: Username is required',
    passwordRequired: 'Epic sadface: Password is required',
    firstNameRequired: 'Error: First Name is required',
    lastNameRequired: 'Error: Last Name is required',
    postalCodeRequired: 'Error: Postal Code is required',
  }
};