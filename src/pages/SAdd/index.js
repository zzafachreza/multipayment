import { Alert, StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import DatePicker from 'react-native-datepicker'
import { maskJs, maskCurrency } from 'mask-js';
export default function SAdd({ navigation, route }) {

    const [loading, setLoading] = useState(false);

    const [kirim, setKirim] = useState({
        region: '',
        pt: '',
        nomor_kk: '',
        kepala_keluarga: '',
        tipe_rumah: '',
        blok_rumah: '',
        nomor_rumah: '',
        nik_karyawan: '',
        nomor_ktp: '',
        nama_anggota_keluarga: '',
        jenis_kelamin: 'L',
        status_hubungan_keluarga: '',
        status_perkawinan: 'Kawin',
        akta_lahir: 'Ada',
        alamat_ktp: '',
        alamat_sekarang: '',
        tempat_lahir: '',
        tanggal_lahir: '01/01/2000',
        usia: '',
        agama: 'Islam',
        suku: '',
        pendidikan_terakhir: '',
        jenjang_pendidikan: '',
        nama_sekolah: '',
        jenis_sekolah: '',
        alasan_anak_tidak_sekolah: '',
        status_pekerjaan: '',
        status_tinggal: '',
        alamat_asal_pengunjung: '',
        keterangan: '',

    });


    // setLoading(false);

    const sendServer = () => {
        console.log(kirim);
        // setLoading(true);

        axios.post(apiURL + 'insert_penduduk', kirim).then(res => {
            console.log(res.data);
            if (res.data == 200) {
                Alert.alert('Sensus Warga', 'Data berhasil di simpan !');
                navigation.goBack();
            }
        })
    }

    const [region, setRegion] = useState([]);

    useEffect(() => {

        axios.post(apiURL + 'region').then(res => {
            console.log(res.data);
            setRegion(res.data);
            setKirim({
                ...kirim,
                region: res.data[0].value
            })
        })

    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>


            <ScrollView showsVerticalScrollIndicator={false}>
                <MyPicker iconname="list" onValueChange={x => setKirim({ ...kirim, region: x })} label="Region" data={region} />

                <MyInput iconname='create' label='PT' onChangeText={x => { setKirim({ ...kirim, pt: x }) }} />
                <MyInput iconname='create' keyboardType='number-pad' label='No KK*' onChangeText={x => { setKirim({ ...kirim, nomor_kk: x }) }} />
                <MyInput iconname='create' label='Nama Kepala Keluarga' onChangeText={x => { setKirim({ ...kirim, kepala_keluarga: x }) }} />
                <MyInput iconname='create' label='Type*' onChangeText={x => { setKirim({ ...kirim, tipe_rumah: x }) }} />

                <MyInput iconname='create' label='Blok*' onChangeText={x => { setKirim({ ...kirim, blok_rumah: x }) }} />
                <MyInput iconname='create' label='No. Rumah*' onChangeText={x => { setKirim({ ...kirim, nomor_rumah: x }) }} />
                <MyInput iconname='create' label='NIK Karyawan' onChangeText={x => { setKirim({ ...kirim, nik_karyawan: x }) }} />
                <MyInput iconname='create' keyboardType='number-pad' label='No KTP*' onChangeText={x => { setKirim({ ...kirim, nomor_ktp: x }) }} />
                <MyInput iconname='create' label='Nama Anggota Keluarga*' onChangeText={x => { setKirim({ ...kirim, nama_anggota_keluarga: x }) }} />
                <MyPicker iconname="list" onValueChange={x => setKirim({ ...kirim, jenis_kelamin: x })} label="L/P*" data={[
                    { label: 'L', value: 'L', },
                    { label: 'P', value: 'P', },
                ]} />
                <MyInput iconname='create' label='Status Hubungan dalam Keluarga*' onChangeText={x => { setKirim({ ...kirim, status_hubungan_keluarga: x }) }} />


                <MyPicker iconname="list" onValueChange={x => setKirim({ ...kirim, status_perkawinan: x })} label="Status Perkawinan" data={[
                    { label: 'Kawin', value: 'Kawin', },
                    { label: 'Tidak Kawin', value: 'Tidak Kawin', },
                ]} />

                <MyPicker iconname="list" onValueChange={x => setKirim({ ...kirim, akta_lahir: x })} label="Akta Lahir" data={[
                    { label: 'Ada', value: 'Ada', },
                    { label: 'Tidak', value: 'Tidak', },
                ]} />



                <MyInput iconname='create' label='Alamat tinggal Sesuai KTP' onChangeText={x => { setKirim({ ...kirim, alamat_ktp: x }) }} />
                <MyInput iconname='create' label='Alamat Sekarang' onChangeText={x => { setKirim({ ...kirim, alamat_sekarang: x }) }} />
                <MyInput iconname='create' label='Tempat Lahir' onChangeText={x => { setKirim({ ...kirim, tempat_lahir: x }) }} />

                <MyInput value={kirim.tanggal_lahir} keyboardType='number-pad' maxLength={10} iconname='create' label='Tanggal lahir* contoh : 29/04/1995' onChangeText={x => {
                    // console.log()
                    setKirim({
                        ...kirim,

                        tanggal_lahir: maskJs('99/99/9999', x)

                    })
                }} />


                <MyInput iconname='create' keyboardType='number-pad' label='Usia' onChangeText={x => { setKirim({ ...kirim, usia: x }) }} />


                <MyPicker iconname="list" onValueChange={x => setKirim({ ...kirim, agama: x })} label="Agama" data={[
                    { label: 'Islam', value: 'Islam', },
                    { label: 'Katholik', value: 'Katholik', },
                    { label: 'Kristen', value: 'Kristen', },
                    { label: 'Hindu', value: 'Hindu', },
                    { label: 'Budha', value: 'Budha', },

                ]} />



                <MyInput iconname='create' label='Suku' onChangeText={x => { setKirim({ ...kirim, suku: x }) }} />
                <MyInput iconname='create' label='Pendidikan Terakhir yang ditamatkan*' onChangeText={x => { setKirim({ ...kirim, pendidikan_terakhir: x }) }} />
                <MyInput iconname='create' label='Jenjang Pendidikan' onChangeText={x => { setKirim({ ...kirim, jenjang_pendidikan: x }) }} />
                <MyInput iconname='create' label='Nama Sekolah' onChangeText={x => { setKirim({ ...kirim, nama_sekolah: x }) }} />
                <MyInput iconname='create' label='Jenis Sekolah' onChangeText={x => { setKirim({ ...kirim, jenis_sekolah: x }) }} />
                <MyInput iconname='create' label='Alasan Jika Anak Tidak Sekolah' onChangeText={x => { setKirim({ ...kirim, alasan_anak_tidak_sekolah: x }) }} />
                <MyInput iconname='create' label='Status Pekerjaan*' onChangeText={x => { setKirim({ ...kirim, status_pekerjaan: x }) }} />
                <MyInput iconname='create' label='Status Tinggal*' onChangeText={x => { setKirim({ ...kirim, status_tinggal: x }) }} />
                <MyInput iconname='create' label='Alamat Asal Pengunjung' onChangeText={x => { setKirim({ ...kirim, alamat_asal_pengunjung: x }) }} />
                <MyInput iconname='create' label='Ket' onChangeText={x => { setKirim({ ...kirim, keterangan: x }) }} />

            </ScrollView>

            <MyGap jarak={20} />
            {!loading && <MyButton onPress={sendServer} title="SIMPAN" warna={colors.primary} Icons="person-add" />}

            {loading && <ActivityIndicator size="large" color={colors.primary} />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})