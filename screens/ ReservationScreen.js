import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Picker, Switch, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';

const ReservationScreen = () => {
    const [campers, setCampers] = useState(1);
    const [hikeIn, setHikeIn] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const campsite = { name: 'Sample Campsite' }; // Example campsite object for testing

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowCalendar(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const handleReservation = () => {
        console.log('campers:', campers);
        console.log('hikeIn:', hikeIn);
        console.log('date:', date);
        setShowModal(!showModal);
        Alert.alert(
            'Confirm Reservation',
            `Are you sure you want to reserve ${campsite.name} for ${campers} campers?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => console.log('Cancel Pressed')
                },
            ]
        );
    };

    const resetForm = () => {
        setCampers(1);
        setHikeIn(false);
        setDate(new Date());
        setShowCalendar(false);
    };

    return (
        <ScrollView>
            <Animatable.View animation='zoomIn' duration={2000} delay={1000}>
                <Text style={styles.formLabel}>Number of Campers:</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={campers}
                    onValueChange={(itemValue) => setCampers(itemValue)}
                >
                    <Picker.Item label='1' value={1} />
                    <Picker.Item label='2' value={2} />
                    <Picker.Item label='3' value={3} />
                    <Picker.Item label='4' value={4} />
                    <Picker.Item label='5' value={5} />
                    <Picker.Item label='6' value={6} />
                </Picker>
            </Animatable.View>
            <Animatable.View style={styles.formRow}>
                <Text style={styles.formLabel}>Hike In?</Text>
                <Switch
                    style={styles.formItem}
                    value={hikeIn}
                    trackColor={{ true: '#5637DD', false: null }}
                    onValueChange={(value) => setHikeIn(value)}
                />
            </Animatable.View>
            <Animatable.View style={styles.formRow}>
                <Text style={styles.formLabel}>Date:</Text>
                <Button
                    onPress={() => setShowCalendar(!showCalendar)}
                    title={date.toLocaleDateString('en-US')}
                    color='#5637DD'
                    accessibilityLabel='Tap me to select a reservation date'
                />
            </Animatable.View>
            {showCalendar && (
                <DateTimePicker
                    style={styles.formItem}
                    value={date}
                    mode='date'
                    display='default'
                    onChange={onDateChange}
                />
            )}
            <Animatable.View style={styles.formRow}>
                <Button
                    onPress={() => handleReservation()}
                    title='Search Availability'
                    color='#5637DD'
                    accessibilityLabel='Tap me to search for available campsites to reserve'
                />
            </Animatable.View>
            {/* Modal Section (Uncomment if you want to use the modal)
            <Modal
                animationType='slide'
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(!showModal)}
            >
                <Animatable.View style={styles.modal}>
                    <Text style={styles.modalTitle}>
                        Search Campsite Reservations
                    </Text>
                    <Text style={styles.modalText}>
                        Number of Campers: {campers}
                    </Text>
                    <Text style={styles.modalText}>
                        Hike-In?: {hikeIn ? 'Yes' : 'No'}
                    </Text>
                    <Text style={styles.modalText}>
                        Date: {date.toLocaleDateString('en-US')}
                    </Text>
                    <Button
                        onPress={() => {
                            setShowModal(!showModal);
                            resetForm();
                        }}
                        color='#5637DD'
                        title='Close'
                    />
                </Animatable.View>
            </Modal>
            */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    // modal: {
    //     justifyContent: 'center',
    //     margin: 20
    // },
    // modalTitle: {
    //     fontSize: 24,
    //     fontWeight: 'bold',
    //     backgroundColor: '#5637DD',
    //     textAlign: 'center',
    //     color: '#fff',
    //     marginBottom: 20
    // },
    // modalText: {
    //     fontSize: 18,
    //     margin: 10
    // }
});

export default ReservationScreen;
