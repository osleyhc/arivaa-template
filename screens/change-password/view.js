import React from 'react';
import styles from './styles';
import { ScrollView, Text, View } from 'react-native';
import { Form, LinkBack } from '@arivaa-react-native/common';
import { AntDesign } from '@expo/vector-icons';

var view = function () {
  const { password, cpassword } = this.validations;
  const { user, translate } = this.props;
  const formElements = [
    {
      type: 'password',
      name: 'password',
      inputProps: {
        clear: true,
        placeholder: translate('common.password.placeholder'),
        labelNumber: 1.5,
        style: [styles.input],
        placeholderTextColor: '#555',
        styles: {
          input: {
            color: '#555',
          },
        },
        children: (
          <AntDesign name={'lock'} size={25} style={[styles.inputIcon]} />
        ),
      },
      before: (
        <Text style={[styles.fieldLabel]}>
          {translate('changePassword.password')} *
        </Text>
      ),
      options: password,
    },
    {
      type: 'password',
      name: 'cpassword',
      inputProps: {
        clear: true,
        placeholder: translate('common.confirmPassword.placeholder'),
        labelNumber: 1.5,
        style: [styles.input],
        placeholderTextColor: '#555',
        styles: {
          input: {
            color: '#555',
          },
        },
        children: (
          <AntDesign name={'lock'} size={25} style={[styles.inputIcon]} />
        ),
      },
      before: (
        <Text style={[styles.fieldLabel]}>
          {translate('changePassword.confirm')} *
        </Text>
      ),
      options: cpassword,
    },
  ];
  return (
    <View style={[styles.container]}>
      <View style={[styles.back]}>
        <LinkBack />
      </View>
      <ScrollView>
        <View style={[styles.content]}>
          <View style={[styles.form]}>
            <Text style={[styles.label]}>
              {translate('changePassword.title')}
            </Text>
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
                text: translate('changePassword.submit'),
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
module.exports = view;
