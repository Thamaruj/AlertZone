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

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail]                   = useState('');
  const [password, setPassword]             = useState('');
  const [showPassword, setShowPassword]     = useState(false);
  const [rememberMe, setRememberMe]         = useState(false);
  const [generalError, setGeneralError]     = useState('');
  const [emailError, setEmailError]         = useState('');
  const [passwordError, setPasswordError]   = useState('');

  const handleLogin = async () => {
    // Clear all errors
    setGeneralError('');
    setEmailError('');
    setPasswordError('');

    // Basic empty check
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }
    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    try {
      // ✅ Read exactly what was saved during signup
      const savedEmail    = await AsyncStorage.getItem('registered_email');
      const savedPassword = await AsyncStorage.getItem('registered_password');

      // No account exists at all
      if (!savedEmail || !savedPassword) {
        setGeneralError("No account found. Please create an account first.");
        return;
      }

      const enteredEmail    = email.trim().toLowerCase();
      const enteredPassword = password.trim(); // ✅ trim whitespace

      // ✅ Compare both email and password
      const emailMatch    = enteredEmail === savedEmail.trim().toLowerCase();
      const passwordMatch = enteredPassword === savedPassword.trim();

      if (!emailMatch || !passwordMatch) {
        if (!emailMatch) {
          setGeneralError('Email not found. Please check your email or create an account.');
        } else {
          setGeneralError('Incorrect password. Please try again.');
        }
        return;
      }

      // ✅ SUCCESS — show message then go to dashboard
      Alert.alert(
        '✅ Login Successful!',
        `Welcome back!\n${email.trim()}`,
        [{
          text: 'Continue',
          onPress: () => router.replace('/(tabs)'),
        }]
      );

    } catch (error) {
      setGeneralError('Something went wrong. Please try again.');
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
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Log in to continue making your{'\n'}community saver.</Text>

        {/* ── Error banner ── */}
        {generalError !== '' && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>⚠ {generalError}</Text>
            <TouchableOpacity onPress={() => router.push('/forgotpassword')}>
              <Text style={styles.errorBannerLink}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.form}>

          {/* Email */}
          <View style={[styles.inputWrapper, emailError ? styles.inputError : null]}>
            <View style={styles.iconBox}><EmailIcon /></View>
            <View style={styles.inputInner}>
              <Text style={styles.inputLabel}>E-mail:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="rgba(255,255,255,0.3)"
                value={email}
                onChangeText={(t) => { setEmail(t); setEmailError(''); setGeneralError(''); }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                selectionColor="#4ECDC4"
                textContentType="emailAddress"
                autoComplete="email"
              />
            </View>
          </View>
          {emailError !== '' && <Text style={styles.fieldError}>⚠ {emailError}</Text>}

          {/* Password */}
          <View style={[styles.inputWrapper, passwordError ? styles.inputError : null]}>
            <View style={styles.iconBox}><LockIcon /></View>
            <View style={styles.inputInner}>
              <Text style={styles.inputLabel}>Password:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="rgba(255,255,255,0.3)"
                value={password}
                onChangeText={(t) => { setPassword(t); setPasswordError(''); setGeneralError(''); }}
                secureTextEntry={!showPassword}
                selectionColor="#4ECDC4"
                textContentType="password"
                autoComplete="password"
                autoCorrect={false}
              />
            </View>
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </TouchableOpacity>
          </View>
          {passwordError !== '' && <Text style={styles.fieldError}>⚠ {passwordError}</Text>}

          {/* Remember me + Forgot */}
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.rememberRow}
              onPress={() => setRememberMe(!rememberMe)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.rememberText}>Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/forgotpassword')}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Log In button */}
          <TouchableOpacity activeOpacity={0.85} style={styles.loginBtn} onPress={handleLogin}>
            <LinearGradient
              colors={['#00D4FF', '#00B8D9']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              style={styles.loginBtnGradient}
            >
              <Text style={styles.loginBtnText}>Log In</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.orText}>or Log in with</Text>

          {/* Google */}
          <TouchableOpacity activeOpacity={0.8} style={styles.googleBtn}>
            <GoogleIcon />
            <Text style={styles.googleBtnText}>Log In with Google</Text>
          </TouchableOpacity>

          {/* Create account */}
          <View style={styles.createRow}>
            <Text style={styles.createText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/screens/signup')}>
              <Text style={styles.createLink}>Create Account</Text>
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
  logo: { width: 90, height: 90, marginBottom: 20, marginTop :50},
  title: { fontSize: 26, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.45)', textAlign: 'center', lineHeight: 21, marginBottom: 20 },

  errorBanner: {
    width: '100%', backgroundColor: 'rgba(255,68,68,0.12)',
    borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,68,68,0.35)',
    padding: 12, marginBottom: 12, gap: 6,
  },
  errorBannerText: { color: '#FF6B6B', fontSize: 13, fontWeight: '600' },
  errorBannerLink: { color: '#4ECDC4', fontSize: 12, fontWeight: '700', textDecorationLine: 'underline' },

  form: { width: '100%', gap: 10 },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 12, borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 14, paddingVertical: 12, gap: 12,
  },
  inputError: { borderColor: '#FF4444', backgroundColor: 'rgba(255,68,68,0.06)' },
  iconBox: { width: 28, alignItems: 'center', justifyContent: 'center' },
  inputInner: { flex: 1 },
  inputLabel: { fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 2 },
  input: { fontSize: 14, color: '#FFFFFF', padding: 0, margin: 0, backgroundColor: 'transparent' },
  eyeBtn: { padding: 4, width: 32, alignItems: 'center', justifyContent: 'center' },
  fieldError: { color: '#FF6B6B', fontSize: 12, marginTop: -4, marginLeft: 4 },

  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 },
  rememberRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  checkbox: { width: 16, height: 16, borderRadius: 3, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: '#4ECDC4', borderColor: '#4ECDC4' },
  checkmark: { color: '#fff', fontSize: 10, fontWeight: '700' },
  rememberText: { color: 'rgba(255,255,255,0.6)', fontSize: 13 },
  forgotText: { color: 'rgba(255,255,255,0.7)', fontSize: 13 },

  loginBtn: {
    width: '100%', borderRadius: 30, overflow: 'hidden', marginTop: 8,
    shadowColor: '#00D4FF', shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4, shadowRadius: 14, elevation: 10,
  },
  loginBtnGradient: { paddingVertical: 16, alignItems: 'center', borderRadius: 30 },
  loginBtnText: { color: '#071318', fontSize: 17, fontWeight: '800' },

  orText: { color: 'rgba(255,255,255,0.4)', fontSize: 13, textAlign: 'center', marginVertical: 4 },
  googleBtn: {
    width: '100%', backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 14, paddingHorizontal: 20,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
  },
  googleBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },

  createRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 6 },
  createText: { color: 'rgba(255,255,255,0.5)', fontSize: 13 },
  createLink: { color: '#4ECDC4', fontSize: 13, fontWeight: '700' },
});