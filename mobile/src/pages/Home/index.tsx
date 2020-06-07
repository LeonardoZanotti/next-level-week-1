import React, { useState, useEffect, ChangeEvent } from 'react';
import { Feather as Icon} from '@expo/vector-icons';
import { ImageBackground, View, Image, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

const Home = () => {
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const navigation = useNavigation();

    interface IBGEUFResponse {
      sigla: string;
  }
  
  interface IBGECityResponse {
      nome: string;
  }

    useEffect(() => {
      axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
          .then(response => {
              const ufInitials = response.data.map(uf => uf.sigla);

              setUfs(ufInitials);
          });
  }, []);

    useEffect(() => {
        if (selectedUf === '0') {
            return;
        }

        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
            .then(response => {
                const cityNames = response.data.map(city => city.nome);

                setCities(cityNames);
            });
    }, [selectedUf]);

    function handleNavigateToPoints() {
        navigation.navigate('Points', {
          selectedUf,
          selectedCity
        });
    }
    
    return (
        <ImageBackground
            source={require('../../assets/home-background.png')}
            style={styles.container}
            imageStyle={{ width: 274, height: 368 }}
        >
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')} />
                <View>
                    <Text style={styles.title}>Seu marketplace de coleta de resíduos.</Text>
                    <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <View style={styles.input}>
                  <RNPickerSelect
                      value={selectedUf}
                      style={{
                        ...pickerSelectStyles,			
                        viewContainer:styles.select,
                        inputAndroid:styles.input
                       }}
                      placeholder={{ label: 'Selecione uma UF', value:'0' }}
                      onValueChange={text => setSelectedUf(text)}
                      items={
                        ufs.map((uf: String) => (
                          { label: `${uf}`, value: `${uf}` }
                        ))
                      }
                  />                      
                  </View>

                  <View style={styles.input}>
                  <RNPickerSelect
                      value={selectedCity}
                      style={{
                        ...pickerSelectStyles,			
                        viewContainer:styles.select,
                        inputAndroid:styles.input
                       }}
                      placeholder={{ label: 'Selecione uma cidade', value:'0' }}
                      onValueChange={text => setSelectedCity(text)}
                      items={
                        cities.map((city: String) => (
                          { label: `${city}`, value: `${city}` }
                        ))
                      }
                  />
                </View>
                
                <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                    <View style={styles.buttonIcon}>
                        <Text>
                            <Icon name="arrow-right" color="#FFFFFF" size={24} />
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>Entrar</Text>
                </RectButton>
            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
     },

    input: {
      height: 60,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#bdc3c7',
      marginBottom: 8,
      overflow: 'hidden',
    },

    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });

  const pickerSelectStyles = StyleSheet.create({
    viewContainer: {
      alignSelf: 'stretch',
     },
     iconContainer: {
      position: 'absolute',
      right: 0,
     },
     modalViewTop: {
      flex: 1,
     },
     modalViewMiddle: {
      height: 45,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      backgroundColor: '#f8f8f8',
      borderTopWidth: 1,
      borderTopColor: '#dedede',
      zIndex: 2,
     },
     chevronContainer: {
      flexDirection: 'row',
     },
     chevron: {
      width: 15,
      height: 15,
      backgroundColor: 'transparent',
      borderColor: '#a1a1a1',
      borderTopWidth: 1.5,
      borderRightWidth: 1.5,
     },
     chevronUp: {
      marginLeft: 11,
      transform: [{ translateY: 4 }, { rotate: '-45deg' }],
     },
     chevronDown: {
      marginLeft: 22,
      transform: [{ translateY: -5 }, { rotate: '135deg' }],
     },
     chevronActive: {
      borderColor: '#007aff',
     },
     done: {
      color: '#007aff',
      fontWeight: '600',
      fontSize: 17,
      paddingTop: 1,
      paddingRight: 11,
     },
     doneDepressed: {
      fontSize: 19,
     },
     modalViewBottom: {
      justifyContent: 'center',
      backgroundColor: '#d0d4da',
     },
     placeholder: {
      color: 'black',
     },
     headlessAndroidPicker: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      color: 'transparent',
      opacity: 0,
     },
    })
export default Home;