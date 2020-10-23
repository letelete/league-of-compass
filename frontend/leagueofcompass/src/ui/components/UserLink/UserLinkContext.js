import { firstLetterCapital, firstWord } from '../../../helpers/strings';

import { compose } from '@reduxjs/toolkit';
import { createContext } from 'react';
import imagePlaceholder from '../../../assets/images/placeholders/user_image.jpg';

export const getFormattedLabel = (userName) =>
  `Hello, ${compose(firstWord, firstLetterCapital)(userName)}!`;

export const defaultValue = {
  image: imagePlaceholder,
  label: getFormattedLabel('Anon'),
};

export default createContext(defaultValue);
