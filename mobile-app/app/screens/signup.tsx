import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  Image, StatusBar, ScrollView, KeyboardAvoidingView,
  Platform, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Svg, { Path, Circle, Rect, Line } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ── Icons ──────────────────────────────────────────────
const EmailIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Rect x="2" y="4" width="20" height="16" rx="2" stroke="#4ECDC4" strokeWidth="1.8" />
    <Path d="M2 7l10 7 10-7" stroke="#4ECDC4" strokeWidth="1.8" strokeLinecap="round" />
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
const GoogleIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 48 48">
    <Path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.85l6.08-6.08C34.46 3.05 29.5 1 24 1 14.82 1 7.07 6.48 3.64 14.22l7.08 5.5C12.4 13.72 17.74 9.5 24 9.5z" />
    <Path fill="#4285F4" d="M46.1 24.5c0-1.64-.15-3.22-.42-4.75H24v9h12.42c-.54 2.9-2.18 5.36-4.65 7.02l7.18 5.57C42.93 37.27 46.1 31.36 46.1 24.5z" />
    <Path fill="#FBBC05" d="M10.72 28.28A14.6 14.6 0 0 1 9.5 24c0-1.49.26-2.93.72-4.28l-7.08-5.5A23.9 23.9 0 0 0 0 24c0 3.86.92 7.5 2.55 10.72l8.17-6.44z" />
    <Path fill="#34A853" d="M24 47c5.5 0 10.12-1.82 13.5-4.93l-7.18-5.57c-1.8 1.22-4.1 1.95-6.32 1.95-6.26 0-11.6-4.22-13.28-9.9l-8.17 6.44C7.07 41.52 14.82 47 24 47z" />
  </Svg>
);

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail]                     = useState('');
  const [password, setPassword]               = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword]       = useState(false);
  const [showConfirm, setShowConfirm]         = useState(false);
  const [agreed, setAgreed]                   = useState(false);

  const [emailError, setEmailError]       = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError]   = useState('');
  const [agreeError, setAgreeError]       = useState('');

  const validateEmail = (val: string) => /\S+@\S+\.\S+/.test(val);

  const handleSignUp = async () => {
    // Clear all errors first
    setEmailError('');
    setPasswordError('');
    setConfirmError('');
    setAgreeError('');

    let hasError = false;

    // ── Validate email ──
    if (!email.trim()) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validateEmail(email.trim())) {
      setEmailError('Enter a valid email address');
      hasError = true;
    }

    // ── Validate password ──
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      hasError = true;
    }

    // ── Validate confirm password ──
    // ✅ FIX: compare trimmed values correctly
    if (!confirmPassword) {
      setConfirmError('Please confirm your password');
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmError('Passwords do not match');
      hasError = true;
    }

    // ── Validate terms ──
    if (!agreed) {
      setAgreeError('You must agree to the Terms of Services');
      hasError = true;
    }

    if (hasError) return;

    // ✅ Save credentials to device storage
    try {
      await AsyncStorage.setItem('registered_email', email.trim().toLowerCase());
      await AsyncStorage.setItem('registered_password', password);

      // ✅ Show success message then go to login
      Alert.alert(
        '🎉 Account Created Successfully!',
        `Welcome to AlertZone!\n\nYou can now log in with:\n📧 ${email.trim()}`,
        [{
          text: 'Go to Login',
          onPress: () => router.replace('/screens/login'),
        }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save account. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <LinearGradient
        colors={['#0D1F2D', '#0A1820', '#071318']}
        style={StyleSheet.absoluteFillObject}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Image source={require('../../assets/images/logo1_1.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Get started with AlertZone.</Text>

        <View style={styles.form}>

          {/* ── Email ── */}
          <View style={[styles.inputWrapper, emailError ? styles.inputError : null]}>
            <View style={styles.iconBox}><EmailIcon /></View>
            <View style={styles.inputInner}>
              <Text style={styles.inputLabel}>E-mail:</Text>
              <TextInput
                style={styles.input}
                placeholder="James123@gmail.com"
                placeholderTextColor="rgba(255,255,255,0.3)"
                value={email}
                onChangeText={(t) => { setEmail(t); setEmailError(''); }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                selectionColor="#4ECDC4"
                // ✅ Fixes yellow iOS autofill
                textContentType="emailAddress"
                autoComplete="email"
              />
            </View>
          </View>
          {emailError !== '' && <Text style={styles.fieldError}>⚠ {emailError}</Text>}

          {/* ── Password ── */}
          <View style={[styles.inputWrapper, passwordError ? styles.inputError : null]}>
            <View style={styles.iconBox}><LockIcon /></View>
            <View style={styles.inputInner}>
              <Text style={styles.inputLabel}>Password:</Text>
              <TextInput
                style={styles.input}
                placeholder="xxxxxxxxxxxxxx"
                placeholderTextColor="rgba(255,255,255,0.3)"
                value={password}
                onChangeText={(t) => { setPassword(t); setPasswordError(''); setConfirmError(''); }}
                secureTextEntry={!showPassword}
                selectionColor="#4ECDC4"
                // ✅ Fixes yellow iOS autofill on password
                textContentType="newPassword"
                autoComplete="new-password"
                autoCorrect={false}
              />
            </View>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </TouchableOpacity>
          </View>
          {passwordError !== '' && <Text style={styles.fieldError}>⚠ {passwordError}</Text>}

          {/* ── Confirm Password ── */}
          <View style={[styles.inputWrapper, confirmError ? styles.inputError : null]}>
            <View style={styles.iconBox}><LockIcon /></View>
            <View style={styles.inputInner}>
              <Text style={styles.inputLabel}>Confirm Password:</Text>
              <TextInput
                style={styles.input}
                placeholder="xxxxxxxxxxxxxx"
                placeholderTextColor="rgba(255,255,255,0.3)"
                value={confirmPassword}
                onChangeText={(t) => { setConfirmPassword(t); setConfirmError(''); }}
                secureTextEntry={!showConfirm}
                selectionColor="#4ECDC4"
                // ✅ Fixes yellow iOS autofill on confirm password
                textContentType="newPassword"
                autoComplete="new-password"
                autoCorrect={false}
              />
            </View>
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)} style={styles.eyeBtn}>
              {showConfirm ? <EyeIcon /> : <EyeOffIcon />}
            </TouchableOpacity>
          </View>
          {confirmError !== '' && <Text style={styles.fieldError}>⚠ {confirmError}</Text>}

          {/* ── Terms ── */}
          <TouchableOpacity
            style={styles.termsRow}
            onPress={() => { setAgreed(!agreed); setAgreeError(''); }}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, agreed && styles.checkboxChecked, agreeError ? styles.checkboxErrorBorder : null]}>
              {agreed && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.termsText}>
              I agree To the <Text style={styles.termsLink}>Terms of Services</Text>
            </Text>
          </TouchableOpacity>
          {agreeError !== '' && <Text style={styles.fieldError}>⚠ {agreeError}</Text>}

          {/* ── Sign Up button ── */}
          <TouchableOpacity activeOpacity={0.85} style={styles.signUpBtn} onPress={handleSignUp}>
            <LinearGradient
              colors={['#00D4FF', '#00B8D9']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.signUpBtnGradient}
            >
              <Text style={styles.signUpBtnText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.orText}>or Log in with</Text>

          {/* ── Google ── */}
          <TouchableOpacity activeOpacity={0.8} style={styles.googleBtn}>
            <GoogleIcon />
            <Text style={styles.googleBtnText}>Log In with Google</Text>
          </TouchableOpacity>

          {/* ── Login link ── */}
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Do you already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/screens/login')}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scrollContent: {
    flexGrow: 1, alignItems: 'center',
    paddingTop: 70, paddingBottom: 40, paddingHorizontal: 28,
  },
  logo: { width: 90, height: 90, marginBottom: 20 },
  title: { fontSize: 26, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.45)', textAlign: 'center', marginBottom: 32 },
  form: { width: '100%', gap: 10 },

  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 12, borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 14, paddingVertical: 13, gap: 12,
  },
  inputError: { borderColor: '#FF4444', backgroundColor: 'rgba(255,68,68,0.06)' },
  iconBox: { width: 28, alignItems: 'center', justifyContent: 'center' },
  inputInner: { flex: 1 },
  inputLabel: { fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 2 },
  input: {
    fontSize: 14, color: '#FFFFFF',
    padding: 0, margin: 0,
    backgroundColor: 'transparent', // ✅ removes yellow background
  },
  eyeBtn: { padding: 4, width: 32, alignItems: 'center', justifyContent: 'center' },
  fieldError: { color: '#FF6B6B', fontSize: 12, marginTop: -4, marginLeft: 4 },

  termsRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 2 },
  checkbox: {
    width: 16, height: 16, borderRadius: 3,
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: '#4ECDC4', borderColor: '#4ECDC4' },
  checkboxErrorBorder: { borderColor: '#FF4444' },
  checkmark: { color: '#fff', fontSize: 10, fontWeight: '700' },
  termsText: { color: 'rgba(255,255,255,0.6)', fontSize: 13 },
  termsLink: { color: '#4ECDC4', fontWeight: '600' },

  signUpBtn: {
    width: '100%', borderRadius: 30, overflow: 'hidden', marginTop: 8,
    shadowColor: '#00D4FF', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4, shadowRadius: 14, elevation: 10,
  },
  signUpBtnGradient: { paddingVertical: 16, alignItems: 'center', borderRadius: 30 },
  signUpBtnText: { color: '#071318', fontSize: 17, fontWeight: '800' },

  orText: { color: 'rgba(255,255,255,0.4)', fontSize: 13, textAlign: 'center', marginVertical: 4 },

  googleBtn: {
    width: '100%', backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 14, paddingHorizontal: 20,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
  },
  googleBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },

  loginRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 6 },
  loginText: { color: 'rgba(255,255,255,0.5)', fontSize: 13 },
  loginLink: { color: '#4ECDC4', fontSize: 13, fontWeight: '700' },
});