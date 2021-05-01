class UserValidation {
  static isValidCredentials = credentials => {
    const { email, password, confirmPassword } = credentials;

    if (!email || !password || !confirmPassword) {
      return false;
    }

    return password === confirmPassword;
  };

  static isValidFileCSV = file => {
    if (!file || !UserValidation.getValidFileType().includes(file.type)) {
      return false;
    }

    return true;
  };

  static getValidFileType = () => {
    return ["text/csv"];
  };
}

export default UserValidation;
