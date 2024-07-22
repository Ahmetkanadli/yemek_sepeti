// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {Image, Text, View, ImageSourcePropType, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

type RestourantDetailHeaderComponentProps = {
  path: NodeRequire | null;
  icon: string;
  text: string;
  textFunction: string;
};

const restourantDetailHeaderComponent: React.FC<
  RestourantDetailHeaderComponentProps
> = ({path, icon, text, textFunction}) => {
  return (
    <View style={styles.container}>
      {path !== null ? (
        // @ts-ignore
        <Image source={path} style={styles.image} />
      ) : (
        <Icon name={icon} size={20} color="#eb004b" />
      )}
      <View style={styles.textContainer}>
        {path !== null ? (
          <Text>{text}</Text>
        ) : (
          <Text style={{color: 'black', fontWeight: 'bold', marginLeft: 10}}>
            {text}
          </Text>
        )}
        {path !== null && (
          <Text style={{fontWeight: 'bold', color: 'black'}}>
            Ucretsiz Teslimat
          </Text>
        )}
        <Text style={styles.textFunction}>{textFunction}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '95%',
    alignItems: 'center',
    marginRight: 20,
  },
  textFunction: {
    color: '#eb004b',
    fontWeight: '800',
    marginLeft: 'auto',
  },
});

export default restourantDetailHeaderComponent;
