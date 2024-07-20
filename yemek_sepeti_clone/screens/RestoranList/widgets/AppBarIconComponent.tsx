import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface IconButtonProps {
  name: string;
  size: number;
  color: string;
}

function pressHandler(name: string): void {
  console.log(name);
}

function AppBarIconComponent({
  name,
  size,
  color,
}: IconButtonProps): React.JSX.Element {
  return (
    <TouchableOpacity
      style={styles.iconButton}
      onPress={() => pressHandler(name)}>
      <Icon name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    marginHorizontal: 8,
  },
});

export default AppBarIconComponent;
