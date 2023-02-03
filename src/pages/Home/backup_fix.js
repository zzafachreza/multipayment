import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';

export default function Home({ navigation }) {

    const [user, setUser] = useState({});
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            __getTransaction();
        }

    }, [isFocused]);

    const __getTransaction = () => {
        getData('user').then(res => {
            setUser(res);
        })
    }

    const MyListData = ({ lab, val }) => {
        return (
            <View style={{
                flexDirection: 'row',
                marginHorizontal: 10,
                borderBottomWidth: 1,
                paddingVertical: 6,
                borderBottomColor: colors.zavalabs,
            }}>
                <View style={{ flex: 0.7, }}>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 28,
                        color: colors.black
                    }}>{lab}</Text>
                </View>
                <View style={{ flex: 0.2, }}>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 28,
                        color: colors.black
                    }}>:</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 28,
                        color: colors.black
                    }}>{val}</Text>
                </View>
            </View>
        )
    }

    const [key, setKey] = useState('');

    const [formula, setFormula] = useState({
        a8: 0,
        a9: 0,
        a10: 0,
        a11: 0,
        a12: 0,
        a13: 0,
        a14: 0,
        a15: 0,
        a16: 0
    })

    const filterData = () => {
        setLoading(true);
        axios.post(apiURL + 'part.php', {
            part_number: key
        }).then(res => {
            setLoading(false);
            console.log(res.data);
            if (res.data.kode == 50) {
                setOpen(false);
                showMessage({
                    message: 'Part Number tidak ditemukan !',
                    type: 'danger',
                })
            } else {
                setOpen(true);
                console.log(res.data);
                setData(res.data);


                setFormula({
                    ...formula,
                    a8: res.data.price - (res.data.price * (res.data.discount / 100)),
                    a9: (res.data.price - (res.data.price * (res.data.discount / 100))) * 15000,
                })
            }
        })
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
                        }}>PT Wali Karunia Sejahtera</Text>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('GetStarted')} style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 30
                    }}>
                        <Icon type='ionicon' name='person' color={colors.white} />
                        {/* <Text style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 28,
              color: colors.white
            }}>Informasi Akun</Text> */}
                    </TouchableOpacity>

                </View>


            </View>
            {/* body */}
            <View style={{
                padding: 10,
                flexDirection: 'row'
            }}>

                <View style={{
                    flex: 1,
                }}>
                    <MyInput value={key} onChangeText={x => setKey(x)} autoFocus label="Enter Part Number" placeholder="please enter part number" iconname="file-tray-stacked-outline" />
                </View>
                <View style={{
                    paddingVertical: 25,
                    paddingLeft: 5,
                }}>
                    <TouchableOpacity onPress={filterData} style={{
                        width: 60,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 50,
                        backgroundColor: colors.primary,
                    }}>
                        <Icon type='ionicon' name='search' color={colors.white} />
                    </TouchableOpacity>
                </View>

            </View>

            {loading && <ActivityIndicator size="large" color={colors.primary} />}
            {open && <>

                <MyListData lab="Part No" val={data.part_number} />
                <MyListData lab="Description" val={data.part_description} />
                <MyListData lab="Division" val={data.division} />
                <MyListData lab="List Price" val={data.price} />
                <MyListData lab="Discount" val={`${data.discount}%`} />
                <MyListData lab="Price After Discount" val={`$${formula.a8}`} />
                <MyListData lab="Harga" val={`Rp${new Intl.NumberFormat().format(formula.a8 * 15000)}`} />
                <MyListData lab="Harga + BM 10%" val={`Rp${new Intl.NumberFormat().format((formula.a8 * 15000) + ((formula.a8 * 15000) * 10 / 100))}`} />
                <MyListData lab="Pph 2,5%" val={`Rp${new Intl.NumberFormat().format(((formula.a8 * 15000) + ((formula.a8 * 15000) * 10 / 100)) * 2.5 / 100)}`} />
                <MyListData lab="Ppn 11%" val={`Rp${new Intl.NumberFormat().format(((formula.a8 * 15000) + ((formula.a8 * 15000) * 10 / 100)) * 11 / 100)}`} />

                <MyListData lab="Ongkir 15%" val={`Rp${new Intl.NumberFormat().format((formula.a8 * 15000) * 15 / 100)}`} />

                <MyListData lab="Harga Modal" val={`Rp${new Intl.NumberFormat().format(((formula.a8 * 15000) + ((formula.a8 * 15000) * 10 / 100)) + (((formula.a8 * 15000) + ((formula.a8 * 15000) * 10 / 100)) * 2.5 / 100) + ((formula.a8 * 15000) * 15 / 100))}`} />
                <MyListData lab="Harga Jual" val={`Rp${new Intl.NumberFormat().format((((formula.a8 * 15000) + ((formula.a8 * 15000) * 10 / 100)) + (((formula.a8 * 15000) + ((formula.a8 * 15000) * 10 / 100)) * 2.5 / 100) + ((formula.a8 * 15000) * 15 / 100)) + (((formula.a8 * 15000) + (((formula.a8 * 15000) * 10 / 100)) + (((formula.a8 * 15000) + ((formula.a8 * 15000) * 10 / 100)) * 2.5 / 100) + ((formula.a8 * 15000) * 15 / 100)) * 50 / 100))}`} />

                <MyListData lab="Harga Nett" val={`Rp${new Intl.NumberFormat().format((((formula.a8 * 15000) + ((formula.a8 * 15000) * 10 / 100)) + (((formula.a8 * 15000) + ((formula.a8 * 15000) * 10 / 100)) * 2.5 / 100) + ((formula.a8 * 15000) * 15 / 100)) + (((formula.a8 * 15000) + (((formula.a8 * 15000) * 10 / 100)) + (((formula.a8 * 15000) + ((formula.a8 * 15000) * 10 / 100)) * 2.5 / 100) + ((formula.a8 * 15000) * 15 / 100)) * 30 / 100))}`} />

                <MyListData lab="Stock" val={0} />
            </>}

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    judul: {
        fontFamily: fonts.secondary[600],
        fontSize: windowWidth / 35
    },
    item: {
        fontFamily: fonts.secondary[400],
        fontSize: windowWidth / 35
    }
})