import { Alert, StyleSheet, Text, View, Image, FlatList, SafeAreaView, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { MyButton, MyGap, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import axios from 'axios'
import { colors, fonts, windowWidth } from '../../utils';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { Icon } from 'react-native-elements';
export default function AAMember({ navigation, route }) {

    const [data, setData] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            __getTransaction();
        }
    }, [isFocused]);

    const __getTransaction = () => {
        axios.post(apiURL + 'member', {
            fid_sales: route.params.fid_sales
        }).then(res => {
            console.log(res.data);
            setData(res.data);
        })
    }

    const __renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('SDaftar', {
                id: item.id
            })} style={{
                margin: 5,
                // borderWidth: 1,
                borderBottomWidth: 1,
                borderBottomColor: colors.zavalabs,
                padding: 5,
                flexDirection: 'row'
            }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        borderWidth: 0,
                        marginHorizontal: 5,
                        width: 60,
                        height: 60,
                        overflow: 'hidden',
                        borderRadius: 30,
                        borderColor: colors.border
                    }}>
                        <Image source={{
                            uri: item.foto_user
                        }} style={{
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                        }} />
                    </View>
                </View>
                <View style={{
                    flex: 1,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 30
                    }}>{item.nama_lengkap}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 30
                    }}>{item.telepon}</Text>
                </View>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 24
                    }}>Rp{new Intl.NumberFormat().format(item.saldo)}</Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Icon type='ionicon' name='chevron-forward-outline' color={colors.primary} />
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>
            <FlatList data={data} renderItem={__renderItem} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})