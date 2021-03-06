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
  thumbnails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  thumbnail: {
    marginRight: 10,
    marginBottom: 20,
  },
});

export default styles;
