import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dropdown } from 'react-native-element-dropdown';
import { validateLogin } from '../routes/auth/login'; 
import { fetchUserData } from '../routes/auth/user'; 
import { handleSignup } from '../routes/auth/reg';
import DropDownMenu from '../Menu/Dropdown';
import { useAuth } from '../features/auth';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = () => {

  const navigation = useNavigation();
  const { username, userphone_number, setUserName, setUserPhoneNumber } = useAuth();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [dropdown, setDropDown] = useState(false);
  const [password, setPassword] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState(null);
  const [error, setError] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loadingLogging, setloadingLogging] = useState(false)
  
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('isLoggedIn');
        if (value === 'true') {
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.error(e);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    setShowLoginPrompt(true);
  };

  const handleSignupPrompt = () => {
    setShowSignupPrompt(true);
  };

  const handleValidateLogin = async () => {
    setloadingLogging(true);  // Start the loader before the async operation
    try {
      const loginResult = await validateLogin({ phone_number, password });
      if (loginResult.success) {
        const userResult = await fetchUserData(loginResult.tokens.access);
        if (userResult.success) {
          await AsyncStorage.setItem('isLoggedIn', 'true');
          setIsLoggedIn(false); // Update the login state
          setShowLoginPrompt(false);
          setUserPhoneNumber(userResult.user.phone_number);
          setUserName(userResult.user.name);
        } else {
          setError(userResult.error);
        }
      } else {
        setError(loginResult.error);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setloadingLogging(false);  // Stop the loader regardless of the outcome
    }
  };
  

  const handleSignupPromptSubmit = async () => {
    try {
      const signUpResult = await handleSignup({ name, phone_number, password, userType });
      if (signUpResult.success) {
        setShowSignupPrompt(false);
        Alert.alert(
          "Successful Sign Up",
          'Use the above login button to login',
          [{ text: "OK", onPress: () => navigation.navigate('HomePage') }]
        );
      } else {
        setError(signUpResult.errors);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const userTypes = [
    { label: 'Carrier', value: 'carrier' },
    { label: 'Shipper', value: 'shipper' }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.menuIconContainer} onPress={() => setShowMenu(true)}>
          <Ionicons name="menu" size={35} style={styles.menuIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
  console.log('Image pressed');
  navigation.navigate('HomePage');
}}>
  <Image source={require('../assets/logo.png')} style={styles.logo} />
</TouchableOpacity>
        {!isLoggedIn ? (
          <View style={styles.loggedInIconsContainer}>
            {/* <TouchableOpacity>
              <Ionicons name="notifications-outline" size={27} color="white" style={styles.icon} />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', { name: userphone_number })}>
              <Ionicons name="chatbubble-outline" size={27} color="white" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="person-circle-outline" size={40} color="#7F8C8D" />
            </TouchableOpacity>
            <View style={{ padding: 2, marginLeft: 2 }}>
              <Text style={{ fontSize: 20 }}>{username}</Text>
              <Text>{userphone_number}</Text>
            </View>
            <TouchableOpacity style={{marginHorizontal: 2}} onPress={() => setDropDown(prev => !prev)}>
              <Ionicons name={dropdown ? "arrow-up" : "arrow-down"} size={30} color="grey" style={styles.iconArrow} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.headerButtonLogin} onPress={handleLogin}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButtonSignUp} onPress={handleSignupPrompt}>
              <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      
      <Modal
  visible={showLoginPrompt}
  transparent={true}
  animationType="slide"
  onRequestClose={() => setShowLoginPrompt(false)}
>
  <View style={styles.modalContainer}>
    {loadingLogging ? (
      <ActivityIndicator color="#228b22" size="large" style={{ alignSelf: 'center' }} />
    ) : (
      <View style={styles.modalView}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.horizontalLine}></View>
        <Text style={styles.loginText}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phone_number}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        {error.phone_number && <Text style={styles.errorText}>{error.phone_number}</Text>}
        <Text style={styles.loginText}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error.phone_number && <Text style={styles.errorText}>{error.phone_number}</Text>}
        {error.login && <Text style={styles.errorText}>{error.login}</Text>}
        <View style={styles.ModalButtons}>
          <TouchableOpacity onPress={() => setShowLoginPrompt(false)} style={styles.TouchButtonCancel}>
            <Text style={styles.SubmitText}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButtonLogin} onPress={handleValidateLogin}>
            <Text style={styles.SubmitText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    )}
  </View>
</Modal>


      <Modal
        visible={showSignupPrompt}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSignupPrompt(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Sign Up</Text>
            <View style={styles.horizontalLine}></View>
            <Text style={styles.loginText}>Are you a Carrier or a Shipper?</Text>
            <Dropdown
              style={styles.dropdown}
              data={userTypes}
              labelField="label"
              valueField="value"
              placeholder="Select"
              value={userType}
              onChange={item => setUserType(item.value)}
            />
            <Text style={styles.loginText}>Names</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            {error.name && <Text style={styles.errorText}>{error.name}</Text>}
            <Text style={styles.loginText}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={phone_number}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
            {error.phone_number && <Text style={styles.errorText}>{error.phone_number}</Text>}
            <Text style={styles.loginText}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {error.password && <Text style={styles.errorText}>{error.password}</Text>}
            <View style={styles.ModalButtons}>
              <TouchableOpacity onPress={() => setShowSignupPrompt(false)} style={styles.TouchButtonCancel}>
                <Text style={styles.SubmitText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButtonLogin} onPress={handleSignupPromptSubmit}>
                <Text style={styles.SubmitText}>SIGN UP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showMenu}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowMenu(false)}
      >
        <View style={styles.menuModalContainer}>
          <Menu setShowMenu={setShowMenu} navigation={navigation} />
        </View>
      </Modal>

      <Modal
        visible={dropdown}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setDropDown(false)}
      >
        <View style={styles.menuModalContainerDrop}>
          <DropDownMenu setDropDown={setDropDown} setIsLoggedIn={setIsLoggedIn} navigation={navigation} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const Menu = ({ setShowMenu, navigation }) => {
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity onPress={() => setShowMenu(false)}>
        <Ionicons name="close" size={35} style={styles.menuCloseIcon} />
      </TouchableOpacity>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('LoadsPage')}>
        <Text style={styles.menuButtonText}>Loads</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuButton}>
        <Text style={styles.menuButtonText}>Trucks</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Carriers', setShowMenu(false))}>
        <Text style={styles.menuButtonText}>Carriers</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Shippers', setShowMenu(false))}>
        <Text style={styles.menuButtonText}>Shippers</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    width: 240
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    height: 60,
    backgroundColor: '#ffffff',
    width : 'auto'
  },
  loggedInIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 'auto'

  },
  icon: {
    marginHorizontal: 4,
    backgroundColor: 'grey',
    borderRadius: 10,
    width: 30,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  iconArrow: {
    
    borderRadius: 10,
    width: 30,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  menuIconContainer: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#D0F255',
  },
  menuIcon: {
    color: '#000',
  },
  menuCloseIcon: {
    color: '#000',
  },
  logo: {
    width: 150,
    height: 40,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  buttons: {
    flexDirection: 'row',
  },
  headerButtonLogin: {
    backgroundColor: '#0588F6',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginHorizontal: 5,
    paddingHorizontal: 20,
  },
  headerButtonSignUp: {
    backgroundColor: '#32CD32',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginHorizontal: 5,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 400,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: 'grey',
    marginBottom: 10,
  },
  loginText: {
    fontSize: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  ModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TouchButtonCancel: {
    backgroundColor: '#808078',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginHorizontal: 5,
    paddingHorizontal: 20,
  },
  SubmitText: {
    color: 'white',
  },
  dropdown: {
    marginBottom: 20,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  menuModalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuModalContainerDrop: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    width: '45%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
  },
  menuButton: {
    paddingVertical: 10,
  },
  menuButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;
