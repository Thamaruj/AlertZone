import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  StatusBar, KeyboardAvoidingView, Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Svg, { Path, Circle, Rect, Line } from 'react-native-svg';

const BackIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const LockIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Rect x="5" y="11" width="14" height="10" rx="2" stroke="#4ECDC4" strokeWidth="1.8" />
    <Path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="#4ECDC4" strokeWidth="1.8" strokeLinecap="round" />
    <Circle cx="12" cy="16" r="1.5" fill="#4ECDC4" />
  </Svg>
);

const EyeIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#4ECDC4" strokeWidth="1.8" />
    <Circle cx="12" cy="12" r="3" stroke="#4ECDC4" strokeWidth="1.8" />
  </Svg>
);

const EyeOffIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke="#4ECDC4" strokeWidth="1.8" strokeLinecap="round" />
    <Path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="#4ECDC4" strokeWidth="1.8" strokeLinecap="round" />
    <Path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" stroke="#4ECDC4" strokeWidth="1.8" strokeLinecap="round" />
    <Line x1="1" y1="1" x2="23" y2="23" stroke="#4ECDC4" strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

export default function NewPasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const isMatch = password !== '' && password === confirmPassword;
  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthColor = ['transparent', '#FF4444', '#FBBC05', '#34A853'][strength];
  const strengthLabel = ['', 'Weak', 'Medium', 'Strong'][strength];

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
          <Svg width={40} height={40} viewBox="0 0 24 24" fill="none">
            <Rect x="5" y="11" width="14" height="10" rx="2" stroke="#4ECDC4" strokeWidth="1.8" />
            <Path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="#4ECDC4" strokeWidth="1.8" strokeLinecap="round" />
            <Circle cx="12" cy="16" r="1.5" fill="#4ECDC4" />
          </Svg>
        </View>

        <Text style={styles.title}>New Password</Text>
        <Text style={styles.subtitle}>
          Create a strong password to{'\n'}secure your account.
        </Text>

        <View style={styles.form}>

          {/* New Password */}
          <View style={styles.inputWrapper}>
            <View style={styles.iconBox}><LockIcon /></View>
            <View style={styles.inputInner}>
              <Text style={styles.inputLabel}>New Password:</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••••••••"
                placeholderTextColor="rgba(255,255,255,0.3)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                selectionColor="#4ECDC4"
              />
            </View>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </TouchableOpacity>
          </View>

          {/* Strength bar */}
          {password.length > 0 && (
            <View style={styles.strengthContainer}>
              <View style={styles.strengthBars}>
                {[1, 2, 3].map((level) => (
                  <View
                    key={level}
                    style={[styles.strengthBar, { backgroundColor: strength >= level ? strengthColor : 'rgba(255,255,255,0.1)' }]}
                  />
                ))}
              </View>
              <Text style={[styles.strengthLabel, { color: strengthColor }]}>{strengthLabel}</Text>
            </View>
          )}

          {/* Confirm Password */}
          <View style={styles.inputWrapper}>
            <View style={styles.iconBox}><LockIcon /></View>
            <View style={styles.inputInner}>
              <Text style={styles.inputLabel}>Confirm Password:</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••••••••"
                placeholderTextColor="rgba(255,255,255,0.3)"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirm}
                selectionColor="#4ECDC4"
              />
            </View>
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.eyeBtn}>
              {showConfirm ? <EyeIcon /> : <EyeOffIcon />}
            </TouchableOpacity>
          </View>

          {/* Match message */}
          {confirmPassword.length > 0 && (
            <Text style={[styles.matchText, { color: isMatch ? '#34A853' : '#FF4444' }]}>
              {isMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
            </Text>
          )}

          {/* Reset button */}
          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.resetBtn, !isMatch && styles.resetBtnDisabled]}
            onPress={() => isMatch && router.push('/screens/login')}
          >
            <LinearGradient
              colors={isMatch ? ['#00D4FF', '#00B8D9'] : ['#1a2f3d', '#1a2f3d']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.resetBtnGradient}
            >
              <Text style={[styles.resetBtnText, !isMatch && styles.resetBtnTextDisabled]}>
                Reset Password
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
  form: { width: '100%', gap: 14 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 14, paddingVertical: 12, gap: 12 },
  iconBox: { width: 28, alignItems: 'center', justifyContent: 'center' },
  inputInner: { flex: 1 },
  inputLabel: { fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 2 },
  input: { fontSize: 14, color: '#FFFFFF', padding: 0, margin: 0 },
  eyeBtn: { padding: 4, width: 32, alignItems: 'center', justifyContent: 'center' },
  strengthContainer: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: -4 },
  strengthBars: { flexDirection: 'row', gap: 6, flex: 1 },
  strengthBar: { flex: 1, height: 4, borderRadius: 2 },
  strengthLabel: { fontSize: 12, fontWeight: '600', minWidth: 50 },
  matchText: { fontSize: 12, fontWeight: '600', marginTop: -4 },
  resetBtn: { width: '100%', borderRadius: 30, overflow: 'hidden', marginTop: 8, shadowColor: '#00D4FF', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 14, elevation: 10 },
  resetBtnDisabled: { shadowOpacity: 0 },
  resetBtnGradient: { paddingVertical: 16, alignItems: 'center', borderRadius: 30 },
  resetBtnText: { color: '#071318', fontSize: 17, fontWeight: '800' },
  resetBtnTextDisabled: { color: 'rgba(255,255,255,0.3)' },
});