import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, judul, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import { SliderBox } from "react-native-image-slider-box";


export default function Home({ navigation }) {


  const [ENTRIES, SETENTITIES] = useState([]);
  const [mutasi, setMutasi] = useState({
    order: 0,
    setor: 0,
    saldo: 0
  });
  const [user, setUser] = useState({});
  const isFocused = useIsFocused();
  useEffect(() => {

    if (isFocused) {
      __getTransaction();
    }


  }, [isFocused]);
  const [data, setData] = useState([]);
  const __getTransaction = () => {
    getData('user').then(res => {
      setUser(res);


      axios.post(apiURL + 'riwayat_sales', {
        fid_sales: res.id_user
      }).then(res => {
        console.log(res.data);
        setData(res.data);
      })


      axios.post(apiURL + 'saldo', {
        fid_user: res.id
      }).then(dd => {
        console.log(dd.data);
        setMutasi(dd.data);

      })

    })

    axios.post(apiURL + 'slider').then(res => {
      console.log(res.data)
      SETENTITIES(res.data);
    })

  }


  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };



  const MyMenu = ({ img, judul, onPress, desc }) => {
    return (
      <TouchableOpacity onPress={onPress} style={{
        marginVertical: 5,
        borderRadius: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primary,
        height: windowHeight / 8
      }} >
        <View style={{

        }}>
          <Image source={img} style={{
            width: windowHeight / 6,
            height: windowHeight / 12,
            resizeMode: 'contain'
          }} />
        </View>
        <View>
          <Text style={{
            fontFamily: fonts.secondary[600],
            color: colors.white,
            fontSize: windowWidth / 20,

          }}>{judul}</Text>
          <Text style={{
            fontFamily: fonts.secondary[400],
            color: colors.white,
            fontSize: windowWidth / 30,

          }}>{desc}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  const __renderItem = ({ item }) => {

    return (
      <View style={{
        borderBottomWidth: 1,
        borderBottomColor: colors.zavalabs,
        marginVertical: 5,
        padding: 10,
        flexDirection: 'row'
      }}>


        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
          <Text style={{
            color: colors.primary,
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 35
          }}>{item.tanggal} {item.jam} WIB</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SDaftar', {
            id: item.fid_user
          })}>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 30
            }}>{item.nama_lengkap}</Text>
          </TouchableOpacity>
          <Text style={{
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 30
          }}>{item.telepon}</Text>





        </View>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>


          <TouchableOpacity onPress={() => {
            if (item.status == 'Waiting') {
              Alert.alert(MYAPP, 'Update status transaksi ?', [
                {
                  'text': 'Tutup'
                },
                {
                  'text': 'Reject',
                  onPress: () => {
                    axios.post(apiURL + 'update_status', {
                      id_saldo: item.id_saldo,
                      status: 'Reject',
                    }).then(res => {
                      console.log(res.data);
                      __getTransaction();
                    })
                  }
                },
                {
                  'text': 'Approve',
                  onPress: () => {
                    axios.post(apiURL + 'update_status', {
                      id_saldo: item.id_saldo,
                      status: 'Approve',
                    }).then(res => {
                      console.log(res.data);
                      __getTransaction();
                    })
                  }
                }

              ])
            } else {
              showMessage({
                type: 'danger',
                message: 'Status tidak dapat di ubah !'
              })
            }
          }}>
            <Text style={{
              backgroundColor: item.status == 'Reject' ? colors.danger : item.status == 'Approve' ? colors.primary : item.status == 'Done' ? colors.success : colors.secondary,
              paddingHorizontal: 10,
              borderRadius: 5,
              color: item.status == 'Reject' ? colors.white : item.status == 'Approve' ? colors.white : item.status == 'Done' ? colors.white : colors.black,
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 35
            }}>{item.status}</Text>
          </TouchableOpacity>




        </View>

        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-end'
        }}>
          <Text style={{
            fontFamily: fonts.secondary[400],
            fontSize: windowWidth / 25,
            color: item.tipe == 'D' ? colors.success : colors.black

          }}>{item.tipe == 'D' ? '' : '-'} Rp{new Intl.NumberFormat().format(item.nominal)}</Text>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}>
            <View style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: item.tipe == 'D' ? colors.primary : colors.primary
            }}>
              <Icon type='ionicon' name='wallet' color={colors.white} size={windowWidth / 35} />
            </View>
            <Text style={{
              left: 3,
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 30,
              color: colors.black,
            }}>{item.tipe == 'D' ? 'Order' : 'Setor'}</Text>
          </View>
        </View>
      </View >
    )

  }

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
    }}>
      {/* header */}
      <View style={{
        backgroundColor: colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}>

        <View style={{
          flexDirection: 'row',
        }}>
          <View style={{
            flex: 1,
          }}>
            <Text style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 28,
              color: colors.white
            }}>Selamat datang, {user.nama_lengkap}</Text>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 28,
              color: colors.white
            }}>{MYAPP}</Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30
          }}>
            <Icon type='ionicon' name='person' color={colors.white} />

          </TouchableOpacity>

        </View>


      </View>
      <SliderBox
        images={ENTRIES}
        sliderBoxHeight={150}
        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
        dotColor={colors.white}
        inactiveDotColor={colors.secondary}
      />

      {user.level == 'Member' && <TouchableOpacity onPress={() => navigation.navigate('Riwayat', user)} activeOpacity={0.8}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: colors.primary,
          padding: 10,
        }}>
          <View style={{
            padding: 10,
          }}>
            <Text style={judul(windowWidth / 28, colors.white)}>Total Order</Text>
            <View style={{
              flexDirection: 'row'
            }}>
              <Icon type='ionicon' name='log-in-outline' size={windowWidth / 28} color={colors.white} />
              <Text style={{
                fontFamily: fonts.secondary[600],
                left: 5,
                color: colors.white
              }}>{new Intl.NumberFormat().format(mutasi.order)}</Text>
            </View>
          </View>
          <View style={{
            padding: 10,
          }}>
            <Text style={judul(windowWidth / 28, colors.white)}>Total Setor</Text>
            <View style={{
              flexDirection: 'row'
            }}>
              <Icon type='ionicon' name='share-outline' size={windowWidth / 28} color={colors.white} />
              <Text style={{
                fontFamily: fonts.secondary[600],
                left: 5,
                color: colors.white
              }}>{new Intl.NumberFormat().format(mutasi.setor)}</Text>
            </View>
          </View>
          <View style={{
            padding: 10,
          }}>
            <Text style={judul(windowWidth / 28, colors.white)}>Saldo</Text>
            <View style={{
              flexDirection: 'row'
            }}>
              <Icon type='ionicon' name='wallet-outline' size={windowWidth / 28} color={colors.white} />
              <Text style={{
                fontFamily: fonts.secondary[600],
                left: 5,
                color: colors.white
              }}>{new Intl.NumberFormat().format(mutasi.saldo)}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>}


      {user.level == 'Member' &&
        <View style={{
          flex: 1,
          justifyContent: 'center'
        }}>
          <MyMenu onPress={() => navigation.navigate('AAOrder', user)} img={require('../../assets/A3.png')} judul="Order Saldo" desc="Input data order saldo" />
          <MyMenu onPress={() => navigation.navigate('AASetor', user)} img={require('../../assets/A1.png')} judul="Setor Saldo" desc="Input data Setor Saldo" />
          <MyMenu onPress={() => navigation.navigate('Account')} img={require('../../assets/A6.png')} judul="Informasi Akun" desc="Informasi akun atau pengguna" />
        </View>
      }

      {user.level == 'Sales' &&

        <FlatList data={data} renderItem={__renderItem} />
      }

    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: windowHeight,
    height: windowWidth / 2,
  },
  imageContainer: {
    flex: 1,
    marginBottom: 1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});