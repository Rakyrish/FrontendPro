import React from 'react';
import { View, Text, StatusBar, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Header from '../Layout/Header';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.content1}>
          <Text style={styles.mainTitle}>
            PataBeba: Number 1 Transportation Services portal in East Africa
          </Text>
          <Text style={styles.subTitle}>
            Find loads, trusted Truck owners and Drivers. Consolidate Loads and make more profit. All For FREE!
          </Text>
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <View style={styles.horizontalLine} />
              <Text style={styles.statText}>+ 0 Today</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <View style={styles.horizontalLine} />
              <Text style={styles.statText}>+ 0 Today</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2</Text>
              <View style={styles.horizontalLine} />
              <Text style={styles.statText}>+ 2 Today</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <View style={styles.horizontalLine} />
              <Text style={styles.statText}>+ 0 Today</Text>
            </View>
          </View>
        </View>
        <View style={styles.content2}>
          <Text style={styles.section2Text}>From</Text>
          <View style={styles.section2}>
            <TextInput placeholder='City, Region' style={styles.inputText} />
            <TextInput placeholder='Radius, Km' style={styles.inputText} />
          </View>
          <Text style={styles.section2Text}>To</Text>
          <View style={styles.section2}>
            <TextInput placeholder='City, Region' style={styles.inputText} />
            <TextInput placeholder='Radius, Km' style={styles.inputText} />
          </View>
          <Text style={styles.section2Text}>Date</Text>
          <View style={styles.section2}>
            <TextInput placeholder='DD.MM.YYYY' style={styles.inputText} />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.searchButtonTrucks}>
              <Text style={styles.buttonTextSearch}>SEARCH TRUCKS</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchButtonLoads}>
              <Text style={styles.buttonTextSearch}>SEARCH LOADS</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Add a Load for free</Text>
          <Text style={styles.cardSubtitle}>Get offers from carriers and choose the best fit</Text>
          <TouchableOpacity style={styles.cardButton}>
            <Text style={styles.buttonText}>+ ADD A LOAD</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Add a Truck for free</Text>
          <Text style={styles.cardSubtitle}>Get shippers to contact you and offer you loads</Text>
          <TouchableOpacity style={styles.cardButton}>
            <Text style={styles.buttonText}>+ ADD A TRUCK</Text>
          </TouchableOpacity>
        </View>
        <Text  style={styles.ServicesText}>Services</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitleServices}>Distance Calculator</Text>
          <Text style={styles.cardSubtitleServices}>Calculate distance between locations</Text>
          <TouchableOpacity style={styles.cardButtonService1}>
            <Text style={styles.buttonTextService1}>LEARN MORE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitleServices}>Route Optimizer</Text>
          <Text style={styles.cardSubtitleServices}>Choose the most suitable route based on criteria</Text>
          <TouchableOpacity style={styles.cardButtonService2}>
            <Text style={styles.buttonTextService2}>ALL SERVICES</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.moreContent}>
          <TouchableOpacity>
            <Text style={styles.moreText}>Frequently Asked Questions</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.moreText}>How to Use the Platform</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.moreText}>Follow us on Social Media</Text>
          </TouchableOpacity>
          <View style={styles.horizontalLine} />
          <TouchableOpacity>
            <Text style={styles.moreText}>Find Loads</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.moreText}>Find Carriers</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.moreText}>Explore Tenders</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitleServices}>ACTIVITY PANEL</Text>
          <Text style={styles.cardSubtitleServices}>Highest rated participants Today</Text>
          <TouchableOpacity style={styles.cardButtonService2}>
            <Text style={styles.buttonTextService2}>SEE MORE</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <View style={styles.quickLinks}>
            <Text style={styles.footerTitle}>Quick Links</Text>
           
              <View style={styles.footerLinkText}>
              <TouchableOpacity>
              <Text style={styles.footerLink}>About the Service</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Find Loads</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Find Carriers</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.footerLinkText2}>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Find Tenders</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Contact us</Text>
            </TouchableOpacity>
            </View>
          </View>
          <View style={styles.horizontalLine} />
          <View style={styles.horizontalLineEnd} />
          <View style={styles.copyright}>
            <Text style={styles.copyrightText}>
              PataBeba is a registered copyright. 
            </Text>
            <Text style={styles.copyrightText}>
               All rights Reserved 2023 - 2024
            </Text>
          </View>
        </View>
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#E6E6E6', 
  },
  content1: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E90FF',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    elevation: 2,
  },
  mainTitle: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 15,
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    marginVertical: 10,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  statText: {
    fontSize: 14,
    color: 'grey',
  },
  horizontalLine: {
    width: '100%',
    height: 1,
    backgroundColor: 'grey',
    marginVertical: 5,
  },
  content2: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    elevation: 2,
  },
  section2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  section2Text: {
    fontSize: 18,
    marginVertical: 10,
  },
  inputText: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '48%',
    height: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  searchButtonTrucks: {
    backgroundColor: '#32CD32',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 40,
    width: '48%',
    alignItems: 'center',
  },
  searchButtonLoads: {
    backgroundColor: '#FFD100',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 40,
    width: '48%',
    alignItems: 'center',
  },
  buttonTextSearch: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
    letterSpacing: 0.9
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: '90%',
    margin: 10,
    shadowColor: '#000',
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 20,
  },
  cardButton: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: 200,
    borderColor: '#1E90FF'
  },
  buttonText: {
    fontSize: 16,
    color: '#1E90FF',
    fontWeight: 'bold',
  },
  ServicesText: {
    fontSize: 50,
    marginLeft: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  cardTitleServices: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardButtonService1: {
    width: '100%',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderColor: '#1E90FF'
  },
  cardButtonService2: {
    width: '100%',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: '#d3d3d3'
  },
  cardSubtitleServices: {
    fontSize: 20,
    color: '#888888',
    marginBottom: 20,
  },
  buttonTextService1: {
    fontSize: 16,
    color: '#1E90FF',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonTextService2: {
    fontSize: 16,
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  moreContent: {
    margin: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: '90%',
    elevation: 3,
  },
  moreText: {
    color: '#1E90FF',
    fontSize: 20,
    justifyContent: 'space-evenly',
    margin: 10
  },
  footer: {
    backgroundColor: '#c0c0c0',
    borderRadius: 5,
    padding: 20,
    marginVertical: 10,
    width: '100%',
  },
  quickLinks: {
   
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30
  },
  footerLink: {
    fontSize: 16,
    color: '#555555',
  },
  copyright: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  copyrightText: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
  },
  horizontalLineEnd: {
   marginTop: 45,
    width: '100%',
    height: 1,
    backgroundColor: 'grey',
    marginVertical: 5,
  },
footerLinkText:{
  marginTop: 10,
  padding: 25,
  flexDirection: 'row',
  justifyContent: 'space-between'
},
footerLinkText2: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 25
}
});


