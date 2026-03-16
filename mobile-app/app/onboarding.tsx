import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Animated,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Welcome to AlertZone',
    subtitle: 'Empowering Citizens for a\nSafer Community',
    image: require('../assets/images/onboard1.png'),
  },
  {
    id: '2',
    title: 'See It. Report It. Track It.',
    subtitle: 'Your Reports Connect to You Real-World Challenge.',
    image: require('../assets/images/onboard2.png'),
  },
  {
    id: '3',
    title: 'Join Our Community',
    subtitle: 'Together, We Build a Smarter, Safer Sri Lanka.',
    image: require('../assets/images/onboard3.png'),
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex });
      setCurrentIndex(nextIndex);
    } else {
      router.push('/screens/login');
    }
  };

  const handleSkip = () => {
    router.push('/screens/login');
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  return (
    <View style={styles.container}>
       <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <LinearGradient
        colors={['#0D1F2D', '#0A1820', '#071318']}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Skip button */}
      {currentIndex < slides.length - 1 && (
        <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* Slides */}
      <Animated.FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            {/* ✅ No background circle — just the image directly */}
            <Image
              source={item.image}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>
        )}
      />

      {/* Bottom section */}
      <View style={styles.bottomSection}>

        {/* ✅ Large line dots like the design */}
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [40, 80, 40],   // ✅ large lines
              extrapolate: 'clamp',
            });
            const dotOpacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.35, 1, 0.35],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={index}
                style={[styles.dot, { width: dotWidth, opacity: dotOpacity }]}
              />
            );
          })}
        </View>

        {/* Title & subtitle */}
        <Text style={styles.title}>{slides[currentIndex].title}</Text>
        <Text style={styles.subtitle}>{slides[currentIndex].subtitle}</Text>

        {/* Next / Get Started button */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.nextBtn}
          onPress={handleNext}
        >
          <LinearGradient
            colors={['#3BBDB5', '#2A9D8F']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.nextBtnGradient}
          >
            <Text style={styles.nextBtnText}>
              {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071318',
  },
  skipBtn: {
    position: 'absolute',
    top: 56,
    right: 24,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(62,188,180,0.3)',
  },
  skipText: {
    color: '#4ECDC4',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  slide: {
    width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  // ✅ No circle background — clean image only
  illustration: {
    width: width * 0.85,
    height: height * 0.44,
  },
  bottomSection: {
    paddingHorizontal: 32,
    paddingBottom: 52,
    alignItems: 'center',
  },
  // ✅ Large line dots
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    gap: 8,
  },
  dot: {
    height: 5,           // ✅ thicker line
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    lineHeight: 23,
    marginBottom: 36,
  },
  nextBtn: {
    width: '100%',
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#3BBDB5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 10,
  },
  nextBtnGradient: {
    paddingVertical: 17,
    alignItems: 'center',
    borderRadius: 14,
  },
  nextBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});