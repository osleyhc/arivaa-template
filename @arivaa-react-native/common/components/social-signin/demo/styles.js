import React from 'react-native';
import { Colors } from '../../../styles/';

var styles = React.StyleSheet.create({
  container: {
    padding: 10,
  },
  description: {
    paddingVertical: 20,
    lineHeight: 22,
    color: Colors.brandGrey,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.primaryColor,
  },
  section: {
    marginBottom: 20,
  },
  facebookBtn: {
    backgroundColor: Colors.facebookColor,
    borderColor: Colors.facebookColor,
  },
  googleBtn: {
    backgroundColor: Colors.googleColor,
    borderColor: Colors.googleColor,
  },
  buttonText: {
    fontSize: 14,
  },
});

export default styles;
