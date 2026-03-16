import React, { useState } from 'react';
import { Stack } from 'expo-router';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  StatusBar, KeyboardAvoidingView, Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

const BackIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const EmailIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Rect x="2" y="4" width="20" height="16" rx="2" stroke="#4ECDC4" strokeWidth="1.8" />
    <Path d="M2 7l10 7 10-7" stroke="#4ECDC4" strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

const PhoneIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.37 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 3.1 4.18 2 2 0 0 1 5.08 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="#4ECDC4" strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [value, setValue] = useState('');

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <LinearGradient colors={['#0D1F2D', '#0A1820', '#071318']} style={StyleSheet.absoluteFillObject} />

      <View style={styles.container}>
        {/* Back button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <BackIcon />
        </TouchableOpacity>

        {/* Lock icon big */}
        <View style={styles.iconCircle}>
          <Svg width={40} height={40} viewBox="0 0 24 24" fill="none">
            <Rect x="5" y="11" width="14" height="10" rx="2" stroke="#4ECDC4" strokeWidth="1.8" />
            <Path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="#4ECDC4" strokeWidth="1.8" strokeLinecap="round" />
            <Circle cx="12" cy="16" r="1.5" fill="#4ECDC4" />
          </Svg>
        </View>

        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          Enter your email or phone number and{'\n'}we'll send you a verification code.
        </Text>

        {/* Toggle Email / Phone */}
        <View style={styles.toggle}>
          <TouchableOpacity
            style={[styles.toggleBtn, method === 'email' && styles.toggleBtnActive]}
            onPress={() => { setMethod('email'); setValue(''); }}
          >
            <Text style={[styles.toggleText, method === 'email' && styles.toggleTextActive]}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, method === 'phone' && styles.toggleBtnActive]}
            onPress={() => { setMethod('phone'); setValue(''); }}
          >
            <Text style={[styles.toggleText, method === 'phone' && styles.toggleTextActive]}>Phone</Text>
          </TouchableOpacity>
        </View>

        {/* Input */}
        <View style={styles.inputWrapper}>
          <View style={styles.iconBox}>
            {method === 'email' ? <EmailIcon /> : <PhoneIcon />}
          </View>
          <View style={styles.inputInner}>
            <Text style={styles.inputLabel}>{method === 'email' ? 'E-mail:' : 'Phone Number:'}</Text>
            <TextInput
              style={styles.input}
              placeholder={method === 'email' ? 'James123@gmail.com' : '+1 234 567 8900'}
              placeholderTextColor="rgba(255,255,255,0.3)"
              value={value}
              onChangeText={setValue}
              keyboardType={method === 'email' ? 'email-address' : 'phone-pad'}
              autoCapitalize="none"
              selectionColor="#4ECDC4"
            />
          </View>
        </View>

        {/* Send OTP button */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.sendBtn}
          onPress={() => router.push('/otp')}
        >
          <LinearGradient colors={['#00D4FF', '#00B8D9']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.sendBtnGradient}>
            <Text style={styles.sendBtnText}>Send OTP Code</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Back to login */}
        <TouchableOpacity onPress={() => router.push('/screens/login')} style={styles.backToLogin}>
          <Text style={styles.backToLoginText}>
            Remember password? <Text style={styles.backToLoginLink}>Log In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 28, paddingTop: 60 },
  backBtn: { width: 42, height: 42, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.07)', alignItems: 'center', justifyContent: 'center', marginBottom: 36 },
  iconCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(78,205,196,0.12)', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 24, borderWidth: 1, borderColor: 'rgba(78,205,196,0.25)' },
  title: { fontSize: 26, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.45)', textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  toggle: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: 4, marginBottom: 20 },
  toggleBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  toggleBtnActive: { backgroundColor: '#4ECDC4' },
  toggleText: { color: 'rgba(255,255,255,0.45)', fontSize: 14, fontWeight: '600' },
  toggleTextActive: { color: '#071318', fontWeight: '700' },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 14, paddingVertical: 12, gap: 12, marginBottom: 20 },
  iconBox: { width: 28, alignItems: 'center', justifyContent: 'center' },
  inputInner: { flex: 1 },
  inputLabel: { fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 2 },
  input: { fontSize: 14, color: '#FFFFFF', padding: 0, margin: 0 },
  sendBtn: { width: '100%', borderRadius: 30, overflow: 'hidden', shadowColor: '#00D4FF', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 14, elevation: 10 },
  sendBtnGradient: { paddingVertical: 16, alignItems: 'center', borderRadius: 30 },
  sendBtnText: { color: '#071318', fontSize: 17, fontWeight: '800' },
  backToLogin: { marginTop: 24, alignItems: 'center' },
  backToLoginText: { color: 'rgba(255,255,255,0.5)', fontSize: 13 },
  backToLoginLink: { color: '#4ECDC4', fontWeight: '700' },
});