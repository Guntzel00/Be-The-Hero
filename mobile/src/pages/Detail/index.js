import React from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  Linking,
  ScrollView
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import logoimg from '../../assets/logo.png';
import * as MailComposer from 'expo-mail-composer';
import styles from './styles';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;
  const message = `Hello ${incident.name},  I am entering in contact because I would like to help with the case "${incident.title}"`;

  const navigationBack = () => {
    navigation.goBack();
  };

  const sendMail = () => {
    MailComposer.composeAsync({
      subject: 'Food for village',
      recipients: [incident.email],
      body: message
    });
  };
  const sendWhatsapp = () => {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${message}`
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoimg} />
        <TouchableOpacity onPress={navigationBack}>
          <Feather name="arrow-left" size={28} color="#E02041"></Feather>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.incident}>
          <Text style={(styles.incidentProperty, { marginTop: 0 })}>NGO:</Text>
          <Text style={styles.incidentValue}>
            {incident.name} from {incident.city}, {incident.pa}
          </Text>

          <Text style={styles.incidentProperty}>CASE:</Text>
          <Text style={styles.incidentValue}>{incident.title}</Text>

          <Text style={styles.incidentProperty}>Description:</Text>
          <Text style={styles.incidentValue}>{incident.description}</Text>

          <Text style={styles.incidentProperty}>VALUE:</Text>
          <Text style={styles.incidentValue}>
            {Intl.NumberFormat('en-CA', {
              style: 'currency',
              currency: 'CAD'
            }).format(incident.value)}
          </Text>
        </View>

        <View style={styles.contactBox}>
          <Text style={styles.heroTitle}>Save the day!</Text>
          <Text style={styles.heroTitle}>Be the hero of this case.</Text>

          <Text style={styles.heroDescription}>Contact NGO:</Text>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
              <Text style={styles.actionText}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action} onPress={sendMail}>
              <Text style={styles.actionText}>E-mail</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
