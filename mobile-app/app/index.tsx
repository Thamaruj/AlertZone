import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function EnterScreen() {
  const router = useRouter();

  const logoScale    = useRef(new Animated.Value(0.3)).current;
  const logoOpacity  = useRef(new Animated.Value(0)).current;
  const logoRotate   = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY       = useRef(new Animated.Value(20)).current;
  const subOpacity   = useRef(new Animated.Value(0)).current;
  const btnOpacity   = useRef(new Animated.Value(0)).current;
  const btnY         = useRef(new Animated.Value(30)).current;
  const pulseAnim    = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, { toValue: 1, tension: 60, friction: 7, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(logoRotate, { toValue: 1, duration: 800, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(titleOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.spring(titleY, { toValue: 0, tension: 80, friction: 8, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(subOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(btnOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.spring(btnY, { toValue: 0, tension: 70, friction: 9, useNativeDriver: true }),
      ]),
    ]).start();

    // Subtle logo pulse only
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 1800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1,    duration: 1800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const spin = logoRotate.interpolate({
    inputRange:  [0, 1],
    outputRange: ['-15deg', '0deg'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Background gradient */}
      <LinearGradient
        colors={['#0D1F2D', '#0A1820', '#071318']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Subtle grid lines */}
      <View style={styles.gridOverlay} pointerEvents="none">
        {[...Array(6)].map((_, i) => (
          <View key={i} style={[styles.gridLine, { top: (height / 6) * i }]} />
        ))}
      </View>

      {/* Center content */}
      <View style={styles.centerContent}>

        {/* Logo — no circle glow */}
        <Animated.View
          style={[
            styles.logoWrapper,
            {
              opacity: logoOpacity,
              transform: [
                { scale: Animated.multiply(logoScale, pulseAnim) },
                { rotate: spin },
              ],
            },
          ]}
        >
          <Image
            source={require('../assets/images/logo1_1.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </Animated.View>

        {/* App name */}
        <Animated.View style={{ opacity: titleOpacity, transform: [{ translateY: titleY }], marginTop: 24 }}>
          <Text style={styles.appName}>
            <Text style={styles.appNameAlert}>Alert</Text>
            <Text style={styles.appNameZone}>Zone</Text>
          </Text>
        </Animated.View>

        {/* Tagline */}
        <Animated.Text style={[styles.tagline, { opacity: subOpacity }]}>
          Stay aware. Stay safe.
        </Animated.Text>
      </View>

      {/* Bottom — only Get Started button, no Sign In */}
      <Animated.View
        style={[
          styles.bottomSection,
          { opacity: btnOpacity, transform: [{ translateY: btnY }] },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.getStartedBtn}
          onPress={() => router.push('/onboarding')}
        >
          <LinearGradient
            colors={['#3BBDB5', '#2A9D8F']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.btnGradient}
          >
            <Text style={styles.btnText}>Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#071318' },
  gridOverlay: { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(62, 188, 180, 0.06)',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 140,
  },
  logoImage: {
    width: 130,
    height: 130,
  },
  appName: {
    fontSize: 38,
    letterSpacing: 1,
    fontWeight: '700',
    textAlign: 'center',
  },
  appNameAlert: {
    color: '#FFFFFF',
    fontFamily: 'Courier New' as any,
  },
  appNameZone: {
    color: '#4ECDC4',
    fontFamily: 'Courier New' as any,
  },
  tagline: {
    marginTop: 10,
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 3,
    textTransform: 'uppercase',
    fontFamily: 'Courier New' as any,
  },
  bottomSection: {
    paddingHorizontal: 36,
    paddingBottom: 52,
    alignItems: 'center',
  },
  getStartedBtn: {
    width: '100%',
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#3BBDB5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 12,
  },
  btnGradient: {
    paddingVertical: 17,
    alignItems: 'center',
    borderRadius: 14,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1.5,
    fontFamily: 'Courier New' as any,
    textTransform: 'uppercase',
  },
});