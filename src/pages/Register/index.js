import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    ScrollView,
    ImageBackground,
    Dimensions,
    Switch,
    SafeAreaView,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { apiURL, api_token, MYAPP } from '../../utils/localStorage';
import GetLocation from 'react-native-get-location';
export default function Register({ navigation }) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [loading, setLoading] = useState(false);
    const [valid, setValid] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const validate = text => {
        // console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            // console.log('nama_lengkap is Not Correct');
            setData({ ...data, nama_lengkap: text });
            setValid(false);
            return false;
        } else {
            setData({ ...data, nama_lengkap: text });
            setValid(true);
            // console.log('nama_lengkap is Correct');
        }
    };

    const [sales, setSales] = useState([]);
    const getSales = () => {
        axios.post(apiURL + 'sales').then(res => {
            console.log(res.data);
            setSales(res.data);

            GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 15000,
            })
                .then(location => {
                    console.log(location);
                    setData({
                        ...data,
                        latitude: location.latitude,
                        longitude: location.longitude
                    })
                })


            setData({
                ...data,
                fid_sales: res.data[0].value
            });

            // setData(res.data.data);

        })
    }

    const [data, setData] = useState({
        api_token: api_token,
        password: '',
        id_user: '',
        nama_lengkap: '',
        fid_sales: '',
        telepon: '',
        latitude: '',
        longitude: '',
    });

    const simpan = () => {
        if (
            data.nama_lengkap.length === 0 &&
            data.telepon.length === 0 &&
            data.id_user.length === 0 &&
            data.password.length === 0

        ) {
            showMessage({
                message: 'Maaf Semua Field Harus Di isi !',
            });
        } else if (data.nama_lengkap.length === 0) {
            showMessage({
                message: 'Maaf nama lengkap masih kosong !',
            });
        }
        else if (data.latitude.length === 0) {
            showMessage({
                message: 'Pastikan lokasi nyala !',
            });
        }
        else if (data.telepon.length === 0) {
            showMessage({
                message: 'Maaf telepon masih kosong !',
            });
        } else if (data.id_user.length === 0) {
            showMessage({
                message: 'Maaf nik masih kosong !',
            });
        } else if (data.password.length === 0) {
            showMessage({
                message: 'Maaf Password masih kosong !',
            });
        } else {
            setLoading(true);
            console.log(data);
            axios
                .post(apiURL + 'register', data)
                .then(res => {
                    console.warn(res.data);
                    setLoading(false);
                    if (res.data.status == 404) {
                        showMessage({
                            type: 'danger',
                            message: res.data.message
                        })
                    } else {
                        Alert.alert(MYAPP, res.data.message);
                        navigation.goBack();
                    }


                });
        }
    };


    useEffect(() => {

        getSales();



    }, [])


    return (
        <ImageBackground
            style={{
                flex: 1,
                backgroundColor: colors.white,
                padding: 10,
            }}>

            {/* <Switch onValueChange={toggleSwitch} value={isEnabled} /> */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>




                <MyGap jarak={10} />
                <MyPicker label="ID Sales" iconname="list" data={sales} onValueChange={x => setData({
                    ...data,
                    fid_sales: x
                })} />
                <MyGap jarak={10} />
                <MyInput

                    label="ID Member"
                    iconname="card"
                    placeholder="Masukan ID Member"
                    value={data.id_user}
                    onChangeText={value =>
                        setData({
                            ...data,
                            id_user: value,
                        })
                    }
                />
                <MyGap jarak={10} />


                <MyGap jarak={10} />
                <MyInput
                    placeholder="Masukan nama lengkap / Toko"
                    label="Nama Lengkap / Nama Toko"
                    iconname="person"
                    value={data.nama_lengkap}
                    onChangeText={value =>
                        setData({
                            ...data,
                            nama_lengkap: value,
                        })
                    }
                />

                <MyGap jarak={10} />
                <MyInput
                    placeholder="Masukan nomor telepon"
                    label="Telepon"
                    iconname="call"
                    keyboardType="phone-pad"
                    value={data.telepon}
                    onChangeText={value =>
                        setData({
                            ...data,
                            telepon: value,
                        })
                    }
                />




                <MyGap jarak={10} />
                <MyInput
                    placeholder="Masukan password"
                    label="Password"
                    iconname="key"
                    secureTextEntry
                    value={data.password}
                    onChangeText={value =>
                        setData({
                            ...data,
                            password: value,
                        })
                    }
                />
                <MyGap jarak={20} />
                {!loading &&
                    <MyButton

                        warna={colors.primary}
                        title="Daftar Sekarang"
                        Icons="log-in"
                        onPress={simpan}
                    />
                }
                <MyGap jarak={20} />

                {loading && <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>}
            </ScrollView>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 10,
    },
    image: {
        width: 620 / 4,
        height: 160 / 4,
    },
});
