import { Alert, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import {
    formatCurrency,
    getSupportedCurrencies,
} from "react-native-format-currency";

export default function AAOrder({ navigation, route }) {

    const [loading, setLoading] = useState(false);


    const [kirim, setKirim] = useState({
        fid_sales: route.params.fid_sales,
        fid_user: route.params.id,
        nominal: '',

    });

    // setLoading(false);

    const sendServer = () => {
        console.log(kirim);


        if (parseFloat(kirim.nominal) > 0) {
            setLoading(true);
            axios.post(apiURL + 'order_saldo', kirim).then(res => {
                console.log(res.data);
                if (res.data == 200) {
                    Alert.alert(MYAPP, 'Order Saldo ' + kirim.showNominal + ' berhasil di simpan !');
                    navigation.goBack();
                }
            })
        } else {
            showMessage({
                type: 'danger',
                message: 'Nominal tidak boleh 0'
            })
        }
    }

    const [region, setRegion] = useState([]);

    useEffect(() => {

        axios.post(apiURL + 'sales').then(res => {
            console.log(res.data);
            setRegion(res.data);

        })

    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>


            <ScrollView showsVerticalScrollIndicator={false}>
                <MyPicker value={kirim.fid_sales} iconname="person" onValueChange={x => setKirim({ ...kirim, fid_sales: x })} label="ID Sales" data={region} />

                <MyInput iconname='wallet' value={kirim.nominal} autoFocus keyboardType='number-pad' label='Nominal' onChangeText={x => {

                    let curr = formatCurrency({ amount: x, code: "IDR" });
                    console.log(curr);
                    setKirim({
                        ...kirim,
                        nominal: x,
                        showNominal: curr[0]
                    })
                }} />
                <Text style={{
                    textAlign: 'center',
                    marginVertical: 10,
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 15
                }}>{kirim.showNominal}</Text>
            </ScrollView>

            <MyGap jarak={20} />
            {!loading && <MyButton onPress={sendServer} title="SIMPAN" warna={colors.primary} Icons="person-add" />}

            {loading && <ActivityIndicator size="large" color={colors.primary} />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})