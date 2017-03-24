class Validate{
  static length(name, value) {
    if (value.length < 3) {
      return `${name} should be at least three characters.`;
    }
    return true;
  }

  static password(name, value) {
    if (value.length < 6) {
      return `${name} should be at least 6 characters.`;
    }
    return true;
  }

  static checkPassword(password, passwordAgain) {
    if (password !== passwordAgain) {
      return 'Password and password again does not match.';
    }
    return true;
  }

  static email(email) {
    const result = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                  .test(email);
    if (!result) {
      return 'Invalid email address';
    }
    return true;
  }
}

export default Validate;
