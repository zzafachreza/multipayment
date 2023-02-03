import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, fonts, windowWidth } from '../../utils'
import { MyButton, MyGap } from '../../components'
import { useIsFocused } from '@react-navigation/native';
export default function STentang({ navigation }) {

    const [open, setOpen] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {

        if (isFocused) {
            let today = new Date();
            const hari = today.getDay();
            const jam = today.getHours();

            console.log(hari + ' - ' + jam)

            if (hari == 1 && jam >= 8 && jam <= 14) {
                setOpen(true);
            } else if (hari == 2 && jam >= 8 && jam <= 13) {
                setOpen(true);
            } else if (hari == 3 && jam >= 8 && jam <= 13) {
                setOpen(true);
            } else if (hari == 4 && jam >= 8 && jam <= 13) {
                setOpen(true);
            } else if (hari == 5 && jam >= 8 && jam <= 13) {
                setOpen(true);
            } else if (hari == 6 && jam >= 8 && jam < 12) {
                setOpen(true);
            } else if (hari == 7 && jam >= 8 && jam < 12) {
                setOpen(true);
            }
        }

    }, [isFocused])

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white,
            justifyContent: 'center',
            paddingTop: 10,
            paddingHorizontal: windowWidth / 10
        }}>

            <Text style={{
                fontFamily: fonts.secondary[400],
                fontSize: windowWidth / 25,
                textAlign: 'center'
            }}>
                Untuk konsultasi gigi silahkan klik dibawah ini:
            </Text>
            <Text style={{
                marginVertical: 20,
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 10,
                textAlign: 'center'
            }}>0812-8897-0209
            </Text>

            <MyButton onPress={() => Linking.openURL(`https://wa.me/6281288970209`)} Icons="logo-whatsapp" warna={colors.success} title="Whatsapp" />

            <MyGap jarak={20} />
            <Text style={{
                fontFamily: fonts.secondary[400],
                fontSize: windowWidth / 25,
                marginBottom: 10,
                textAlign: 'center'
            }}>
                Untuk pendaftaran online silahkan isi formulir dibawah ini:
            </Text>

            <MyButton onPress={() => open ? navigation.navigate('SDaftar') : Alert.alert('Pak Ebing', 'Mohon maaf pendaftaran gigi online melalui Pak Ebing sudah tutup. Silahkan daftar di hari dan jam pelayanan berikutnya.terima kasih')} Icons="create" warna={open ? colors.primary : colors.border} title="Pendaftaran Gigi Online" />
        </View >
    )
}

const styles = StyleSheet.create({})