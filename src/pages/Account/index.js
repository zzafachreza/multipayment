import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

export default function ({ navigation, route }) {
    const [user, setUser] = useState({});
    const [com, setCom] = useState({});
    const isFocused = useIsFocused();
    const [wa, setWA] = useState('');
    const [open, setOpen] = useState(false);



    useEffect(() => {


        if (isFocused) {
            getData('user').then(res => {

                setOpen(true);
                setUser(res);

            });
        }




    }, [isFocused]);

    const btnKeluar = () => {
        Alert.alert(MYAPP, 'Apakah kamu yakin akan keluar ?', [
            {
                text: 'Batal',
                style: "cancel"
            },
            {
                text: 'Keluar',
                onPress: () => {
                    storeData('user', null);

                    navigation.replace('Login');
                }
            }
        ])
    };

    const MyList = ({ label, value }) => {
        return (
            <View
                style={{
                    marginVertical: 3,
                    padding: 5,
                    backgroundColor: colors.white,
                    borderRadius: 5,
                }}>
                <Text
                    style={{
                        fontFamily: fonts.secondary[600],
                        color: colors.black,
                    }}>
                    {label}
                </Text>
                <Text
                    style={{
                        fontFamily: fonts.secondary[400],
                        color: colors.primary,
                    }}>
                    {value}
                </Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 10
        }}>

            {!open && <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>}

            {open && <>


                {/* data detail */}
                <View style={{ padding: 10, flex: 1 }}>

                    <View style={{
                        marginVertical: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                        }} source={{
                            uri: user.foto_user,
                        }} />
                    </View>
                    {user.level == 'Member' && <MyList label="ID member" value={user.id_user} />}
                    {user.level == 'Sales' && <MyList label="ID Sales" value={user.id_user} />}

                    {user.level == 'Member' && <MyList label="ID Sales" value={user.fid_sales} />}
                    <MyList label="Nama Lengkap / Nama Toko" value={user.nama_lengkap} />
                    <MyList label="Telepon / Whatsapp" value={user.telepon} />
                    <MyList label="Level" value={user.level} />

                </View>
                <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-around' }}>

                    <View style={{
                        flex: 1,
                        margin: 5
                    }}>
                        <MyButton
                            onPress={() => navigation.navigate('AccountEdit', user)}
                            title="Edit Profile"
                            colorText={colors.white}
                            iconColor={colors.white}
                            warna={colors.primary}
                            Icons="log-out-outline"
                        />
                    </View>
                    <View style={{
                        flex: 1,
                        margin: 5
                    }}>
                        <MyButton
                            onPress={btnKeluar}
                            title="Keluar"
                            colorText={colors.white}
                            iconColor={colors.white}
                            warna={colors.black}
                            Icons="log-out-outline"
                        />
                    </View>

                </View>
            </>}
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({});
