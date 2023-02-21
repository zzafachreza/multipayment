import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
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

export default function SDaftar({ navigation, route }) {

    const isFocused = useIsFocused();

    const [data, setData] = useState([]);

    useEffect(() => {

        if (isFocused) {
            axios.post(apiURL + 'riwayat', {
                fid_user: route.params.id
            }).then(res => {
                console.log(res.data);
                setData(res.data);
                let total = 0;
                res.data.map(i => {
                    if (i.tipe == 'D' && i.status == 'Done') {
                        total += parseFloat(i.nominal);
                    } else if (i.tipe == 'C' && i.status == 'Done') {
                        total -= parseFloat(i.nominal);
                    }

                });
                setSaldo(total);
            })
        }


    }, [isFocused]);
    const [saldo, setSaldo] = useState(0);


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
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 35
                    }}>{item.tanggal} {item.jam} WIB</Text>

                    <Text style={{
                        backgroundColor: item.status == 'Reject' ? colors.danger : item.status == 'Approve' ? colors.primary : item.status == 'Done' ? colors.success : colors.secondary,
                        paddingHorizontal: 10,
                        borderRadius: 5,
                        color: item.status == 'Reject' ? colors.white : item.status == 'Approve' ? colors.white : item.status == 'Done' ? colors.white : colors.black,
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 35
                    }}>{item.status}</Text>



                </View>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
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
            padding: 10,
        }}>
            <View style={{
                padding: 10,
                flexDirection: 'row',
                borderBottomWidth: 2,
                borderBottomColor: colors.primary,
            }}>
                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 30,
                    color: colors.black,
                }}>Saldo Saat ini</Text>
                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 20,
                    color: colors.black,
                    textAlign: 'center'

                }}>Rp{new Intl.NumberFormat().format(saldo)}</Text>
            </View>
            <FlatList showsVerticalScrollIndicator={false} data={data} renderItem={__renderItem} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})