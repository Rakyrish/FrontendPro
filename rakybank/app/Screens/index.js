import { View, Image, StyleSheet } from "react-native";
import { useEffect } from "react";

export default function Index({navigation}) {
  useEffect ( () => {
    const timer = setTimeout (() =>{
      navigation.navigate('MajorPage')
    }, 4000)
    return () => clearTimeout(timer)
  },[navigation])
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0588F6'
  },
  logo: {
    width: 300,
    height: 100,
  },
});
