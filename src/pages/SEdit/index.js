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
export default function SEdit({ navigation, route }) {



    const [loading, setLoading] = useState(false);

    const [kirim, setKirim] = useState({
        id_penduduk: route.params.id_penduduk,
        region: route.params.region,
        pt: route.params.pt,
        nomor_kk: route.params.nomor_kk,
        kepala_keluarga: route.params.kepala_keluarga,
        tipe_rumah: route.params.tipe_rumah,
        blok_rumah: route.params.blok_rumah,
        nomor_rumah: route.params.nomor_rumah,
        nik_karyawan: route.params.nik_karyawan,
        nomor_ktp: route.params.nomor_ktp,
        nama_anggota_keluarga: route.params.nama_anggota_keluarga,
        jenis_kelamin: route.params.jenis_kelamin,
        status_hubungan_keluarga: route.params.status_hubungan_keluarga,
        status_perkawinan: route.params.status_perkawinan,
        akta_lahir: route.params.akta_lahir,
        alamat_ktp: route.params.alamat_ktp,
        alamat_sekarang: route.params.alamat_sekarang,
        tempat_lahir: route.params.tempat_lahir,
        tanggal_lahir: route.params.tanggal_lahir,
        usia: route.params.usia,
        agama: route.params.agama,
        suku: route.params.suku,
        pendidikan_terakhir: route.params.pendidikan_terakhir,
        jenjang_pendidikan: route.params.jenjang_pendidikan,
        nama_sekolah: route.params.nama_sekolah,
        jenis_sekolah: route.params.jenis_sekolah,
        alasan_anak_tidak_sekolah: route.params.alasan_anak_tidak_sekolah,
        status_pekerjaan: route.params.status_pekerjaan,
        status_tinggal: route.params.status_tinggal,
        alamat_asal_pengunjung: route.params.alamat_asal_pengunjung,
        keterangan: route.params.keterangan,

    });


    // setLoading(false);

    const sendServer = () => {
        console.log(kirim);
        setLoading(true);

        axios.post(apiURL + 'update_penduduk', kirim).then(res => {
            setLoading(false);
            console.log(res.data);
            if (res.data == 200) {
                Alert.alert('Sensus Warga', 'Data berhasil di simpan !');
                navigation.goBack()
            }
        })
    }

    const [open, setOpen] = useState(false);
    const [region, setRegion] = useState([]);

    useEffect(() => {

        axios.post(apiURL + 'region').then(res => {
            console.log(res.data);
            setRegion(res.data);
            setKirim({
                ...kirim,
                region: res.data[0].value
            })
        });

        setTimeout(() => {
            setOpen(true)
        }, 500)

    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>

            {!open && <ActivityIndicator size="large" color={colors.primary} />}

            {open && <ScrollView showsVerticalScrollIndicator={false}>
                <MyPicker value={kirim.region} iconname="list" onValueChange={x => setKirim({ ...kirim, region: x })} label="Region" data={region} />

                <MyInput value={kirim.pt} iconname='create' label='PT' onChangeText={x => { setKirim({ ...kirim, pt: x }) }} />
                <MyInput value={kirim.nomor_kk} iconname='create' keyboardType='number-pad' label='No KK*' onChangeText={x => { setKirim({ ...kirim, nomor_kk: x }) }} />
                <MyInput value={kirim.kepala_keluarga} iconname='create' label='Nama Kepala Keluarga' onChangeText={x => { setKirim({ ...kirim, kepala_keluarga: x }) }} />
                <MyInput value={kirim.tipe_rumah} iconname='create' label='Type*' onChangeText={x => { setKirim({ ...kirim, tipe_rumah: x }) }} />
                <MyInput value={kirim.blok_rumah} iconname='create' label='Blok*' onChangeText={x => { setKirim({ ...kirim, blok_rumah: x }) }} />
                <MyInput value={kirim.nomor_rumah} iconname='create' label='No. Rumah*' onChangeText={x => { setKirim({ ...kirim, nomor_rumah: x }) }} />
                <MyInput value={kirim.nik_karyawan} iconname='create' label='NIK Karyawan' onChangeText={x => { setKirim({ ...kirim, nik_karyawan: x }) }} />
                <MyInput value={kirim.nomor_ktp} iconname='create' keyboardType='number-pad' label='No KTP*' onChangeText={x => { setKirim({ ...kirim, nomor_ktp: x }) }} />
                <MyInput value={kirim.nama_anggota_keluarga} iconname='create' label='Nama Anggota Keluarga*' onChangeText={x => { setKirim({ ...kirim, nama_anggota_keluarga: x }) }} />
                <MyPicker value={kirim.jenis_kelamin} iconname="list" onValueChange={x => setKirim({ ...kirim, jenis_kelamin: x })} label="L/P*" data={[
                    { label: 'L', value: 'L', },
                    { label: 'P', value: 'P', },
                ]} />
                <MyInput value={kirim.status_hubungan_keluarga} iconname='create' label='Status Hubungan dalam Keluarga*' onChangeText={x => { setKirim({ ...kirim, status_hubungan_keluarga: x }) }} />


                <MyPicker value={kirim.status_perkawinan} r iconname="list" onValueChange={x => setKirim({ ...kirim, status_perkawinan: x })} label="Status Perkawinan" data={[
                    { label: 'Kawin', value: 'Kawin', },
                    { label: 'Tidak Kawin', value: 'Tidak Kawin', },
                ]} />

                <MyPicker value={kirim.akta_lahir} iconname="list" onValueChange={x => setKirim({ ...kirim, akta_lahir: x })} label="Akta Lahir" data={[
                    { label: 'Ada', value: 'Ada', },
                    { label: 'Tidak', value: 'Tidak', },
                ]} />



                <MyInput value={kirim.alamat_ktp} iconname='create' label='Alamat tinggal Sesuai KTP' onChangeText={x => { setKirim({ ...kirim, alamat_ktp: x }) }} />
                <MyInput value={kirim.alamat_sekarang} iconname='create' label='Alamat Sekatang' onChangeText={x => { setKirim({ ...kirim, alamat_sekarang: x }) }} />
                <MyInput value={kirim.tempat_lahir} iconname='create' label='Tempat Lahir' onChangeText={x => { setKirim({ ...kirim, tempat_lahir: x }) }} />

                <MyInput value={kirim.tanggal_lahir} keyboardType='number-pad' maxLength={10} iconname='create' label='Tanggal lahir* contoh : 29/04/1995' onChangeText={x => {
                    // console.log()
                    setKirim({
                        ...kirim,

                        tanggal_lahir: maskJs('99/99/9999', x)

                    })
                }} />


                <MyInput value={kirim.usia} iconname='create' keyboardType='number-pad' label='Usia' onChangeText={x => { setKirim({ ...kirim, usia: x }) }} />
                <MyPicker value={kirim.agama} iconname="list" onValueChange={x => setKirim({ ...kirim, agama: x })} label="Agama" data={[
                    { label: 'Islam', value: 'Islam', },
                    { label: 'Katholik', value: 'Katholik', },
                    { label: 'Kristen', value: 'Kristen', },
                    { label: 'Hindu', value: 'Hindu', },
                    { label: 'Budha', value: 'Budha', },

                ]} />
                <MyInput value={kirim.suku} iconname='create' label='Suku' onChangeText={x => { setKirim({ ...kirim, suku: x }) }} />
                <MyInput value={kirim.pendidikan_terakhir} iconname='create' label='Pendidikan Terakhir yang ditamatkan*' onChangeText={x => { setKirim({ ...kirim, pendidikan_terakhir: x }) }} />
                <MyInput value={kirim.jenjang_pendidikan} iconname='create' label='Jenjang Pendidikan' onChangeText={x => { setKirim({ ...kirim, jenjang_pendidikan: x }) }} />
                <MyInput value={kirim.nama_sekolah} iconname='create' label='Nama Sekolah' onChangeText={x => { setKirim({ ...kirim, nama_sekolah: x }) }} />
                <MyInput value={kirim.jenis_sekolah} iconname='create' label='Jenis Sekolah' onChangeText={x => { setKirim({ ...kirim, jenis_sekolah: x }) }} />
                <MyInput value={kirim.alasan_anak_tidak_sekolah} iconname='create' label='Alasan Jika Anak Tidak Sekolah' onChangeText={x => { setKirim({ ...kirim, alasan_anak_tidak_sekolah: x }) }} />
                <MyInput value={kirim.status_pekerjaan} iconname='create' label='Status Pekerjaan*' onChangeText={x => { setKirim({ ...kirim, status_pekerjaan: x }) }} />
                <MyInput value={kirim.status_tinggal} iconname='create' label='Status Tinggal*' onChangeText={x => { setKirim({ ...kirim, status_tinggal: x }) }} />
                <MyInput value={kirim.alamat_asal_pengunjung} iconname='create' label='Alamat Asal Pengunjung' onChangeText={x => { setKirim({ ...kirim, alamat_asal_pengunjung: x }) }} />
                <MyInput value={kirim.keterangan} iconname='create' label='Ket' onChangeText={x => { setKirim({ ...kirim, keterangan: x }) }} />

            </ScrollView>}

            <MyGap jarak={20} />
            {!loading && <MyButton onPress={sendServer} title="SIMPAN" warna={colors.primary} Icons="person-add" />}

            {loading && <ActivityIndicator size="large" color={colors.primary} />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})