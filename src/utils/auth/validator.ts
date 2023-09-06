export const validatePassword = (password: string) => {
  const passwordPattern = /^(?!.*\s)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/;

  if (passwordPattern.test(password)) {
    return true;
  } else {
    return false;
  }
};

export function validateLastName(lastName: string) {
  return /^[a-zA-Z]+$/.test(lastName);
}

export function validateFirstName(firstName: string) {
  return /^[a-zA-Z]+$/.test(firstName);
}

// eslint-disable-next-line max-lines-per-function
export const formatDate = (rawDate: string) => {
  let cleanedDate = rawDate.replace(/\D/g, '');

  if (cleanedDate.length <= 4) {
    return cleanedDate;
  } else if (cleanedDate.length === 5) {
    const fifthChar = cleanedDate[4];

    if (fifthChar === '0' || fifthChar === '1') {
      cleanedDate = cleanedDate.slice(0, 4) + '-' + fifthChar;
    } else {
      cleanedDate = cleanedDate.slice(0, 4);
    }
  } else if (cleanedDate.length === 6) {
    const fifthChar = cleanedDate[4];
    const sixthChar = cleanedDate[5];

    if (fifthChar === '1') {
      if (sixthChar >= '0' && sixthChar <= '2') {
        cleanedDate = cleanedDate.slice(0, 4) + '-' + fifthChar + sixthChar;
      } else {
        cleanedDate = cleanedDate.slice(0, 4) + '-' + fifthChar;
      }
    } else if (fifthChar === '0') {
      if (sixthChar > '0' && sixthChar <= '9') {
        cleanedDate = cleanedDate.slice(0, 4) + '-' + fifthChar + sixthChar;
      } else {
        cleanedDate = cleanedDate.slice(0, 4);
      }
    } else {
      cleanedDate = cleanedDate.slice(0, 4);
    }
  } else if (cleanedDate.length === 7) {
    const seventhChar = cleanedDate[6];

    if (seventhChar >= '0' && seventhChar <= '3') {
      cleanedDate = cleanedDate.slice(0, 4) + '-' + cleanedDate.slice(4, 6) + '-' + seventhChar;
    } else {
      cleanedDate = cleanedDate.slice(0, 4) + '-' + cleanedDate.slice(4, 6);
    }
  }

  if (cleanedDate.length === 8) {
    const seventhChar = cleanedDate[6];
    const eighthChar = cleanedDate[7];

    if ((seventhChar === '0' && eighthChar !== '0') || seventhChar === '1' || seventhChar === '2') {
      cleanedDate = cleanedDate.slice(0, 4) + '-' + cleanedDate.slice(4, 6) + '-' + seventhChar + eighthChar;
    } else if (seventhChar === '3') {
      if (eighthChar === '0' || eighthChar === '1') {
        cleanedDate = cleanedDate.slice(0, 4) + '-' + cleanedDate.slice(4, 6) + '-' + seventhChar + eighthChar;
      } else {
        cleanedDate = cleanedDate.slice(0, 4) + '-' + cleanedDate.slice(4, 6) + '-' + seventhChar;
      }
    } else {
      cleanedDate = cleanedDate.slice(0, 4) + '-' + cleanedDate.slice(4, 6);
    }
  }

  return cleanedDate;
};

export const formatPhoneNumber = (inputValue: string, countryCode: string) => {
  type CodeType = { [key: string]: string };

  const code: CodeType = {
    RU: '+7',
    US: '+1',
  };

  const phoneNumber = inputValue.replace(/\+\d|\D/g, '');
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 1) {
    return '';
  }

  if (phoneNumberLength < 4) return `${code[countryCode.toUpperCase()]} (${phoneNumber}`;

  if (phoneNumberLength < 7) {
    return `${code[countryCode.toUpperCase()]} (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }

  return `${code[countryCode.toUpperCase()]} (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6,
  )}-${phoneNumber.slice(6, 10)}`;
};

export function validateCity(city: string) {
  return /^[a-zA-Z]+$/.test(city);
}

type CountryValidators = {
  [key: string]: {
    placeholder: string;
    phoneMask: string;
  };
};

export const validateCountry: CountryValidators = {
  US: {
    placeholder: 'Enter ZIP Code (e.g., 12345)',
    phoneMask: '+1 (###) ###-####',
  },
  RU: {
    placeholder: 'Enter Postal Code (e.g., 123456)',
    phoneMask: '+7 (###) ###-####',
  },
  DEFAULT: {
    placeholder: 'Select country',
    phoneMask: 'Select country',
  },
};
