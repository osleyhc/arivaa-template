import React from 'react';
import styles from './styles';
import { Image, ScrollView, Text, View } from 'react-native';
import { Form, Link, LinkBack, Modal } from '@arivaa-react-native/common';
import logo from '../../assets/logo-basic-hr.png';
import envelope from '../../assets/envelope.png';
import Colors from '@arivaa-react-native/common/styles/color';

/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
  const { email } = this.validations;
  const { navigation } = this.props;
  const { translate } = this.props;
  const { confirmOtp, verificationData } = this.state;
  const formElements = [
    {
      type: 'email',
      name: 'email',
      inputProps: {
        clear: true,
        placeholder: translate('common.email.placeholder'),
        labelNumber: 1.5,
        style: [styles.input],
        placeholderTextColor: '#fff',
        styles: {
          input: {
            color: '#fff',
          },
          container: {
            backgroundColor: Colors.inputBackgroundColor,
            borderWidth: 0,
            borderBottomColor: 'transparent',
          },
        },
        children: (
          <Image
            resizeMode="contain"
            source={envelope}
            style={[styles.inputIcon]}
          />
        ),
      },
      options: email,
    },
  ];
  return (
    <View style={[styles.container]}>
      <ScrollView>
        <View style={[styles.back]}>
          <LinkBack style={[styles.backIcon]} />
        </View>
        <View style={[styles.logoContainer]}>
          <Image resizeMode="contain" source={logo} style={[styles.logo]} />
        </View>
        <Text style={[styles.pageTitle]}>{translate('forgot.title')}</Text>
        <Text style={[styles.message]}>{translate('forgot.message')}</Text>
        <View style={[styles.form]}>
          <Form
            elements={formElements}
            style={{
              Body: styles.list,
            }}
            onSubmit={this.onSubmit.bind(this)}
            submitTrigger={{
              buttonProps: {
                style: styles.button,
              },
              textProps: {
                style: styles.buttonText,
              },
              text: translate('forgot.submit'),
            }}
          />
        </View>
      </ScrollView>
      <View style={[styles.options]}>
        <View>
          <Text style={[styles.optionLabel]}>
            {translate('forgot.mistake')}
          </Text>
          <Link
            textStyle={[styles.textLink]}
            text={translate('forgot.signIn')}
            link="login"
          />
        </View>
        <View style={[styles.separator]} />
        <View>
          <Text style={[styles.optionLabel]}>
            {translate('forgot.account')}
          </Text>
          <Link
            textStyle={[styles.textLink]}
            text={translate('forgot.signUp')}
            link="signUp"
          />
        </View>
      </View>
      <Modal
        onHide={this.onHideConfirmOtp.bind(this)}
        style={[styles.modal]}
        contentProps={{ verificationData, navigation }}
        modalId="verification"
        visible={confirmOtp}
      />
    </View>
  );
};

module.exports = view;
