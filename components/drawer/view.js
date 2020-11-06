import React from 'react';
import { ScrollView, Text, View, Image } from 'react-native';
import styles from './styles';
import DrawerItems from './config';
import DrawerItem from './drawer-item';
import { Link } from '@arivaa-react-native/common';
import girl from '../../assets/girl.jpg';

/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
  const { navigation, user, translate } = this.props;
  return user ? (
    <View style={{ flex: 1 }}>
      <ScrollView style={[styles.scrollView]}>
        <View style={[styles.drawerHeader]}>
          <Image
            resizeMode="cover"
            source={
              user && user.profileImage ? { uri: user.profileImage } : girl
            }
            style={[styles.drawerProfileImg]}
          />
          <View style={[styles.username]}>
            <Text style={[styles.name]}>{user.name}</Text>
            <Link link="editProfile">
              <Text style={[styles.link]}>
                {translate('drawer.editProfile')}
              </Text>
            </Link>
          </View>
        </View>
        <View>
          {DrawerItems.map((item, index) => {
            return (
              <DrawerItem
                onPress={this.onPress.bind(this, item)}
                navigation={navigation}
                item={item}
                key={index}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  ) : null;
};

module.exports = view;
