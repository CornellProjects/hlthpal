import React from 'react';
import { Input } from 'native-base';
import styles from './styles';

const TextField = ({placeholder, value, onChangeText, secureTextEntry}) => {
    return (
        <Input
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
        />
    );
};

export default TextField;