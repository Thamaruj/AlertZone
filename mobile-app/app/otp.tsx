import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  StatusBar, KeyboardAvoidingView, Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

const BackIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default function OTPScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isComplete = otp.every((d) => d !== '');

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <LinearGradient colors={['#0D1F2D', '#0A1820', '#071318']} style={StyleSheet.absoluteFillObject} />

      <View style={styles.container}>
        {/* Back */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <BackIcon />
        </TouchableOpacity>

        {/* Icon */}
        <View style={styles.iconCircle}>
          <Text style={styles.iconEmoji}>📩</Text>
        </View>

        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>
          We've sent a 4-digit code to your{'\n'}email/phone. Enter it below.
        </Text>

        {/* OTP boxes */}
        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => { inputRefs.current[index] = ref; }}
              style={[styles.otpBox, digit !== '' && styles.otpBoxFilled]}
              value={digit}
              onChangeText={(text) => handleChange(text.slice(-1), index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectionColor="#4ECDC4"
            />
          ))}
        </View>

        {/* Timer + Resend */}
        <View style={styles.resendRow}>
          {timer > 0 ? (
            <Text style={styles.timerText}>
              Resend code in <Text style={styles.timerCount}>00:{timer < 10 ? `0${timer}` : timer}</Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={() => setTimer(60)}>
              <Text style={styles.resendLink}>Resend OTP Code</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Verify button */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.verifyBtn, !isComplete && styles.verifyBtnDisabled]}
          onPress={() => isComplete && router.push('/newpassword')}
        >
          <LinearGradient
            colors={isComplete ? ['#00D4FF', '#00B8D9'] : ['#1a2f3d', '#1a2f3d']}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.verifyBtnGradient}
          >
            <Text style={[styles.verifyBtnText, !isComplete && styles.verifyBtnTextDisabled]}>
              Verify Code
            </Text>
          </LinearGradient>
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
  iconEmoji: { fontSize: 36 },
  title: { fontSize: 26, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.45)', textAlign: 'center', lineHeight: 22, marginBottom: 40 },
  otpRow: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginBottom: 24 },
  otpBox: { width: 60, height: 64, borderRadius: 14, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.07)', textAlign: 'center', fontSize: 24, fontWeight: '800', color: '#FFFFFF' },
  otpBoxFilled: { borderColor: '#4ECDC4', backgroundColor: 'rgba(78,205,196,0.1)' },
  resendRow: { alignItems: 'center', marginBottom: 32 },
  timerText: { color: 'rgba(255,255,255,0.45)', fontSize: 13 },
  timerCount: { color: '#4ECDC4', fontWeight: '700' },
  resendLink: { color: '#4ECDC4', fontSize: 14, fontWeight: '700' },
  verifyBtn: { width: '100%', borderRadius: 30, overflow: 'hidden', shadowColor: '#00D4FF', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 14, elevation: 10 },
  verifyBtnDisabled: { shadowOpacity: 0 },
  verifyBtnGradient: { paddingVertical: 16, alignItems: 'center', borderRadius: 30 },
  verifyBtnText: { color: '#071318', fontSize: 17, fontWeight: '800' },
  verifyBtnTextDisabled: { color: 'rgba(255,255,255,0.3)' },
});